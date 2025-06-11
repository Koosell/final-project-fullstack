import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCart } from './CartContext'; // <-- Menggunakan hook useCart
import "./css/Keranjang.css";

const Keranjang = () => {
    // Mengambil semua yang kita butuhkan dari Context
    const { cart, loading, fetchCart } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        const yourAuthToken = localStorage.getItem('token');
        try {
            if (newQuantity <= 0) {
                await axios.delete(`http://127.0.0.1:8000/api/cart/${cartItemId}`, {
                    headers: { 'Authorization': `Bearer ${yourAuthToken}` }
                });
            } else {
                await axios.put(`http://127.0.0.1:8000/api/cart/${cartItemId}`, 
                    { quantity: newQuantity },
                    { headers: { 'Authorization': `Bearer ${yourAuthToken}` } }
                );
            }
            fetchCart(); 
        } catch (error) {
            console.error("Gagal mengubah kuantitas:", error);
            alert("Gagal mengubah kuantitas item.");
        }
    };

    const removeFromCart = async (cartItemId) => {
        const yourAuthToken = localStorage.getItem('token');
        if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cart/${cartItemId}`, {
                    headers: { 'Authorization': `Bearer ${yourAuthToken}` }
                });
                fetchCart();
            } catch (error) {
                console.error("Gagal menghapus item:", error);
                alert("Gagal menghapus item.");
            }
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };
    
    if (loading) {
        return <div className="keranjang-wrapper"><h3>Memuat Keranjang...</h3></div>;
    }

    return (
        <div className="keranjang-wrapper">
            <div className="keranjang-header">
                <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
                <h1 className="keranjang-title">Keranjang Belanja</h1>
                <span className="item-count">{cart?.cart_items?.length || 0} item</span>
            </div>

            {!cart || cart.cart_items.length === 0 ? (
                <div className="empty-cart">
                    <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3>Keranjang Kosong</h3>
                    <p>Belum ada produk yang ditambahkan ke keranjang</p>
                    <Link to="/ProdukMenu" className="continue-shopping-btn">
                        Lanjut Belanja
                    </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.cart_items.map((item, index) => (
                            <div key={item.id} className="cart-item" style={{ '--index': index }}>
                                <div className="item-details">
                                    <h3 className="item-name">{item.itemable.name}</h3>
                                    <p className="item-description">{item.itemable.description || "Deskripsi produk"}</p>
                                    <div className="item-price">
                                        {formatPrice(item.itemable.price)}
                                    </div>
                                </div>

                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </button>
                                </div>

                                <div className="item-total">
                                    {formatPrice(item.itemable.price * item.quantity)}
                                </div>

                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-card">
                            <h3>Ringkasan Pesanan</h3>
                            <div className="summary-row">
                                <span>Subtotal ({cart.cart_items.length} item)</span>
                                <span>{formatPrice(cart.total_amount)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Ongkos Kirim</span>
                                <span className="free">Gratis</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>{formatPrice(cart.total_amount)}</span>
                            </div>
                            <Link to="/checkout/produk" className="checkout-btn">
                                Lanjut ke Pembayaran
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Keranjang;
