
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './css/CheckoutProduk.module.css';

const CheckoutProduk = ({ cartItems, getTotalPrice, setCartItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "",
    accountNumber: "",
    bankName: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.add('checkout-produk-page');
    return () => document.body.classList.remove('checkout-produk-page');
  }, []);

  console.log("CheckoutProduk rendered, cartItems:", cartItems);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value;
    if (/^(\+?[0-9]*)$/.test(value)) {
      setFormData((prev) => ({ ...prev, phone: value }));
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama diperlukan";
    if (!formData.address.trim()) newErrors.address = "Alamat diperlukan";
    if (!formData.phone.match(/^(?:\+62|0)\d{9,15}$/))
      newErrors.phone = "Nomor telepon tidak valid (contoh: +6281234567890 atau 081234567890)";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Pilih metode pembayaran";
    if (formData.paymentMethod !== "bank" && !formData.accountNumber.trim())
      newErrors.accountNumber = "Nomor akun e-wallet diperlukan";
    if (formData.paymentMethod === "bank" && !formData.bankName)
      newErrors.bankName = "Pilih bank";
    return newErrors;
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    alert(
      `Pesanan berhasil!\n\nDetail:\nNama: ${formData.name}\nAlamat: ${formData.address}\nNo. Telepon: ${formData.phone}\nMetode Pembayaran: ${
        formData.paymentMethod === "bank"
          ? `Transfer Bank (${formData.bankName})`
          : formData.paymentMethod.toUpperCase()
      }\n${formData.paymentMethod !== "bank" ? `Nomor Akun: ${formData.accountNumber}\n` : ""}Total: ${formatPrice(
        getTotalPrice()
      )}`
    );

    setCartItems([]);
    setFormData({
      name: "",
      address: "",
      phone: "",
      paymentMethod: "",
      accountNumber: "",
      bankName: "",
    });
    navigate("/ProdukMenu");
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutHeader}>
        <svg className={styles.headerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        <h1 className={styles.checkoutTitle}>Checkout Produk</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCheckout}>
          <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3>Tidak Ada Pesanan</h3>
          <p>Belum ada produk di keranjang untuk di-checkout</p>
          <Link to="/ProdukMenu" className={styles.continueShoppingBtn}>
            Kembali Belanja
          </Link>
        </div>
      ) : (
        <div className={styles.checkoutContent}>
          <div className={styles.checkoutItems}>
            <h3>Daftar Pesanan</h3>
            <div className={styles.itemsGrid}>
              {cartItems.map((item, index) => (
                <div key={item.id || index} className={styles.checkoutItem} style={{ "--index": index }}>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.label}</h4>
                    <p className={styles.itemDescription}>{item.description || "Deskripsi produk"}</p>
                    <div className={styles.itemPrice}>
                      {formatPrice(item.price)} x {item.quantity}
                    </div>
                  </div>
                  <div className={styles.itemTotal}>{formatPrice(item.price * (item.quantity || 1))}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.checkoutForm}>
            <div className={styles.formCard}>
              <h3>Detail Pengiriman & Pembayaran</h3>
              <form onSubmit={handleConfirmOrder}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Alamat Pengiriman</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Masukkan alamat lengkap (jalan, kota, kode pos)"
                  />
                  {errors.address && <span className={styles.error}>{errors.address}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    placeholder="Contoh: +6281234567890"
                    pattern="[0-9+]*"
                    inputMode="numeric"
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Metode Pembayaran</label>
                  <div className={styles.paymentOptions}>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="dana"
                        checked={formData.paymentMethod === "dana"}
                        onChange={handleInputChange}
                      />
                      <span className={styles.paymentLabel}>DANA</span>
                    </label>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ovo"
                        checked={formData.paymentMethod === "ovo"}
                        onChange={handleInputChange}
                      />
                      <span className={styles.paymentLabel}>OVO</span>
                    </label>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gopay"
                        checked={formData.paymentMethod === "gopay"}
                        onChange={handleInputChange}
                      />
                      <span className={styles.paymentLabel}>GoPay</span>
                    </label>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={handleInputChange}
                      />
                      <span className={styles.paymentLabel}>Transfer Bank</span>
                    </label>
                  </div>
                  {errors.paymentMethod && <span className={styles.error}>{errors.paymentMethod}</span>}
                </div>
                {formData.paymentMethod && formData.paymentMethod !== "bank" && (
                  <div className={styles.formGroup}>
                    <label htmlFor="accountNumber">Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`}
                    />
                    {errors.accountNumber && <span className={styles.error}>{errors.accountNumber}</span>}
                  </div>
                )}
                {formData.paymentMethod === "bank" && (
                  <div className={styles.formGroup}>
                    <label htmlFor="bankName">Pilih Bank</label>
                    <select
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                    >
                      <option value="">Pilih bank</option>
                      <option value="BCA">BCA</option>
                      <option value="Mandiri">Mandiri</option>
                      <option value="BNI">BNI</option>
                    </select>
                    {errors.bankName && <span className={styles.error}>{errors.bankName}</span>}
                  </div>
                )}
                <button type="submit" className={styles.checkoutBtn}>
                  Konfirmasi Pesanan
                </button>
              </form>
            </div>
          </div>

          <div className={styles.checkoutSummary}>
            <div className={styles.summaryCard}>
              <h3>Ringkasan Pembayaran</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal ({cartItems.length} item)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Ongkos Kirim</span>
                <span className={styles.free}>Gratis</span>
              </div>
              <div className={styles.summaryDivider}></div>
              <div className={styles.summaryRow + ' ' + styles.total}>
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutProduk;
