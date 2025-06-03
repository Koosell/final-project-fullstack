import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "86 Diamonds", price: 23500, img: "diamond.jpeg", popular: false },
  { label: "172 Diamonds", price: 47500, img: "diamond.jpeg", popular: true },
  { label: "257 Diamonds", price: 70000, img: "diamond.jpeg", popular: false },
  { label: "344 Diamonds", price: 93500, img: "diamond.jpeg", popular: false },
  { label: "429 Diamonds", price: 116500, img: "diamond.jpeg", popular: true },
  { label: "600 Diamonds", price: 150000, img: "diamond.jpeg", popular: false }
];

const CheckoutML = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

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

    if (!selectedProduct) {
      newErrors.product = "Pilih produk terlebih dahulu!";
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

    // Kirim data ke backend Laravel
    fetch('http://localhost:8000/api/pesanan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produk: selectedProduct,
        game_id: formData.game_id,
        server_id: formData.server_id,
        payment_method: formData.paymentMethod,
        account_number: formData.accountNumber,
        bank_name: formData.bankName,
        kode_promo: formData.kode_promo,
        total: productOptions.find(p => p.label === selectedProduct)?.price || 0
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal');
        return res.json();
      })
      .then(data => {
        if (data) setShowSuccess(true);
      })
      .catch(() => {
        alert("Gagal mengirim data ke server!");
      });
  };

  return (
    <div className="checkout-container">
      {!showSuccess ? (
        <div className="checkout-content">
          <div className="game-header">
            <img 
              src="https://i.imgur.com/q2FAJ3f.jpeg" 
              alt="Mobile Legends" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>MOBILE LEGENDS</h2>
              <p>Top-up Diamond dan Pass untuk berbagai keperluan dalam game</p>
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
                      src="https://i.imgur.com/5OItBDb.jpeg"
                      alt={product.label} 
                      className="product-image"
                    />
                    <div className="product-details">
                      <h4>{product.label}</h4>
                      <p>{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.product && <span className="error">{errors.product}</span>}
            </div>

            <div className="form-section">
              <form onSubmit={handleSubmit} autoComplete="off">
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
                <span>{selectedProduct}</span>
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
                setSelectedProduct("");
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

export default CheckoutML;