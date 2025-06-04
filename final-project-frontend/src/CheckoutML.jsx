import React, { useState } from "react";
import "./css/Checkout.css";
// Jika Anda ingin menggunakan Axios dengan setup api.js seperti yang disarankan sebelumnya,
// Anda bisa mengimpornya di sini:
// import api from './api'; // Pastikan path ke api.js Anda benar

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

  const handleSubmit = async (e) => { // Menggunakan async/await untuk penanganan fetch yang lebih baik
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Dapatkan token dari localStorage (Pastikan Anda sudah punya sistem login/register dan menyimpan token dengan kunci 'authToken')
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("Anda harus login untuk melakukan pembelian!");
        // Opsional: Anda mungkin ingin mengarahkan pengguna ke halaman login di sini
        // Misalnya: navigate('/login'); jika Anda menggunakan react-router-dom
        return;
    }

    // Temukan harga produk yang dipilih dari productOptions
    const productPrice = productOptions.find(p => p.label === selectedProduct)?.price || 0;

    try {
        // Langkah 1: Dapatkan CSRF cookie dari Laravel Sanctum
        // Ini penting untuk keamanan dan agar sesi Laravel dapat dikenali
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET', // Metode GET untuk endpoint csrf-cookie
            credentials: 'include' // Penting untuk mengirim dan menerima cookie
        });

        // Langkah 2: Kirim data pesanan ke backend Laravel
        const response = await fetch('http://localhost:8000/api/orders', { // <<< PASTIKAN URL INI BENAR
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', // Laravel akan merespons dengan JSON
                'Authorization': `Bearer ${authToken}` // Mengirim token otentikasi dari user yang login
            },
            credentials: 'include', // Penting untuk mengirim cookie sesi/CSRF bersamaan dengan token
            body: JSON.stringify({
                // Payload data yang sesuai dengan OrderController di backend kita
                selected_product_label: selectedProduct, // Label produk yang dipilih
                quantity: 1, // Asumsi pembelian langsung adalah 1 produk
                game_id: formData.game_id,
                server_id: formData.server_id,
                payment_method: formData.paymentMethod,
                account_number: formData.accountNumber, // Untuk payment_details di backend
                bank_name: formData.bankName,           // Untuk payment_details di backend
                promo_code: formData.kode_promo,
                // total_amount akan dihitung dan divalidasi ulang di backend
            })
        });

        if (!response.ok) {
            // Jika respons tidak OK (misal status 4xx atau 5xx)
            const errorData = await response.json(); // Coba parse respons error dari backend
            let errorMessage = "Gagal mengirim data ke server!";
            if (errorData.message) {
                errorMessage += ` ${errorData.message}`;
            }
            if (errorData.errors) { // Jika ada error validasi dari Laravel
                errorMessage += `\nDetail: ${Object.values(errorData.errors).flat().join(', ')}`;
            }
            alert(errorMessage);
            console.error("Backend error response:", errorData);
            return; // Hentikan eksekusi jika ada error
        }

        // Jika respons OK
        const data = await response.json();
        if (data) {
            setShowSuccess(true);
            alert(data.message || "Pesanan berhasil dibuat!"); // Tampilkan pesan sukses dari backend
            // Opsional: reset form setelah sukses
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
        }
    } catch (error) {
        // Tangani error jaringan atau error lain yang tidak terkait respons HTTP
        alert("Terjadi kesalahan koneksi atau server! Silakan coba lagi.");
        console.error("Fetch error:", error);
    }
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
