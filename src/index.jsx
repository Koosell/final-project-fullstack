import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

const Index = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="page-header">
        <h1>Top-up Game</h1>
        <p>Welcome to ABC Top-up! Select your favorite game to top-up.</p>
      </header>

      {/* Promo Banner */}
      <section className="promo-banner">
        <img
          className="promo-image"
          src="/src/assets/images/promo2.jpg"
          alt="Bonus 10 Diamond"
        />
        <div className="promo-content">
          <h3>Bonus 10 Diamond</h3>
          <p>
            Gunakan kode promo <strong>BONUS10</strong> untuk mendapatkan bonus 10 diamond pada top-up pertama Anda!
          </p>
        </div>
      </section>

      {/* Game Grid */}
      <main className="game-grid">
        <div className="game-card">
          <img className="game-image" src="/src/assets/images/pubg.jpeg" alt="PUBG" />
          <p>PUBG</p>
          <Link to="/checkout/pubg" className="topup-button">Top-up Now</Link>
        </div>
        <div className="game-card">
          <img className="game-image" src="/src/assets/images/mobile-legends.jpeg" alt="Mobile Legends" />
          <p>Mobile Legends</p>
          <Link to="/checkout/ml" className="topup-button">Top-up Now</Link>
        </div>
        <div className="game-card">
          <img className="game-image" src="/src/assets/images/free-fire.jpeg" alt="Free Fire" />
          <p>Free Fire</p>
          <Link to="/checkout/ff" className="topup-button">Top-up Now</Link>
        </div>
      </main>

      {/* Rating Section */}
      <section className="rating-section">
        <h3>Rate Our Service</h3>
        <div className="star-rating">
          <Link to="/rating">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </Link>
        </div>
        <p>Give us a rating and help us improve!</p>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <p>© 2025 ABC Top-up. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;