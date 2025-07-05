import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Checkout.css";
import { usePayment } from './PaymentContext'; // <-- 1. Import hook pembayaran

const CheckoutCOD = () => {
    const [codProducts, setCodProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // <-- 2. State form disederhanakan
    const [formData, setFormData] = useState({ 
        game_id: "", 
        kode_promo: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { handlePay } = usePayment(); // <-- 3. Panggil hook

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products');
                if (response.data && Array.isArray(response.data.data)) {
                    // Filter sudah benar untuk 'cod'
                    const filtered = response.data.data.filter(p => p.name.toLowerCase().includes(' cod '));
                    setCodProducts(filtered);
                }
            } catch (error) {
                console.error("Gagal mengambil produk COD:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Hanya izinkan angka untuk game_id
        if (name === "game_id" && !/^\d*$/.test(value)) return;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedProduct) newErrors.product = "Pilih produk terlebih dahulu!";
        if (!formData.game_id) newErrors.game_id = "Open ID wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // <-- 4. Logika pembayaran diubah total untuk menggunakan Midtrans
    const handlePayment = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Anda harus login untuk melakukan pembelian!");
            navigate('/login');
            return;
        }

        const orderDetails = {
            productName: selectedProduct.name,
            price: selectedProduct.price,
            quantity: 1,
        };

        handlePay(orderDetails, {
            onSuccess: () => {
                setShowSuccess(true);
            }
        });
    };

    const resetForm = () => {
        setShowSuccess(false);
        setSelectedProduct(null);
        setFormData({ game_id: "", kode_promo: "" });
        setErrors({});
    };

    return (
        <div className="checkout-container">
            {!showSuccess ? (
                <div className="checkout-content">
                    <div className="game-header">
                        <img src="https://i.imgur.com/9LP0vMe.jpeg" alt="Call of Duty Mobile" className="game-logo" />
                        <div className="game-info">
                            <h2>CALL OF DUTY MOBILE</h2>
                            <p>Top-up CP (CoD Points) untuk skin, Battle Pass, dan lainnya</p>
                        </div>
                    </div>

                    <div className="checkout-grid">
                        <div className="product-section">
                            <h3>1. Pilih Produk</h3>
                            <div className="product-scroller">
                                {isLoadingProducts ? <p>Memuat produk...</p> : 
                                    codProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`product-card ${selectedProduct?.id === product.id ? "selected" : ""}`}
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <img 
                                                src={`/images/${product.image_url}`} 
                                                alt={product.name} 
                                                className="product-image" 
                                                onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/NnMxOub.png'; }}
                                            />
                                            <div className="product-details">
                                                <h4>{product.name}</h4>
                                                <p>{formatPrice(product.price)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {errors.product && <span className="error">{errors.product}</span>}
                        </div>

                        <div className="form-section">
                             <h3>2. Masukkan Data Akun</h3>
                            <form onSubmit={handlePayment} autoComplete="off">
                                <div className="input-group">
                                    <label>Open ID</label>
                                    <input type="text" name="game_id" placeholder="Masukkan Open ID" value={formData.game_id} onChange={handleInputChange} inputMode="numeric" pattern="[0-9]*" required />
                                    {errors.game_id && <span className="error">{errors.game_id}</span>}
                                </div>
                                {/* Bagian Server ID dan Metode Pembayaran lama sudah dihapus */}
                                <div className="input-group">
                                    <label>Kode Promo (Opsional)</label>
                                    <input type="text" name="kode_promo" placeholder="Masukkan kode promo" value={formData.kode_promo} onChange={handleInputChange} />
                                </div>
                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading ? 'Memproses...' : 'Beli & Bayar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="success-screen">
                    <div className="success-content">
                        <div className="success-icon">✓</div>
                        <h2>Pembayaran Diproses!</h2>
                        <p>Pesanan Anda akan segera masuk setelah pembayaran dikonfirmasi.</p>
                        <div className="order-summary">
                            <div className="summary-item"><span>Produk</span><span>{selectedProduct?.name}</span></div>
                            <div className="summary-item"><span>Open ID</span><span>{formData.game_id}</span></div>
                            <div className="summary-item"><span>Metode Pembayaran</span><span>Midtrans</span></div>
                        </div>
                        <button className="back-btn" onClick={resetForm}>
                            Beli Lagi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutCOD;