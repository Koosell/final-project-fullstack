import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "475 Valorant Points", price: "Rp 75.000", img: "vp.png", popular: false },
  { label: "Battle Pass", price: "Rp 149.900", img: "battlepass.png", popular: true },
  { label: "1000 Valorant Points", price: "Rp 150.000", img: "vp.png", popular: false },
  { label: "2050 Valorant Points", price: "Rp 299.000", img: "vp.png", popular: true },
  { label: "3650 Valorant Points", price: "Rp 499.000", img: "vp.png", popular: false },
  { label: "5350 Valorant Points", price: "Rp 699.000", img: "vp.png", popular: false },
  { label: "11000 Valorant Points", price: "Rp 1.399.000", img: "vp.png", popular: true }
];

const CheckoutValorant = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    riot_id: "",
    tagline: "",
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
              src="/src/assets/images/VALORANT.jpeg" 
              alt="Valorant" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>VALORANT</h2>
              <p>Top-up Valorant Points dan Battle Pass untuk skin, agen, dan lainnya</p>
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
                      src={`/src/assets/images/${product.img}`} 
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
                  <label>Riot ID</label>
                  <input
                    type="text"
                    name="riot_id"
                    placeholder="Masukkan Riot ID"
                    value={formData.riot_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    placeholder="Masukkan Tagline (contoh: #1234)"
                    value={formData.tagline}
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
                <span>Riot ID</span>
                <span>{formData.riot_id}</span>
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
                  riot_id: "",
                  tagline: "",
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

export default CheckoutValorant;