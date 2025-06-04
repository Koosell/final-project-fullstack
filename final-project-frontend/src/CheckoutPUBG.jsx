import React, { useState } from "react";
import "./css/Checkout.css";

const nominalOptions = [
  // PASTIKAN HARGA ADALAH ANGKA (NUMBER)
  // PASTIKAN LABEL SAMA PERSIS DENGAN NAMA DI DATABASE (ProductSeeder)
  { label: "60 UC PUBG", price: 15000, img: "uc.jpg", popular: false },
  { label: "325 UC PUBG", price: 75000, img: "uc.jpg", popular: true },
  { label: "660 UC PUBG", price: 145000, img: "uc.jpg", popular: false },
  { label: "1800 UC PUBG", price: 375000, img: "uc.jpg", popular: true },
  { label: "3850 UC PUBG", price: 750000, img: "uc.jpg", popular: false },
  { label: "8100 UC PUBG", price: 1500000, img: "uc.jpg", popular: true }
];

const CheckoutPUBG = () => {
  // Ganti selectedNominal menjadi selectedProduct agar konsisten dengan backend
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    game_id: "",
    server_id: "",
    kode_promo: "",
    paymentMethod: "", // Set default kosong, atau sesuaikan dengan salah satu value yang valid
    accountNumber: "",
    bankName: ""
  });
  // Ganti errors.nominal menjadi errors.product
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

    // Clear error ketika user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Ganti selectedNominal menjadi selectedProduct
    if (!selectedProduct) {
      newErrors.product = "Pilih nominal terlebih dahulu!"; // Ubah pesan error
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

    // Validasi untuk e-wallet (selain Transfer Bank)
    if (formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && !formData.accountNumber) { // Sesuaikan "bank" menjadi "Transfer Bank"
      newErrors.accountNumber = `Nomor ${formData.paymentMethod.toUpperCase()} wajib diisi`;
    }

    // Validasi untuk bank transfer
    if (formData.paymentMethod === "Transfer Bank" && !formData.bankName) { // Sesuaikan "bank" menjadi "Transfer Bank"
      newErrors.bankName = "Pilih bank terlebih dahulu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // UBAH FUNGSI HANDLESUBMIT INI AGAR MENGIRIM DATA KE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("Anda harus login untuk melakukan pembelian!");
        return;
    }

    // Temukan harga produk yang dipilih dari nominalOptions (gunakan selectedProduct)
    const productPrice = nominalOptions.find(p => p.label === selectedProduct)?.price || 0; // Ganti nominalOptions ke productOptions jika Anda ganti nama variabel

    try {
        // Langkah 1: Dapatkan CSRF cookie dari Laravel Sanctum
        await fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include'
        });

        // Langkah 2: Kirim data pesanan ke backend Laravel
        const response = await fetch('http://localhost:8000/api/orders', { // URL ke OrderController@store
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            credentials: 'include',
            body: JSON.stringify({
                selected_product_label: selectedProduct, // Label produk yang dipilih (selectedProduct)
                quantity: 1, // Asumsi pembelian langsung adalah 1 produk
                game_id: formData.game_id,
                server_id: formData.server_id,
                payment_method: formData.paymentMethod, // Ini akan mengirim nilai yang sudah disesuaikan
                account_number: formData.accountNumber,
                bank_name: formData.bankName,
                promo_code: formData.kode_promo,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = "Gagal mengirim data ke server!";
            if (errorData.message) {
                errorMessage += ` ${errorData.message}`;
            }
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
            setSelectedProduct(""); // Reset selectedProduct
            setFormData({
                game_id: "",
                server_id: "",
                kode_promo: "",
                paymentMethod: "", // Reset ke kosong
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
            <img
              src="https://i.imgur.com/Eba983T.jpeg" // Contoh gambar PUBG
              alt="PUBG Mobile" // Ubah alt text
              className="game-logo"
            />
            <div className="game-info">
              <h2>PUBG MOBILE</h2>
              <p>Top-up UC untuk berbagai keperluan dalam game</p>
            </div>
          </div>

          <div className="checkout-grid">
            <div className="product-section">
              <h3>Pilih Nominal UC</h3>
              <div className="product-scroller">
                {nominalOptions.map((nominal, index) => ( // Ubah nominalOptions ke productOptions jika Anda ganti nama variabel
                  <div
                    key={index}
                    className={`product-card ${selectedProduct === nominal.label ? "selected" : ""} ${nominal.popular ? "popular" : ""}`} // selectedNominal ke selectedProduct
                    onClick={() => setSelectedProduct(nominal.label)} // setSelectedNominal ke setSelectedProduct
                  >
                    {nominal.popular && <span className="popular-badge">POPULAR</span>}
                    <img src={`https://i.imgur.com/ygtcmVZ.jpeg/${nominal.img}`} alt={nominal.label} /> {/* Sesuaikan path gambar jika berbeda */}
                    <div className="product-details">
                      <h4>{nominal.label}</h4>
                      <p>{formatPrice(nominal.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              {errors.product && <span className="error">{errors.product}</span>} {/* errors.nominal ke errors.product */}
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
                        value="DANA" // UBAH KE "DANA"
                        checked={formData.paymentMethod === "DANA"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      <span className="payment-label">DANA</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="OVO" // UBAH KE "OVO"
                        checked={formData.paymentMethod === "OVO"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      <span className="payment-label">OVO</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="GoPay" // UBAH KE "GoPay"
                        checked={formData.paymentMethod === "GoPay"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      <span className="payment-label">GoPay</span>
                    </label>
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Transfer Bank" // UBAH KE "Transfer Bank"
                        checked={formData.paymentMethod === "Transfer Bank"}
                        onChange={handleInputChange}
                        required
                      />{" "}
                      <span className="payment-label">Transfer Bank</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
                </div>

                {/* Kondisi untuk menampilkan Nomor Akun E-Wallet */}
                {formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && (
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

                {/* Kondisi untuk menampilkan Pilihan Bank */}
                {formData.paymentMethod === "Transfer Bank" && (
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
                <span>{selectedProduct}</span> {/* selectedNominal ke selectedProduct */}
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
                setSelectedProduct(""); // selectedNominal ke selectedProduct
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

export default CheckoutPUBG;