import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Checkout.css";
import { usePayment } from './PaymentContext';

const CheckoutML = () => {
    const [mlProducts, setMlProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // State form disederhanakan
    const [formData, setFormData] = useState({ 
        game_id: "", 
        server_id: "", 
        kode_promo: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { handlePay } = usePayment();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products');
                if (response.data && Array.isArray(response.data.data)) {
                    const filtered = response.data.data.filter(p => p.name.toLowerCase().includes(' ml'));
                    setMlProducts(filtered);
                }
            } catch (error) {
                console.error("Gagal mengambil produk ML:", error);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ((name === "game_id" || name === "server_id") && !/^\d*$/.test(value)) return;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedProduct) newErrors.product = "Pilih produk terlebih dahulu!";
        if (!formData.game_id) newErrors.game_id = "User ID wajib diisi";
        if (!formData.server_id) newErrors.server_id = "Server ID wajib diisi";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        // Panggil fungsi handlePay dengan callbacks
        handlePay(orderDetails, {
            onSuccess: () => {
                // Saat Midtrans mengkonfirmasi sukses, tampilkan layar sukses
                setShowSuccess(true);
            }
            // Anda juga bisa menambahkan onPending, onError, dll di sini jika perlu
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
                        <img src="https://i.imgur.com/q2FAJ3f.jpeg" alt="Mobile Legends" className="game-logo" />
                        <div className="game-info">
                            <h2>MOBILE LEGENDS</h2>
                            <p>Top-up Diamond dan Pass untuk berbagai keperluan dalam game</p>
                        </div>
                    </div>

                    <div className="checkout-grid">
                        <div className="product-section">
                            <h3>1. Pilih Produk</h3>
                            <div className="product-scroller">
                                {isLoadingProducts ? <p>Memuat produk...</p> : 
                                    mlProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`product-card ${selectedProduct?.id === product.id ? "selected" : ""}`}
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <img 
                                                src={`/images/${product.image_url}`} 
                                                alt={product.name} 
                                                className="product-image"
                                                onError={(e) => { e.target.onerror = null; e.target.src='https://i.imgur.com/5OItBDb.jpeg'; }}
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
                                    <label>User ID</label>
                                    <input type="text" name="game_id" placeholder="Masukkan User ID" value={formData.game_id} onChange={handleInputChange} inputMode="numeric" pattern="[0-9]*" required />
                                    {errors.game_id && <span className="error">{errors.game_id}</span>}
                                </div>
                                <div className="input-group">
                                    <label>Server ID</label>
                                    <input type="text" name="server_id" placeholder="Masukkan Server ID" value={formData.server_id} onChange={handleInputChange} inputMode="numeric" pattern="[0-9]*" required />
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
                            <div className="summary-item"><span>User ID</span><span>{formData.game_id}</span></div>
                            <div className="summary-item"><span>Server ID</span><span>{formData.server_id}</span></div>
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

export default CheckoutML;