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
    region: "", // Tetap menggunakan "region" seperti di kode asli Anda
    kode_promo: "",
    paymentMethod: "dana", // Mengubah 'metode' menjadi 'paymentMethod'
    accountNumber: "", // Menambahkan state untuk nomor akun e-wallet
    bankName: "" // Menambahkan state untuk nama bank
  });
  const [errors, setErrors] = useState({}); // Menambahkan state untuk error validasi

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validasi hanya angka untuk User ID dan Region
    if ((name === "game_id" || name === "region") && !/^\d*$/.test(value)) {
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

    if (!formData.game_id) {
      newErrors.game_id = "User ID wajib diisi";
    }

    if (!formData.region) {
      newErrors.region = "Region wajib diisi";
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
                    {/* Perbaiki src gambar, pastikan path atau URL-nya benar */}
                    <img
                      src={product.img.includes("https://i.imgur.com/") ? product.img : `https://i.imgur.com/gCRJcLU.png`}
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
              {errors.product && <span className="error">{errors.product}</span>}
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
                  <label>Region (Angka)</label>
                  <input
                    type="text"
                    name="region"
                    placeholder="Masukkan Region"
                    value={formData.region}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                  {errors.region && <span className="error">{errors.region}</span>}
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
                <span>User ID</span>
                <span>{formData.game_id}</span>
              </div>
              <div className="summary-item">
                <span>Region</span>
                <span>{formData.region}</span>
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
                  game_id: "",
                  region: "",
                  kode_promo: "",
                  paymentMethod: "dana",
                  accountNumber: "",
                  bankName: ""
                });
                setErrors({}); // Reset errors
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