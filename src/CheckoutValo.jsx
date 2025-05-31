import React, { useState } from "react";
import "./css/Checkout.css";

const productOptions = [
  { label: "475 Valorant Points", price: "Rp 75.000", img: "vp.png", popular: false },
  { label: "Battle Pass", price: "Rp 149.900", img: "battlepass.png", popular: true },
  { label: "1000 Valorant Points", price: "Rp 150.000", img: "vp.png", popular: false },
  { label: "2050 Valorant Points", price: "Rp 299.000", img: "vp.png", popular: true },
  { label: "3650 Valorant Points", price: "Rp 499.000", img: "vp.png", popular: false },
  { label: "5350 Valorant Points", price: "Rp 699.000", img: "vp.png", popular: false },
  { label: "11000 Valorant Points", price: "Rp 1.399.000", img: "vp.png", popular: true }
];

const CheckoutValorant = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    riot_id: "",
    tagline: "",
    kode_promo: "",
    metode: "Dana"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericOnly = value.replace(/\D/g, "");
    if (name === "riot_id" || name === "tagline") {
      setForm((prev) => ({ ...prev, [name]: numericOnly }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Pilih produk terlebih dahulu!");
      return;
    }
    setTimeout(() => setSuccess(true), 500);
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setForm({ riot_id: "", tagline: "", kode_promo: "", metode: "Dana" });
    setSuccess(false);
  };

  return (
    <div className="checkout-container">
      {!success ? (
        <div className="checkout-content">
          <header className="game-header">
            <img 
              src="https://i.imgur.com/4WVAckQ.jpeg" 
              alt="Valorant" 
              className="game-logo"
            />
            <div className="game-info">
              <h2>VALORANT</h2>
              <p>Top-up Valorant Points dan Battle Pass untuk skin, agen, dan lainnya</p>
            </div>
          </header>

          <main className="checkout-grid">
            <section className="product-section">
              <h3>Pilih Produk</h3>
              <div className="product-scroller">
                {productOptions.map((product, idx) => (
                  <div
                    key={idx}
                    className={`product-card ${selectedProduct === product.label ? "selected" : ""} ${product.popular ? "popular" : ""}`}
                    onClick={() => setSelectedProduct(product.label)}
                  >
                    {product.popular && <span className="popular-badge">POPULAR</span>}
                    <img 
                      src="https://i.imgur.com/Eba983T.jpeg" 
                      alt={product.label} 
                      className="product-image"
                    />
                    <div className="product-details">
                      <h4>{product.label}</h4>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="form-section">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="riot_id">Riot ID</label>
                  <input
                    type="text"
                    id="riot_id"
                    name="riot_id"
                    value={form.riot_id}
                    onChange={handleChange}
                    placeholder="Masukkan Riot ID"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="tagline">Tagline</label>
                  <input
                    type="text"
                    id="tagline"
                    name="tagline"
                    value={form.tagline}
                    onChange={handleChange}
                    placeholder="Masukkan Tagline (contoh: 1234)"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="metode">Metode Pembayaran</label>
                  <select
                    id="metode"
                    name="metode"
                    value={form.metode}
                    onChange={handleChange}
                    required
                  >
                    <option value="Dana">Dana</option>
                    <option value="OVO">OVO</option>
                    <option value="Gopay">Gopay</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="kode_promo">Kode Promo (Opsional)</label>
                  <input
                    type="text"
                    id="kode_promo"
                    name="kode_promo"
                    value={form.kode_promo}
                    onChange={handleChange}
                    placeholder="Masukkan kode promo"
                  />
                </div>

                <button type="submit" className="submit-btn">Bayar Sekarang</button>
              </form>
            </section>
          </main>
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
                <span>{form.riot_id}</span>
              </div>
              <div className="summary-item">
                <span>Metode Pembayaran</span>
                <span>{form.metode}</span>
              </div>
            </div>
            <button className="back-btn" onClick={resetForm}>Beli Lagi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutValorant;