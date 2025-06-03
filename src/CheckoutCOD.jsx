import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "Battle Pass", price: "Rp 149.900", img: "cod-pass.jpeg", popular: true },
  { label: "80 CP", price: "Rp 15.000", img: "cod-cp.jpeg", popular: false },
  { label: "160 CP", price: "Rp 29.900", img: "cod-cp.jpeg", popular: false },
  { label: "320 CP", price: "Rp 59.900", img: "cod-cp.jpeg", popular: true },
  { label: "800 CP", price: "Rp 149.900", img: "cod-cp.jpeg", popular: false },
  { label: "2000 CP", price: "Rp 369.900", img: "cod-cp.jpeg", popular: true },
  { label: "4000 CP", price: "Rp 729.900", img: "cod-cp.jpeg", popular: false },
  { label: "Premium Pass Bundle", price: "Rp 299.900", img: "cod-pass.jpeg", popular: false }
];

const CheckoutCOD = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    game_id: "",
    region: "",
    kode_promo: "",
    metode: "Dana"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validasi angka saja untuk game_id dan region
    if ((name === "game_id" || name === "region") && /\D/.test(value)) return;
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
              src="https://i.imgur.com/9LP0vMe.jpeg" 
              alt="Call of Duty" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>CALL OF DUTY</h2>
              <p>Top-up CP dan Pass untuk berbagai keperluan dalam game</p>
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
                      src={`https://i.imgur.com/gCRJcLU.png${product.img}`} 
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
                    inputMode="numeric"
                    pattern="\d*"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Region (Angka)</label>
                  <input
                    type="text"
                    name="region"
                    placeholder="Masukkan Region"
                    value={formData.region}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="\d*"
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
                  region: "",
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

export default CheckoutCOD;
