import React, { useState } from "react";
import "./index.css";

const nominalOptions = [
  { label: "Weekly Pass", price: "Rp 24.557", img: "wdp.jpeg" },
  { label: "Twilight Pass", price: "Rp 149.900", img: "diamond.jpeg" },
  { label: "86 Diamonds", price: "Rp 23.500", img: "diamond.jpeg" },
  { label: "172 Diamonds", price: "Rp 47.500", img: "diamond.jpeg" },
  { label: "257 Diamonds", price: "Rp 70.000", img: "diamond.jpeg" }
];

const CheckoutML = () => {
  const [selectedNominal, setSelectedNominal] = useState("");

  return (
    <div className="checkout-wrapper">
      <div className="header-box">
        <img
          src="/images/mobile-legends.jpeg"  // Pastikan path gambar sesuai
          alt="Mobile Legends"
          className="logo-img"
        />
        <h2>Mobile Legends</h2>
        <p>Masukkan data & pilih nominal untuk lanjut top-up</p>
      </div>

      <form method="POST" action="/checkout">
        <input type="hidden" name="game" value="Mobile Legends" />
        <input type="hidden" name="jumlah" value={selectedNominal} />

        <div className="form-section">
          <label htmlFor="game_id">User ID</label>
          <input type="text" name="game_id" id="game_id" placeholder="Masukkan User ID" required />
          <label htmlFor="server_id">Server ID</label>
          <input type="text" name="server_id" id="server_id" placeholder="Masukkan Server ID" required />
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

export default CheckoutML;
