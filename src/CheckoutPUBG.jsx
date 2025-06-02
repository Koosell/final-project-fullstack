import React, { useState } from "react";
import "./css/Checkout.css";

const nominalOptions = [
  { label: "60 UC", price: "Rp 15.000", img: "uc.jpg", popular: false },
  { label: "325 UC", price: "Rp 75.000", img: "uc.jpg", popular: true },
  { label: "660 UC", price: "Rp 145.000", img: "uc.jpg", popular: false },
  { label: "1800 UC", price: "Rp 375.000", img: "uc.jpg", popular: true },
  { label: "3850 UC", price: "Rp 750.000", img: "uc.jpg", popular: false },
  { label: "8100 UC", price: "Rp 1.500.000", img: "uc.jpg", popular: true }
];

const CheckoutPUBG = () => {
  const [selectedNominal, setSelectedNominal] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    game_id: "",
    server_id: "",
    kode_promo: "",
    metode: "Dana"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi hanya angka untuk User ID dan Server ID
    if ((name === "game_id" || name === "server_id") && !/^\d*$/.test(value)) {
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedNominal) {
      alert("Pilih nominal terlebih dahulu!");
      return;
    }
    setTimeout(() => setShowSuccess(true), 1000);
  };

  return (
    <div className="checkout-container">
      {!showSuccess ? (
        <div className="checkout-content">
          <div className="game-header">
            <img src="https://i.imgur.com/Eba983T.jpeg" alt="PUBG" />
            <div className="game-info">
              <h2>PUBG MOBILE</h2>
              <p>Top-up UC untuk berbagai keperluan dalam game</p>
            </div>
          </div>

          <div className="checkout-grid">
            <div className="product-section">
              <h3>Pilih Nominal UC</h3>
              <div className="product-scroller">
                {nominalOptions.map((nominal, index) => (
                  <div 
                    key={index}
                    className={`product-card ${selectedNominal === nominal.label ? "selected" : ""} ${nominal.popular ? "popular" : ""}`}
                    onClick={() => setSelectedNominal(nominal.label)}
                  >
                    {nominal.popular && <span className="popular-badge">POPULAR</span>}
                    <img src={`https://i.imgur.com/ygtcmVZ.jpeg/${nominal.img}`} alt={nominal.label} />
                    <div className="product-details">
                      <h4>{nominal.label}</h4>
                      <p>{nominal.price}</p>
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
                  <label>Server ID</label>
                  <input
                    type="text"
                    name="server_id"
                    placeholder="Masukkan Server ID"
                    value={formData.server_id}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                <span>{selectedNominal}</span>
              </div>
              <div className="summary-item">
                <span>User ID</span>
                <span>{formData.game_id}</span>
              </div>
              <div className="summary-item">
                <span>Server ID</span>
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
                setSelectedNominal("");
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

export default CheckoutPUBG;
