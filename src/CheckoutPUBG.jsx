import React, { useState } from "react";
import "./index.css";

const nominalOptions = [
  { label: "60 UC", price: "Rp 15.000", img: "uc.jpg" },
  { label: "325 UC", price: "Rp 75.000", img: "uc.jpg" },
  { label: "660 UC", price: "Rp 145.000", img: "uc.jpg" },
  { label: "1800 UC", price: "Rp 375.000", img: "uc.jpg" }
];

const CheckoutPUBG = () => {
  const [selectedNominal, setSelectedNominal] = useState("");

  return (
    <div className="checkout-wrapper">
      <div className="header-box">
        <img
          src="/images/pubg.jpeg" // Pastikan gambar ini ada di public/images/
          alt="PUBG"
          className="logo-img"
        />
        <h2>PUBG</h2>
        <p>Masukkan data & pilih nominal untuk lanjut top-up</p>
      </div>

      <form method="POST" action="/checkout">
        <input type="hidden" name="game" value="PUBG" />
        <input type="hidden" name="jumlah" value={selectedNominal} />

        <div className="form-section">
          <label htmlFor="game_id">User ID</label>
          <input
            type="text"
            name="game_id"
            id="game_id"
            placeholder="Masukkan User ID"
            required
          />
          <label htmlFor="server_id">Server ID</label>
          <input
            type="text"
            name="server_id"
            id="server_id"
            placeholder="Masukkan Server ID"
            required
          />
        </div>

        <div className="nominal-grid">
          {nominalOptions.map((nominal, index) => (
            <div
              key={index}
              className={`nominal-box ${selectedNominal === nominal.label ? "selected" : ""}`}
              onClick={() => setSelectedNominal(nominal.label)}
            >
              <img
                src={`/images/${nominal.img}`} // Pastikan uc.jpg ada di public/images/
                alt={nominal.label}
                className="nominal-img"
              />
              <div className="nominal-info">
                <span>{nominal.label}</span>
                <span>{nominal.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="promo-row">
          <label htmlFor="kode_promo">🎁 Punya Kode Promo?</label>
          <select name="kode_promo" id="kode_promo">
            <option value="">-- Pilih Promo --</option>
            <option value="PROMO30">Diskon 30%</option>
            <option value="BONUS10">Bonus 10 UC</option>
          </select>
        </div>

        <div className="form-section">
          <label htmlFor="metode">Metode Pembayaran</label>
          <select name="metode" id="metode" required>
            <option value="Dana">Dana</option>
            <option value="OVO">OVO</option>
            <option value="Gopay">Gopay</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Bayar Sekarang</button>
      </form>
    </div>
  );
};

export default CheckoutPUBG;
