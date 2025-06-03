import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "475 Valorant Points", price: "Rp 75.000", img: "vp.jpg", popular: false },
  { label: "Battle Pass", price: "Rp 149.900", img: "bp.jpg", popular: true },
  { label: "1000 Valorant Points", price: "Rp 150.000", img: "vp.jpg", popular: false },
  { label: "2050 Valorant Points", price: "Rp 299.000", img: "vp.jpg", popular: true },
  { label: "3650 Valorant Points", price: "Rp 499.000", img: "vp.jpg", popular: false },
  { label: "5350 Valorant Points", price: "Rp 699.000", img: "vp.jpg", popular: false },
  { label: "11000 Valorant Points", price: "Rp 1.399.000", img: "vp.jpg", popular: true }
];

const CheckoutValorant = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    riot_id: "",
    tagline: "",
    kode_promo: "",
    paymentMethod: "dana",
    accountNumber: "",
    bankName: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi hanya angka untuk Riot ID dan Tagline
    if ((name === "riot_id" || name === "tagline") && !/^\d*$/.test(value)) {
      return;
    }

    // Reset account number dan bank name ketika payment method berubah
    if (name === "paymentMethod") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        accountNumber: "",
        bankName: ""
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error ketika user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedProduct) {
      newErrors.product = "Pilih produk terlebih dahulu!";
    }

    if (!formData.riot_id) {
      newErrors.riot_id = "Riot ID wajib diisi";
    }

    if (!formData.tagline) {
      newErrors.tagline = "Tagline wajib diisi";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Pilih metode pembayaran";
    }

    // Validasi untuk e-wallet
    if (formData.paymentMethod && formData.paymentMethod !== "bank" && !formData.accountNumber) {
      newErrors.accountNumber = `Nomor ${formData.paymentMethod.toUpperCase()} wajib diisi`;
    }

    // Validasi untuk bank transfer
    if (formData.paymentMethod === "bank" && !formData.bankName) {
      newErrors.bankName = "Pilih bank terlebih dahulu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setTimeout(() => setShowSuccess(true), 1000);
  };

  return (
    <div className="checkout-container">
      {!showSuccess ? (
        <div className="checkout-content">
          <div className="game-header">
            <img src="https://i.imgur.com/4WVAckQ.jpeg" alt="Valorant" />
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
                    <img src={`https://i.imgur.com/kl6R3AX.png/${product.img}`} alt={product.label} />
                    <div className="product-details">
                      <h4>{product.label}</h4>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.product && <span className="error">{errors.product}</span>}
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
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                  {errors.riot_id && <span className="error">{errors.riot_id}</span>}
                </div>

                <div className="input-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    placeholder="Masukkan Tagline (contoh: 1234)"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                  {errors.tagline && <span className="error">{errors.tagline}</span>}
                </div>

                <div className="input-group">
                  <label>Metode Pembayaran</label>
                  <div className="payment-options">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="dana"
                        checked={formData.paymentMethod === "dana"}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">DANA</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ovo"
                        checked={formData.paymentMethod === "ovo"}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">OVO</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gopay"
                        checked={formData.paymentMethod === "gopay"}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">GoPay</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleInputChange}
                      />
                      <span className="payment-label">Transfer Bank</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
                </div>

                {formData.paymentMethod && formData.paymentMethod !== "bank" && (
                  <div className="input-group">
                    <label>Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    {errors.accountNumber && <span className="error">{errors.accountNumber}</span>}
                  </div>
                )}

                {formData.paymentMethod === "bank" && (
                  <div className="input-group">
                    <label>Pilih Bank</label>
                    <select
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih bank</option>
                      <option value="BCA">BCA</option>
                      <option value="Mandiri">Mandiri</option>
                      <option value="BNI">BNI</option>
                      <option value="BRI">BRI</option>
                      <option value="CIMB Niaga">CIMB Niaga</option>
                      <option value="Danamon">Danamon</option>
                    </select>
                    {errors.bankName && <span className="error">{errors.bankName}</span>}
                  </div>
                )}

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
                <span>{formData.riot_id}#{formData.tagline}</span>
              </div>
              <div className="summary-item">
                <span>Metode Pembayaran</span>
                <span>
                  {formData.paymentMethod === "bank" 
                    ? `Transfer Bank - ${formData.bankName}` 
                    : formData.paymentMethod.toUpperCase()
                  }
                </span>
              </div>
              {formData.paymentMethod !== "bank" && formData.accountNumber && (
                <div className="summary-item">
                  <span>Nomor Akun</span>
                  <span>{formData.accountNumber}</span>
                </div>
              )}
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
                  paymentMethod: "dana",
                  accountNumber: "",
                  bankName: ""
                });
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