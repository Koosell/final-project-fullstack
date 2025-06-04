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
    paymentMethod: "dana",
    accountNumber: "",
    bankName: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi hanya angka untuk User ID dan Server ID
    if ((name === "game_id" || name === "server_id") && !/^\d*$/.test(value)) {
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

    if (!selectedNominal) {
      newErrors.nominal = "Pilih nominal terlebih dahulu!";
    }

    if (!formData.game_id) {
      newErrors.game_id = "User ID wajib diisi";
    }

    if (!formData.server_id) {
      newErrors.server_id = "Server ID wajib diisi";
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
              {errors.nominal && <span className="error">{errors.nominal}</span>}
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
                  {errors.game_id && <span className="error">{errors.game_id}</span>}
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
                  {errors.server_id && <span className="error">{errors.server_id}</span>}
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
                setSelectedNominal("");
                setFormData({
                  game_id: "",
                  server_id: "",
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

export default CheckoutPUBG;