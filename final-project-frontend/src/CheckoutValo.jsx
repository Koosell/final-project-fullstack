import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Checkout.css";
import { usePayment } from './PaymentContext'; // <-- 1. Import hook pembayaran

const CheckoutValorant = () => {
    const [valorantProducts, setValorantProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // <-- 2. State form disederhanakan
    const [formData, setFormData] = useState({
        game_id: "",  // Untuk Riot ID
        server_id: "", // Untuk Tagline
        kode_promo: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { handlePay } = usePayment(); // <-- 3. Panggil hook
    // Mendefinisikan apiUrl dari environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                // PERBAIKAN: Menggunakan backticks (`) bukan single quotes (')
                const response = await axios.get(`${apiUrl}/api/products`);
                if (response.data && Array.isArray(response.data.data)) {
                    const filtered = response.data.data.filter(p => p.name.toLowerCase().includes('valorant'));
                    setValorantProducts(filtered);
                }
            } catch (error) {
                console.error("Gagal mengambil produk Valorant:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchProducts();
    }, [apiUrl]); // Tambahkan apiUrl sebagai dependency

    const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedProduct) newErrors.product = "Pilih produk terlebih dahulu!";
        if (!formData.game_id) newErrors.game_id = "Riot ID wajib diisi";
        if (!formData.server_id) newErrors.server_id = "Tagline wajib diisi";
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
        setFormData({ game_id: "", server_id: "", kode_promo: "" });
        setErrors({});
    };

    return (
        <div className="checkout-container">
            {!showSuccess ? (
                <div className="checkout-content">
                    <div className="game-header">
                        <img src="https://i.imgur.com/4WVAckQ.jpeg" alt="VALORANT" className="game-logo" />
                        <div className="game-info">
                            <h2>VALORANT</h2>
                            <p>Top-up Valorant Points dan Battle Pass untuk skin, agen, dan lainnya</p>
                        </div>
                    </div>

                    <div className="checkout-grid">
                        <div className="product-section">
                            <h3>1. Pilih Produk</h3>
                            <div className="product-scroller">
                                {isLoadingProducts ? <p>Memuat produk...</p> : 
                                    valorantProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`product-card ${selectedProduct?.id === product.id ? "selected" : ""}`}
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <img 
                                                src={`${apiUrl}/storage/${product.image_url}`} 
                                                alt={product.name} 
                                                className="product-image" 
                                                onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/kl6R3AX.png'; }}
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
                                    <label>Riot ID</label>
                                    <input type="text" name="game_id" placeholder="Masukkan Riot ID" value={formData.game_id} onChange={handleInputChange} required />
                                    {errors.game_id && <span className="error">{errors.game_id}</span>}
                                </div>
                                <div className="input-group">
                                    <label>Tagline</label>
                                    <input type="text" name="server_id" placeholder="Contoh: #1234" value={formData.server_id} onChange={handleInputChange} required />
                                    {errors.server_id && <span className="error">{errors.server_id}</span>}
                                </div>
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
                            <div className="summary-item"><span>Riot ID</span><span>{formData.game_id}</span></div>
                            <div className="summary-item"><span>Tagline</span><span>{formData.server_id}</span></div>
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

export default CheckoutValorant;
