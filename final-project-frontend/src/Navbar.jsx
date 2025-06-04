
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  // State untuk mengelola dark mode, menu mobile, dan efek scroll
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fungsi untuk toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setDarkMode(prev => !prev);
  };

  // Fungsi untuk toggle menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Fungsi untuk membuka chat (placeholder)
  const openChat = () => {
    alert('Chat support akan segera hadir!');
    setIsMobileMenuOpen(false);
  };

  // Efek scroll untuk hide/show navbar dan update status scrolled
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.innerWidth > 992) {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      }
      setIsScrolled(window.scrollY > 10);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="logo">
        <Link to="/">ABC Top-up</Link>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>
      )}

      {/* Navigation Container */}
      <div className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/produkMenu" onClick={() => setIsMobileMenuOpen(false)}>
              Produk Lain
            </Link>
          </li>
          <li>
            <Link to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)}>
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Kontak
            </Link>
          </li>
          <li>
            <Link to="/team" onClick={() => setIsMobileMenuOpen(false)}>
              Tim
            </Link>
          </li>
        </ul>

        {/* Navigation Actions */}
        <div className="nav-actions">
          {/* Chat Button */}
          <button onClick={openChat} className="btn-chat">
            Chat <span className="notification-badge"></span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="btn-darkmode"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>

          {/* Login Button */}
          <Link
            to="/login"
            className="login-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
