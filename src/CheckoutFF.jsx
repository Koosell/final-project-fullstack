import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "100 Diamond", price: "Rp 16.000", img: "diamondff.jpg", popular: false },
  { label: "210 Diamond", price: "Rp 32.000", img: "diamondff.jpg", popular: true },
  { label: "530 Diamond", price: "Rp 79.000", img: "diamondff.jpg", popular: false },
  { label: "Double Daily Diamond", price: "Rp 30.000", img: "diamondff.jpg", popular: true },
  { label: "1060 Diamond", price: "Rp 149.000", img: "diamondff.jpg", popular: false },
  { label: "2180 Diamond", price: "Rp 299.000", img: "diamondff.jpg", popular: true }
];

const CheckoutFF = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    game_id: "",
    server_id: "",
    kode_promo: "",
    metode: "Dana"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Pilih produk terlebih dahulu!");
      return;
    }
    setTimeout(() => setShowSuccess(true), 1000);
  };

  return (
    <div className="checkout-container">
      {!showSuccess ? (
        <div className="checkout-content">
          <div className="game-header">
            <img 
              src="https://i.imgur.com/chTbnxD.jpeg" 
              alt="Free Fire" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>FREE FIRE</h2>
              <p>Top-up Diamond untuk berbagai keperluan dalam game</p>
            </div>
          </div>

          <div className="checkout-grid">
            <div className="product-section">
              <h3>Pilih Produk</h3>
              <div className="product-scroller">
                {productOptions.map((product, index) => (
                  <div 
                    key={index}
                    className={`product-card ${selectedProduct === product.label ? "selected" : ""} ${product.popular ? "popular" : ""}`}
                    onClick={() => setSelectedProduct(product.label)}
                  >
                    {product.popular && <span className="popular-badge">POPULAR</span>}
                    <img 
                      src={`https://i.imgur.com/5OItBDb.jpeg/${product.img}`} 
                      alt={product.label} 
                      className="product-image"
                    />
                    <div className="product-details">
                      <h4>{product.label}</h4>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>User ID</label>
                  <input
                    type="text"
                    name="game_id"
                    placeholder="Masukkan User ID"
                    value={formData.game_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Server ID</label>
                  <input
                    type="text"
                    name="server_id"
                    placeholder="Masukkan Server ID"
                    value={formData.server_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Metode Pembayaran</label>
                  <select 
                    name="metode" 
                    value={formData.metode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Dana">Dana</option>
                    <option value="OVO">OVO</option>
                    <option value="Gopay">Gopay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Kode Promo (Opsional)</label>
                  <input
                    type="text"
                    name="kode_promo"
                    placeholder="Masukkan kode promo"
                    value={formData.kode_promo}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Bayar Sekarang
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
              <div className="summary-item">
                <span>Produk</span>
                <span>{selectedProduct}</span>
              </div>
              <div className="summary-item">
                <span>User ID</span>
                <span>{formData.game_id}</span>
              </div>
              <div className="summary-item">
                <span>Metode Pembayaran</span>
                <span>{formData.metode}</span>
              </div>
            </div>

            <button 
              className="back-btn"
              onClick={() => {
                setShowSuccess(false);
                setSelectedProduct("");
                setFormData({
                  game_id: "",
                  server_id: "",
                  kode_promo: "",
                  metode: "Dana"
                });
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

export default CheckoutFF;