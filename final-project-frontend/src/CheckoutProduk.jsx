import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext'; // <-- 1. IMPORT useCart
import axios from 'axios';
import styles from './css/CheckoutProduk.module.css';

const CheckoutProduk = () => {
    // 2. Ambil semua data yang dibutuhkan dari Context
    const { cart, totalPrice, itemCount, loading, fetchCart } = useCart();
    const navigate = useNavigate();

    // State untuk form pengiriman dan error
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        paymentMethod: "",
        accountNumber: "",
        bankName: "",
    });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        document.body.classList.add('checkout-produk-page');
        return () => document.body.classList.remove('checkout-produk-page');
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };
    
    // Handler dan validasi form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handlePhoneInput = (e) => {
        const { value } = e.target;
        if (/^(\+?[0-9]*)$/.test(value)) {
            setFormData((prev) => ({ ...prev, phone: value }));
        }
    };
    
    const handleNumericInput = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Nama diperlukan";
        if (!formData.address.trim()) newErrors.address = "Alamat diperlukan";
        if (!formData.phone.match(/^(?:\+62|0)\d{9,15}$/)) newErrors.phone = "Nomor telepon tidak valid";
        if (!formData.paymentMethod) newErrors.paymentMethod = "Pilih metode pembayaran";
        if (formData.paymentMethod && formData.paymentMethod !== "bank" && !/^\d+$/.test(formData.accountNumber.trim())) newErrors.accountNumber = "Nomor akun e-wallet diperlukan";
        if (formData.paymentMethod === "bank" && !formData.bankName) newErrors.bankName = "Pilih bank";
        return newErrors;
    };

    // Fungsi untuk menangani proses checkout
    const handleProcessOrder = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsProcessing(true);
        const yourAuthToken = localStorage.getItem('token');

        try {
            await axios.post('http://127.0.0.1:8000/api/orders', {
                customer_name: formData.name,
                shipping_address: formData.address,
                phone_number: formData.phone,
                payment_method: formData.paymentMethod,
                payment_details: formData.paymentMethod === 'bank' ? formData.bankName : formData.accountNumber,
            }, {
                headers: { 'Authorization': `Bearer ${yourAuthToken}` }
            });

            alert('Pesanan Anda berhasil dibuat!');
            await fetchCart(); // Kosongkan keranjang di context
            navigate('/'); // Arahkan ke halaman utama

        } catch (error) {
            console.error("Gagal membuat pesanan:", error);
            alert('Terjadi kesalahan saat memproses pesanan Anda.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return <div className={styles.checkoutWrapper}>Memuat data...</div>;
    }
    
    if (!cart || itemCount === 0) {
        return (
            <div className={styles.checkoutWrapper}>
                <div className={styles.emptyCheckout}>
                    <h3>Tidak Ada Pesanan</h3>
                    <p>Keranjang Anda kosong.</p>
                    <Link to="/ProdukMenu" className={styles.continueShoppingBtn}>
                        Kembali Belanja
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.checkoutWrapper}>
            <div className={styles.checkoutHeader}>
                {/* Header Konten */}
                <h1 className={styles.checkoutTitle}>Checkout Produk</h1>
            </div>

            <div className={styles.checkoutContent}>
                <div className={styles.checkoutItems}>
                    <h3>Daftar Pesanan</h3>
                    <div className={styles.itemsGrid}>
                        {cart.cart_items.map((item, index) => (
                            <div key={item.id} className={styles.checkoutItem} style={{ "--index": index }}>
                                <div className={styles.itemDetails}>
                                    <h4 className={styles.itemName}>{item.itemable.name}</h4>
                                    <p className={styles.itemDescription}>{item.itemable.description || "Deskripsi produk"}</p>
                                    <div className={styles.itemPrice}>
                                        {formatPrice(item.itemable.price)} x {item.quantity}
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>{formatPrice(item.itemable.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.checkoutForm}>
                    <div className={styles.formCard}>
                        <h3>Detail Pengiriman & Pembayaran</h3>
                        <form onSubmit={handleProcessOrder}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nama Lengkap</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Masukkan nama lengkap" />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Alamat Pengiriman</label>
                                <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Masukkan alamat lengkap" />
                                {errors.address && <span className={styles.error}>{errors.address}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Nomor Telepon</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneInput} placeholder="Contoh: 081234567890" />
                                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Metode Pembayaran</label>
                                <div className={styles.paymentOptions}>
                                    {['dana', 'ovo', 'gopay', 'bank'].map(method => (
                                        <label key={method} className={styles.paymentOption}>
                                            <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={handleInputChange} />
                                            <span className={styles.paymentLabel}>{method === 'bank' ? 'Transfer Bank' : method.toUpperCase()}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.paymentMethod && <span className={styles.error}>{errors.paymentMethod}</span>}
                            </div>
                            {formData.paymentMethod && formData.paymentMethod !== "bank" && (
                                <div className={styles.formGroup}>
                                    <label htmlFor="accountNumber">Nomor Akun {formData.paymentMethod.toUpperCase()}</label>
                                    <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleNumericInput} placeholder={`Masukkan nomor ${formData.paymentMethod.toUpperCase()}`} />
                                    {errors.accountNumber && <span className={styles.error}>{errors.accountNumber}</span>}
                                </div>
                            )}
                            {formData.paymentMethod === "bank" && (
                                <div className={styles.formGroup}>
                                    <label htmlFor="bankName">Pilih Bank</label>
                                    <select id="bankName" name="bankName" value={formData.bankName} onChange={handleInputChange}>
                                        <option value="">Pilih bank</option>
                                        <option value="BCA">BCA</option>
                                        <option value="Mandiri">Mandiri</option>
                                    </select>
                                    {errors.bankName && <span className={styles.error}>{errors.bankName}</span>}
                                </div>
                            )}
                            <button type="submit" className={styles.checkoutBtn} disabled={isProcessing}>
                                {isProcessing ? 'Memproses...' : 'Konfirmasi Pesanan'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduk;
