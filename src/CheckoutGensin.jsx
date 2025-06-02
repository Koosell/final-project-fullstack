import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "60 Genesis Crystals", price: "Rp 15.000", img: "genesis.jpeg", popular: false },
  { label: "300 + 30 Genesis Crystals", price: "Rp 75.000", img: "genesis.jpeg", popular: true },
  { label: "980 + 110 Genesis Crystals", price: "Rp 225.000", img: "genesis.jpeg", popular: false },
  { label: "Blessing of the Welkin Moon", price: "Rp 75.000", img: "https://i.imgur.com/8g6bwUC.jpeg", popular: true },
  { label: "1980 + 260 Genesis Crystals", price: "Rp 449.000", img: "genesis.jpeg", popular: false },
  { label: "3280 + 600 Genesis Crystals", price: "Rp 749.000", img: "genesis.jpeg", popular: true }
];

const CheckoutGI = () => {
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

    // Validasi input angka untuk game_id
    if (name === "game_id" && !/^\d*$/.test(value)) {
      return;
    }

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
              src="https://i.imgur.com/Q6qj5sG.jpeg" 
              alt="Genshin Impact" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>GENSHIN IMPACT</h2>
              <p>Top-up Genesis Crystals atau Blessing untuk keperluan dalam game</p>
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
                      src={`https://i.imgur.com/8g6bwUC.jpeg/${product.img}`} 
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
                    pattern="[0-9]*"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Server</label>
                  <select 
                    name="server_id"
                    value={formData.server_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Pilih Server</option>
                    <option value="Asia">Asia</option>
                    <option value="America">America</option>
                    <option value="Europe">Europe</option>
                    <option value="TW, HK, MO">TW, HK, MO</option>
                  </select>
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
                <span>Server</span>
                <span>{formData.server_id}</span>
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

export default CheckoutGI;
