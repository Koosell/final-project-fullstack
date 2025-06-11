import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Checkout.css";

const CheckoutValorant = () => {
    // State untuk menampung produk yang diambil dari API
    const [valorantProducts, setValorantProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    
    // Menyimpan seluruh objek produk yang dipilih, bukan hanya labelnya
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        game_id: "", // Untuk Riot ID
        server_id: "", // Untuk Tagline
        kode_promo: "",
        paymentMethod: "",
        accountNumber: "",
        bankName: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Mengambil data produk Valorant dari backend
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/products');
                if (response.data && Array.isArray(response.data.data)) {
                    // Filter untuk hanya menampilkan produk yang mengandung kata "Valorant"
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
    }, []);

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
        if (!formData.paymentMethod) newErrors.paymentMethod = "Pilih metode pembayaran";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Anda harus login untuk melakukan pembelian!");
            setIsLoading(false);
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/orders/direct', {
                product_id: selectedProduct.id, // Mengirim ID produk
                game_id: formData.game_id,
                server_id: formData.server_id,
                payment_method: formData.paymentMethod,
                account_number: formData.accountNumber,
                bank_name: formData.bankName,
                promo_code: formData.kode_promo,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            alert(response.data.message || "Pesanan berhasil dibuat!");
            setShowSuccess(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan yang tidak diketahui.";
            alert(`Gagal mengirim data ke server: ${errorMessage}`);
            console.error("Backend error:", error.response);
        } finally {
            setIsLoading(false);
        }
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
                            <h3>Pilih Produk</h3>
                            <div className="product-scroller">
                                {isLoadingProducts ? <p>Memuat produk...</p> : 
                                    valorantProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className={`product-card ${selectedProduct?.id === product.id ? "selected" : ""}`}
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            <img 
                                                src={`/images/${product.image_url}`} 
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
                            <form onSubmit={handleSubmit} autoComplete="off">
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
                                    <label>Metode Pembayaran</label>
                                    <div className="payment-options">
                                        <label className="payment-option"><input type="radio" name="paymentMethod" value="DANA" checked={formData.paymentMethod === "DANA"} onChange={handleInputChange} required /> <span className="payment-label">DANA</span></label>
                                        <label className="payment-option"><input type="radio" name="paymentMethod" value="OVO" checked={formData.paymentMethod === "OVO"} onChange={handleInputChange} required /> <span className="payment-label">OVO</span></label>
                                        <label className="payment-option"><input type="radio" name="paymentMethod" value="GoPay" checked={formData.paymentMethod === "GoPay"} onChange={handleInputChange} required /> <span className="payment-label">GoPay</span></label>
                                        <label className="payment-option"><input type="radio" name="paymentMethod" value="Transfer Bank" checked={formData.paymentMethod === "Transfer Bank"} onChange={handleInputChange} required /> <span className="payment-label">Transfer Bank</span></label>
                                    </div>
                                    {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
                                </div>
                                {formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && (
                                    <div className="input-group">
                                        <label>Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`} inputMode="numeric" pattern="[0-9]*" />
                                        {errors.accountNumber && <span className="error">{errors.accountNumber}</span>}
                                    </div>
                                )}
                                {formData.paymentMethod === "Transfer Bank" && (
                                    <div className="input-group">
                                        <label>Pilih Bank</label>
                                        <select name="bankName" value={formData.bankName} onChange={handleInputChange}>
                                            <option value="">Pilih bank</option><option value="BCA">BCA</option><option value="Mandiri">Mandiri</option><option value="BNI">BNI</option><option value="BRI">BRI</option>
                                        </select>
                                        {errors.bankName && <span className="error">{errors.bankName}</span>}
                                    </div>
                                )}
                                <div className="input-group">
                                    <label>Kode Promo (Opsional)</label>
                                    <input type="text" name="kode_promo" placeholder="Masukkan kode promo" value={formData.kode_promo} onChange={handleInputChange} />
                                </div>
                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading ? 'Memproses...' : 'Bayar Sekarang'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="success-screen">
                    <div className="success-content">
                        <div className="success-icon">✓</div>
                        <h2>Pembayaran Berhasil!</h2>
                        <p>Pesanan Anda sedang diproses</p>
                        <div className="order-summary">
                            <div className="summary-item"><span>Produk</span><span>{selectedProduct?.name}</span></div>
                            <div className="summary-item"><span>Riot ID</span><span>{formData.game_id}</span></div>
                            <div className="summary-item"><span>Tagline</span><span>{formData.server_id}</span></div>
                            <div className="summary-item">
                                <span>Metode Pembayaran</span>
                                <span>
                                    {formData.paymentMethod === "Transfer Bank" ? `Transfer Bank - ${formData.bankName}` : formData.paymentMethod.toUpperCase()}
                                </span>
                            </div>
                            {formData.paymentMethod !== "Transfer Bank" && formData.accountNumber && (
                                <div className="summary-item"><span>Nomor Akun</span><span>{formData.accountNumber}</span></div>
                            )}
                        </div>
                        <button
                            className="back-btn"
                            onClick={() => {
                                setShowSuccess(false);
                                setSelectedProduct(null);
                                setFormData({ game_id: "", server_id: "", kode_promo: "", paymentMethod: "", accountNumber: "", bankName: "" });
                                setErrors({});
                            }}
                        >
                            Beli Lagi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutValorant;
