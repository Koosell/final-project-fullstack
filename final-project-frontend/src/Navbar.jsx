import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // <-- 1. IMPORT useCart dari Context
import './css/Navbar.css';

const Navbar = () => {
  // State dari Navbar asli Anda (dipertahankan)
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Mengambil data dan fungsi dari Context global
  const { token, logout, itemCount } = useCart();
  const navigate = useNavigate();

  // Fungsi dari Navbar asli Anda (dipertahankan)
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    setDarkMode(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const openChat = () => {
    alert('Chat support akan segera hadir!');
    setIsMobileMenuOpen(false);
  };
  
  // Fungsi baru untuk menangani logout
  const handleLogout = () => {
      if (window.confirm('Apakah Anda yakin ingin logout?')) {
          logout();
          setIsMobileMenuOpen(false); // Tutup menu mobile setelah logout
      }
  };

  // Efek scroll dari Navbar asli Anda (dipertahankan)
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
      <div className="logo">
        <Link to="/">ABC Top-up</Link>
      </div>

      <div
        className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>
      )}

      <div className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
            {/* Menggunakan NavLink untuk styling link aktif */}
            <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/produkMenu" onClick={() => setIsMobileMenuOpen(false)}>Produk Lain</NavLink></li>
            <li><NavLink to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Kontak</NavLink></li>
            <li><NavLink to="/team" onClick={() => setIsMobileMenuOpen(false)}>Tim</NavLink></li>
        </ul>

        <div className="nav-actions">
          {/* Link ke Keranjang dengan jumlah item */}
          <Link to="/keranjang" className="btn-chat" onClick={() => setIsMobileMenuOpen(false)}>
            Keranjang ({itemCount})
          </Link>
          
          <button onClick={openChat} className="btn-chat">
            Chat <span className="notification-badge"></span>
          </button>
          
          <button onClick={toggleDarkMode} className="btn-darkmode" aria-label="Toggle Dark Mode">
            {darkMode ? 'Light' : 'Dark'}
          </button>
          
          {/* --- LOGIKA LOGIN/LOGOUT DITEMPATKAN DI SINI --- */}
          {token ? (
            // Jika SUDAH LOGIN
            <>
              <button onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }} className="login-btn">
                Profil
              </button>
              <button onClick={handleLogout} className="login-btn logout">
                Logout
              </button>
            </>
          ) : (
            // Jika BELUM LOGIN
            <Link to="/login" className="login-btn" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
