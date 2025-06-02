import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx"; // sesuaikan path jika beda
import "./css/Home.css";

const promos = [
  {
    title: "MLBB X NARUTO SKIN DRAW",
    description: 'Jangan Ketinggalan <strong>MILIKI SEKARANG!!</strong> Segera Top-up Mobile Legends dan dapatkan skin Naruto eksklusif dengan kode <strong>NARUTO10</strong>',
    image: "https://i.imgur.com/LxaW4Ra.jpeg",
    alt: "Bonus 10 Diamond"
  },
  {
    title: "PUBG Mobile Royale Pass",
    description: '<strong> Royale Pass PUBG Mobile: Season Baru, Hadiah Lebih Keren!</strong> Segera top-up dan klaim skin eksklusif, emote keren, dan banyak hadiah menarik!',
    image: "https://www.pubgmobile.com/images/event/royalepass/thum1_en.jpg",
    alt: "Diskon 20% Valorant Points"
  },
  {
    title: "PUB",
    description: '<strong> Royale Pass PUBG Mobile: Season Baru, Hadiah Lebih Keren!</strong> Segera top-up dan klaim skin eksklusif, emote keren, dan banyak hadiah menarik!',
    image: "https://i.imgur.com/IW3qA6p.jpeg",
    alt: "Diskon 20% Valorant Points"
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="page-header">
        <h1>Top-up Game</h1>
        <p>Selamat datang di ABC Top-up! Pilih game favorit Anda untuk top-up.</p>
      </header>

      {/* Promo Section */}
      <div className="promo-slider">
        <div className="promo-slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {promos.map((promo, index) => (
            <section key={index} className="promo-banner">
              <img
                className="promo-image"
                src={promo.image}
                alt={promo.alt}
              />
              <div className="promo-content">
                <h3>{promo.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: promo.description }} />
              </div>
            </section>
          ))}
        </div>
        <button className="slider-prev" onClick={prevSlide}>←</button>
        <button className="slider-next" onClick={nextSlide}>→</button>
        <div className="slider-dots">
          {promos.map((_, index) => (
            <span
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Game Grid */}
      <main className="game-grid">
        <div className="game-card" style={{ '--index': 0 }}>
          <img className="game-image" src="https://i.imgur.com/Eba983T.jpeg" alt="PUBG" />
          <p>PUBG</p>
          <Link to="/checkout/pubg" className="topup-button">Top-up Sekarang</Link>
        </div>
        <div className="game-card" style={{ '--index': 1 }}>
          <img className="game-image" src="https://i.imgur.com/q2FAJ3f.jpeg" alt="Mobile Legends" />
          <p>Mobile Legends</p>
          <Link to="/checkout/ml" className="topup-button">Top-up Sekarang</Link>
        </div>
        <div className="game-card" style={{ '--index': 2 }}>
          <img className="game-image" src="https://i.imgur.com/chTbnxD.jpeg" alt="Free Fire" />
          <p>Free Fire</p>
          <Link to="/checkout/ff" className="topup-button">Top-up Sekarang</Link>
        </div>
        <div className="game-card" style={{ '--index': 3 }}>
          <img className="game-image" src="https://i.imgur.com/4WVAckQ.jpeg" alt="Valorant" />
          <p>Valorant</p>
          <Link to="/checkout/valo" className="topup-button">Top-up Sekarang</Link>
        </div>
        <div className="game-card" style={{ '--index': 4 }}>
          <img className="game-image" src="https://i.imgur.com/9LP0vMe.jpeg" alt="Call Of Duty" />
          <p>Call Of Duty</p>
          <Link to="/checkout/cod" className="topup-button">Top-up Sekarang</Link>
        </div>
        <div className="game-card" style={{ '--index': 5 }}>
          <img className="game-image" src="https://i.imgur.com/Q6qj5sG.jpeg" alt="Genshin Impact" />
          <p>Genshin Impact</p>
          <Link to="/checkout/gensin" className="topup-button">Top-up Sekarang</Link>
        </div>
      </main>

      {/* Rating Section */}
      <section className="rating-section">
        <h3>Beri Penilaian Layanan Kami</h3>
        <div className="star-rating">
          <Link to="/rating">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </Link>
        </div>
        <p>Beri kami penilaian untuk membantu kami meningkatkan layanan!</p>
      </section>
    </div>
  );
};

export default Index;