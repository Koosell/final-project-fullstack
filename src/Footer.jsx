// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowUp,
  FaGamepad
} from "react-icons/fa";
import "./css/Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="page-footer">
      {/* Particles */}
      <div className="footer-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{'--i': i}}></div>
        ))}
      </div>

      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <FaGamepad className="logo-icon" />
              <span className="logo-text">ABC Top-up</span>
            </Link>
            <p className="footer-tagline">
              Top-up cepat, aman, dan terjangkau untuk gaming terbaik Anda.
            </p>
          </div>

          <nav className="footer-nav">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/produkMenu" className="footer-link">Produk</Link>
            <Link to="/tentang-kami" className="footer-link">Tentang</Link>
            <Link to="/contact" className="footer-link">Kontak</Link>
            <Link to="/team" className="footer-link">Tim</Link>
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">© 2025 ABC Top-up. All rights reserved.</p>
          
          <div className="footer-stats-mini">
            <span className="stat-mini">10K+ Users</span>
            <span className="stat-mini">50+ Games</span>
            <span className="stat-mini">24/7 Support</span>
          </div>
          
          <button className="back-to-top" onClick={scrollToTop}>
            <FaArrowUp />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;