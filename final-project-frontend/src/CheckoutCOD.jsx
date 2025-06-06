import React, { useState } from "react";
import "./css/Checkout.css";

// --- Data Produk COD Mobile (HARDCODED) ---
// Pastikan Anda menempatkan file gambar 'cod_points.png' (atau nama lain)
// di folder 'final-project-frontend/public/images/'
const productOptions = [
  // Harga di sini adalah NUMBER (angka)
  { label: "80 CP COD Mobile", price: 15000, img: "cod_points.png", popular: false },
  { label: "170 CP COD Mobile", price: 30000, img: "cod_points.png", popular: true },
  { label: "340 CP COD Mobile", price: 55000, img: "cod_points.png", popular: false },
  { label: "690 CP COD Mobile", price: 100000, img: "cod_points.png", popular: false },
  { label: "1400 CP COD Mobile", price: 190000, img: "cod_points.png", popular: true },
  { label: "2400 CP COD Mobile", price: 300000, img: "cod_points.png", popular: false },
  { label: "4000 CP COD Mobile", price: 729900, img: "cod_points.png", popular: false },
  { label: "Premium Pass Bundle COD Mobile", price: 299900, img: "cod_points.png", popular: false } // Menggunakan nama yang lebih unik
];

const CheckoutCOD = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    game_id: "",    // Untuk User ID COD Mobile
    server_id: "",  // Untuk Server ID atau Zone ID COD Mobile
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
        accountNumber: "",
        bankName: ""
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
    if (!formData.game_id) { newErrors.game_id = "User ID wajib diisi"; }
    if (!formData.server_id) { newErrors.server_id = "Server ID wajib diisi"; } // Ubah ini jika Server ID opsional
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
        // Opsional: Anda mungkin ingin mengarahkan pengguna ke halaman login di sini
        // Misalnya: navigate('/login'); // jika Anda menggunakan react-router-dom
        return;
    }

    const productPrice = productOptions.find(p => p.label === selectedProduct)?.price || 0; // Mendapatkan harga numerik

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
                game_id: formData.game_id,   // User ID
                server_id: formData.server_id, // Server ID
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
            {/* Header gambar COD Mobile */}
            <img src="https://i.imgur.com/8QGj14t.jpeg" alt="Call of Duty Mobile" className="game-logo" />
            <div className="game-info">
              <h2>CALL OF DUTY MOBILE</h2>
              <p>Top-up CP (CoD Points) untuk skin, Battle Pass, dan lainnya</p>
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
                    {/* Menggunakan path relatif ke public/images di frontend */}
                    <img src={`https://i.imgur.com/gCRJcLU.png${product.img}`} alt={product.label} className="product-image" /> 
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
                    placeholder="Masukkan Server ID (Opsional jika tidak ada)"
                    value={formData.server_id}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    // required // Server ID bisa tidak wajib jika game tidak membutuhkannya
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

export default CheckoutCOD;