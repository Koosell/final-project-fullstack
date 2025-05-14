import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Index = () => {
  return (
    <div className="container">
      <div className="content-box">
        <h1>Top-up Game</h1>
        <p>Welcome to ABC Top-up! Select your favorite game to top-up.</p>
      </div>

      {/* Promo Section */}
      <div className="promo-card peach">
        <img
          className="promo-img"
          src="/images/promo1.jpg"
          alt="Promo 30% Diskon"
        />
        <div className="promo-info">
          <h3>Diskon 30% untuk Semua Pembelian!</h3>
          <p>
            Gunakan kode promo <strong>PROMO30</strong> saat checkout untuk mendapatkan diskon 30%!
          </p>
        </div>
      </div>

      <div className="promo-card">
        <img
          className="promo-img"
          src="/images/promo2.jpg"
          alt="Bonus 10 Diamond"
        />
        <div className="promo-info">
          <h3>Bonus 10 Diamond</h3>
          <p>
            Gunakan kode promo <strong>BONUS10</strong> untuk mendapatkan bonus 10 diamond pada top-up pertama Anda!
          </p>
        </div>
      </div>

      {/* Game Cards */}
      <div className="game-selection">
        <div className="game">
          <img
            className="game-img"
            src="/images/pubg.jpeg"
            alt="PUBG"
          />
          <p>PUBG</p>
          <Link to="/checkout/pubg">Top-up Now</Link>
        </div>
        <div className="game">
          <img
            className="game-img"
            src="/images/mobile-legends.jpeg"
            alt="Mobile Legends"
          />
          <p>Mobile Legends</p>
          <Link to="/checkout/ml">Top-up Now</Link>
        </div>
        <div className="game">
          <img
            className="game-img"
            src="/images/free-fire.jpeg"
            alt="Free Fire"
          />
          <p>Free Fire</p>
          <Link to="/checkout/ff">Top-up Now</Link>
        </div>
      </div>

      {/* Rating Section (Sidebar) */}
      <div className="rating-sidebar">
        <h3>Rate Our Service</h3>
        <div className="rating-stars">
          <Link to="/rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </Link>
        </div>
        <p>Give us a rating and help us improve!</p>
      </div>

      <footer>
        <p>© 2025 ABC Top-up. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
