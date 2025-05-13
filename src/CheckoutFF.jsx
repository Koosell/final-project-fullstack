import React, { useState } from "react";
import "./index.css";

const nominalOptions = [
  { label: "100 Diamond", price: "Rp 16.000", img: "diamondff.jpg" },
  { label: "210 Diamond", price: "Rp 32.000", img: "diamondff.jpg" },
  { label: "530 Diamond", price: "Rp 79.000", img: "diamondff.jpg" },
  { label: "Double Daily Diamond", price: "Rp 30.000", img: "diamondff.jpg" }
];

const CheckoutFF = () => {
  const [selectedNominal, setSelectedNominal] = useState("");

  return (
    <div className="checkout-wrapper">
      <div className="header-box">
        <img
          src="/images/free-fire.jpeg" // Pastikan path gambar sesuai
          alt="Free Fire"
          className="logo-img"
        />
        <h2>Free Fire</h2>
        <p>Masukkan data & pilih nominal untuk lanjut top-up</p>
      </div>

      <form method="POST" action="/checkout">
        <input type="hidden" name="game" value="Free Fire" />
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
                src={`/images/${nominal.img}`} // Sesuaikan path gambar nominal
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
            <option value="BONUS10">Bonus 10 Diamond</option>
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

export default CheckoutFF;
