import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext'; 
import { usePayment } from './PaymentContext';
import styles from './css/CheckoutProduk.module.css';

const CheckoutProduk = () => {
    const { cart, totalPrice, itemCount, loading, fetchCart } = useCart();
    const { handlePay } = usePayment();
    const navigate = useNavigate();

    // State hanya untuk form pengiriman
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        document.body.classList.add('checkout-produk-page');
        return () => document.body.classList.remove('checkout-produk-page');
    }, []);

    const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handlePhoneInput = (e) => {
        const { value } = e.target;
        if (/^(\+?[0-9]*)$/.test(value)) {
            setFormData((prev) => ({ ...prev, phone: value }));
        }
    };

    // Validasi hanya untuk data pengiriman
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Nama diperlukan";
        if (!formData.address.trim()) newErrors.address = "Alamat diperlukan";
        if (!formData.phone.match(/^(?:\+62|0)\d{9,15}$/)) newErrors.phone = "Nomor telepon tidak valid";
        return newErrors;
    };

    // Fungsi submit untuk memanggil Midtrans
    const handleProcessOrder = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!cart || cart.cart_items.length === 0) {
            alert("Keranjang Anda kosong!");
            return;
        }

        setIsProcessing(true);

        const orderDetails = {
            totalPrice: totalPrice,
            items: cart.cart_items.map(item => ({
                id: item.itemable.id,
                price: item.itemable.price,
                quantity: item.quantity,
                name: item.itemable.name,
            }))
        };
        
        handlePay(orderDetails, {
            onSuccess: async () => {
                alert('Pembayaran berhasil! Pesanan Anda akan segera diproses.');
                await fetchCart();
                navigate('/');
            },
            onClose: () => setIsProcessing(false),
            onError: () => setIsProcessing(false)
        });
    };

    if (loading) {
        return <div className={styles.checkoutWrapper}>Memuat data...</div>;
    }
    
    if (!cart || itemCount === 0) {
        return (
            <div className={styles.checkoutWrapper}>
                <div className={styles.emptyCheckout}>
                    <h3>Keranjang Anda Kosong</h3>
                    <p>Silakan pilih merchandise terlebih dahulu.</p>
                    <Link to="/produkMenu" className={styles.continueShoppingBtn}>Kembali Belanja</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.checkoutWrapper}>
            <div className={styles.checkoutHeader}>
                <h1 className={styles.checkoutTitle}>Checkout Produk</h1>
            </div>

            <div className={styles.checkoutContent}>
                <div className={styles.checkoutItems}>
                    <h3>Daftar Pesanan ({itemCount} item)</h3>
                    <div className={styles.itemsGrid}>
                        {cart.cart_items.map((item, index) => (
                            <div key={item.id} className={styles.checkoutItem} style={{ "--index": index }}>
                                <div className={styles.itemDetails}>
                                    <h4 className={styles.itemName}>{item.itemable.name}</h4>
                                    <div className={styles.itemPrice}>
                                        {formatPrice(item.itemable.price)} x {item.quantity}
                                    </div>
                                </div>
                                <div className={styles.itemTotal}>{formatPrice(item.itemable.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalPrice}>
                        <span>Total</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                </div>

                <div className={styles.checkoutForm}>
                    <div className={styles.formCard}>
                        <h3>Detail Pengiriman</h3>
                        <form onSubmit={handleProcessOrder}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nama Lengkap</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Masukkan nama lengkap" required />
                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Alamat Pengiriman</label>
                                <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Masukkan alamat lengkap" required />
                                {errors.address && <span className={styles.error}>{errors.address}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Nomor Telepon</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneInput} placeholder="Contoh: 081234567890" required />
                                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                            </div>
                            <button type="submit" className={styles.checkoutBtn} disabled={isProcessing}>
                                {isProcessing ? 'Memproses...' : `Bayar ${formatPrice(totalPrice)}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduk;