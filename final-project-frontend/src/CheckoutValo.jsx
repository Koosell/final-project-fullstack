import React, { useState } from "react";
import "./css/Checkout.css";

// --- Data Produk Valorant (HARDCODED) ---
// Ini akan membuat produk tampil tanpa mengambil dari backend.
// Gambar akan diambil langsung dari URL Imgur.
const productOptions = [
  // Pastikan harga adalah NUMBER (angka) agar bisa diformat dengan formatPrice
  { label: "475 Valorant Points", price: 75000, img: "https://i.imgur.com/kl6R3AX.png", popular: false },
  { label: "Battle Pass", price: 149900, img: "https://i.imgur.com/kl6R3AX.png", popular: true },
  { label: "1000 Valorant Points", price: 150000, img: "https://i.imgur.com/kl6R3AX.png", popular: false },
  { label: "2050 Valorant Points", price: 299000, img: "https://i.imgur.com/kl6R3AX.png", popular: true },
  { label: "3650 Valorant Points", price: 499000, img: "https://i.imgur.com/kl6R3AX.png", popular: false },
  { label: "5350 Valorant Points", price: 699000, img: "https://i.imgur.com/kl6R3AX.png", popular: false },
  { label: "11000 Valorant Points", price: 1399000, img: "https://i.imgur.com/kl6R3AX.png", popular: true }
];

