// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaPhone,
  FaEnvelope,
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
      {/* Minimal particles */}
      <div className="footer-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="particle" style={{'--i': i}}></div>
        ))}
      </div>

      <div className="footer-container">
        {/* Kompak Brand & Nav */}
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

        {/* Kompak Contact & Social */}
        <div className="footer-contact">
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>support@abctopup.com</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+62 8953-9291-7289</span>
            </div>
          </div>

          <div className="footer-social">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
            </div>
            
            <div className="newsletter-compact">
              <input type="email" placeholder="Email untuk update..." />
              <button type="submit">
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Bottom */}
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