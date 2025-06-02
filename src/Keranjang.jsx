import React from "react";
import { Link } from "react-router-dom";
import "./css/Keranjang.css";

const Keranjang = ({ cartItems, updateQuantity, removeFromCart, getTotalPrice }) => {
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <div className="keranjang-wrapper">
      <div className="keranjang-header">
        <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
        </svg>
        <h1 className="keranjang-title">Keranjang Belanja</h1>
        <span className="item-count">{cartItems.length} item</span>
      </div>

      {cartItems.length === 0 ? (
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
            {cartItems.map((item, index) => (
              <div key={item.id || index} className="cart-item" style={{ '--index': index }}>
                <div className="item-details">
                  <h3 className="item-name">{item.label}</h3>
                  <p className="item-description">{item.description || "Deskripsi produk"}</p>
                  <div className="item-price">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="quantity">{item.quantity || 1}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>

                <div className="item-total">
                  {formatPrice(item.price * (item.quantity || 1))}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Ringkasan Pesanan</h3>
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} item)</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="summary-row">
                <span>Ongkos Kirim</span>
                <span className="free">Gratis</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
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