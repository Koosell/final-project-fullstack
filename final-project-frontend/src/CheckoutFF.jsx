import React, { useState } from "react"; // Hapus useEffect
import "./css/Checkout.css";

const productOptions = [
  // Harga adalah NUMBER (angka)
  // img adalah URL GAMBAR IMGRUR yang Anda inginkan untuk semua produk FF
  { label: "100 Diamond FF", price: 16000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: false }, 
  { label: "210 Diamond FF", price: 32000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: true },
  { label: "530 Diamond FF", price: 79000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: false },
  { label: "Double Daily Diamond FF", price: 30000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: true },
  { label: "1060 Diamond FF", price: 149000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: false },
  { label: "2180 Diamond FF", price: 299000, img: "https://i.imgur.com/chTbnxD.jpeg", popular: true }
];

const CheckoutFF = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    game_id: "",
    server_id: "",
    kode_promo: "",
    paymentMethod: "", 
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
    if ((name === "game_id" || name === "server_id") && !/^\d*$/.test(value)) {
      return; 
    }
    setFormData(prev => ({ ...prev, [name]: value }));

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
    if (!formData.server_id) { newErrors.server_id = "Server ID wajib diisi"; }
    if (!formData.paymentMethod) { newErrors.paymentMethod = "Pilih metode pembayaran"; }
    
    if (formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && !formData.accountNumber) {
        newErrors.accountNumber = `Nomor ${formData.paymentMethod.toUpperCase()} wajib diisi`;
    }
    if (formData.paymentMethod === "Transfer Bank" && !formData.bankName) {
      newErrors.bankName = "Pilih bank terlebih dahulu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!validateForm()) { return; }

    const authToken = localStorage.getItem('authToken'); 
    if (!authToken) {
        alert("Anda harus login untuk melakukan pembelian!");
        return;
    }

    try {
        await fetch('http://localhost:8000/sanctum/csrf-cookie', { credentials: 'include' });

        const response = await fetch('http://localhost:8000/api/orders', { 
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Bearer ${authToken}`
            },
            credentials: 'include',
            body: JSON.stringify({
                selected_product_label: selectedProduct, 
                quantity: 1, 
                game_id: formData.game_id,   
                server_id: formData.server_id, 
                payment_method: formData.paymentMethod, 
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
            <img 
              src="https://i.imgur.com/chTbnxD.jpeg" // Header gambar FF
              alt="Free Fire"
              className="game-logo"
            />
            <div className="game-info">
              <h2>FREE FIRE</h2>
              <p>Top-up Diamond untuk berbagai keperluan dalam game</p>
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

                {formData.paymentMethod && formData.paymentMethod !== "Transfer Bank" && (
                  <div className="input-group">
                    <label>Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`} inputMode="numeric" pattern="[0-9]*" />
                    {errors.accountNumber && <span className="error">{errors.accountNumber}</span>}
                  </div>
                )}

                {formData.paymentMethod === "Transfer Bank" && (
                  <div className="input-group">
                    <label>Pilih Bank</label>
                    <select
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                    >
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
                <span>User ID</span>
                <span>{formData.game_id}</span>
              </div>
              <div className="summary-item">
                <span>Server ID</span>
                <span>{formData.server_id}</span>
              </div>
              {/* Ini bagian akhir dari CheckoutFF */}
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

export default CheckoutFF;