const CheckoutValorant = () => {
  const [selectedProduct, setSelectedProduct] = useState(""); // Menggunakan string untuk label produk
  const [showSuccess, setShowSuccess] = useState(false);
  // Hapus state loading dan error karena tidak lagi fetching dari API

  const [formData, setFormData] = useState({
    game_id: "",    // Menggunakan game_id untuk Riot ID (sesuai backend)
    server_id: "",  // Menggunakan server_id untuk Tagline (sesuai backend)
    kode_promo: "",
    paymentMethod: "", // Set default kosong
    accountNumber: "", 
    bankName: "" 
  });
  const [errors, setErrors] = useState({});

  // Fungsi untuk memformat harga ke Rupiah
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

    if (name === "paymentMethod") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        accountNumber: "", // Reset saat ganti metode
        bankName: ""       // Reset saat ganti metode
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedProduct) { newErrors.product = "Pilih produk terlebih dahulu!"; }
    if (!formData.game_id) { newErrors.game_id = "Riot ID wajib diisi"; }
    if (!formData.server_id) { newErrors.server_id = "Tagline wajib diisi"; } 
    if (!formData.paymentMethod) { newErrors.paymentMethod = "Pilih metode pembayaran"; }
    
    // Validasi untuk e-wallet (selain Transfer Bank) - sesuaikan dengan nilai radio button
    if (formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && !formData.accountNumber) {
        newErrors.accountNumber = `Nomor ${formData.paymentMethod.toUpperCase()} wajib diisi`;
    }
    // Validasi untuk bank transfer - sesuaikan dengan nilai radio button
    if (formData.paymentMethod === "Transfer Bank" && !formData.bankName) {
      newErrors.bankName = "Pilih bank terlebih dahulu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) { return; }

    const authToken = localStorage.getItem('authToken'); // Asumsi token disimpan di localStorage
    if (!authToken) {
        alert("Anda harus login untuk melakukan pembelian!");
        return;
    }

    try {
        // Langkah 1: Dapatkan CSRF cookie dari Laravel Sanctum
        await fetch('http://localhost:8000/sanctum/csrf-cookie', { credentials: 'include' });

        // Langkah 2: Kirim data pesanan ke backend Laravel
        const response = await fetch('http://localhost:8000/api/orders', { // Pastikan URL ini benar
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}` // Mengirim token otentikasi
            },
            credentials: 'include', // Penting untuk mengirim cookie sesi/CSRF
            body: JSON.stringify({
                selected_product_label: selectedProduct, // Label produk yang dipilih (string)
                quantity: 1, // Asumsi pembelian langsung adalah 1 produk
                game_id: formData.game_id,   // Mengirim Riot ID sebagai game_id ke backend
                server_id: formData.server_id, // Mengirim Tagline sebagai server_id ke backend
                payment_method: formData.paymentMethod, // DANA, OVO, GoPay, Transfer Bank (uppercase)
                account_number: formData.accountNumber, 
                bank_name: formData.bankName, 
                promo_code: formData.kode_promo,
            })
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            let errorMessage = "Gagal mengirim data ke server!";
            if (errorData.message) { errorMessage += ` ${errorData.message}`; }
            if (errorData.errors) { 
                errorMessage += `\nDetail: ${Object.values(errorData.errors).flat().join(', ')}`;
            }
            alert(errorMessage);
            console.error("Backend error response:", errorData);
            return;
        }

        const data = await response.json();
        if (data) {
            setShowSuccess(true);
            alert(data.message || "Pesanan berhasil dibuat!"); 
            setSelectedProduct("");
            setFormData({
                game_id: "",
                server_id: "",
                kode_promo: "",
                paymentMethod: "", 
                accountNumber: "",
                bankName: ""
            });
            setErrors({});
        }
    } catch (error) {
        alert("Terjadi kesalahan koneksi atau server! Silakan coba lagi.");
        console.error("Fetch error:", error);
    }
  };


  return (
    <div className="checkout-container">
      {!showSuccess ? (
        <div className="checkout-content">
          <div className="game-header">
            {/* Header gambar Valorant */}
            <img src="https://i.imgur.com/4WVAckQ.jpeg" alt="VALORANT" className="game-logo" />
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
                    {/* Menggunakan URL gambar langsung dari product.img */}
                    <img src={product.img} alt={product.label} className="product-image" /> 
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
                  <label>Riot ID</label> 
                  <input
                    type="text"
                    name="game_id" // Nama input sesuai backend (game_id)
                    placeholder="Masukkan Riot ID"
                    value={formData.game_id}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                  {errors.game_id && <span className="error">{errors.game_id}</span>}
                </div>

                <div className="input-group">
                  <label>Tagline</label> 
                  <input
                    type="text"
                    name="server_id" // Nama input sesuai backend (server_id)
                    placeholder="Masukkan Tagline (contoh: 1234)"
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
                      <input type="radio" name="paymentMethod" value="DANA" checked={formData.paymentMethod === "DANA"} onChange={handleInputChange} required />{" "}
                      <span className="payment-label">DANA</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="OVO" checked={formData.paymentMethod === "OVO"} onChange={handleInputChange} required />{" "}
                      <span className="payment-label">OVO</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="GoPay" checked={formData.paymentMethod === "GoPay"} onChange={handleInputChange} required />{" "}
                      <span className="payment-label">GoPay</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="Transfer Bank" checked={formData.paymentMethod === "Transfer Bank"} onChange={handleInputChange} required />{" "}
                      <span className="payment-label">Transfer Bank</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
                </div>

                {/* Kondisi untuk menampilkan Nomor Akun E-Wallet */}
                {formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && (
                  <div className="input-group">
                    <label>Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`} inputMode="numeric" pattern="[0-9]*" />
                    {errors.accountNumber && <span className="error">{errors.accountNumber}</span>}
                  </div>
                )}

                {/* Kondisi untuk menampilkan Pilihan Bank */}
                {formData.paymentMethod === "Transfer Bank" && (
                  <div className="input-group">
                    <label>Pilih Bank</label>
                    <select name="bankName" value={formData.bankName} onChange={handleInputChange}>
                      <option value="">Pilih bank</option><option value="BCA">BCA</option><option value="Mandiri">Mandiri</option><option value="BNI">BNI</option><option value="BRI">BRI</option><option value="CIMB Niaga">CIMB Niaga</option><option value="Danamon">Danamon</option>
                    </select>
                    {errors.bankName && <span className="error">{errors.bankName}</span>}
                  </div>
                )}

                <div className="input-group">
                  <label>Kode Promo (Opsional)</label>
                  <input type="text" name="kode_promo" placeholder="Masukkan kode promo" value={formData.kode_promo} onChange={handleInputChange} />
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
                <span>{formData.game_id}</span>
              </div>
              <div className="summary-item">
                <span>Tagline</span>
                <span>{formData.server_id}</span>
              </div>
              <div className="summary-item">
                <span>Metode Pembayaran</span>
                <span>
                  {formData.paymentMethod === "Transfer Bank"
                    ? `Transfer Bank - ${formData.bankName}`
                    : formData.paymentMethod.toUpperCase()
                  }
                </span>
              </div>
              {formData.paymentMethod !== "Transfer Bank" && formData.accountNumber && (
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
                  paymentMethod: "", 
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