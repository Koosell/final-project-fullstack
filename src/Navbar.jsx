import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Dark mode toggle
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Chat simulation
  const openChat = () => {
    alert("Chat support akan segera hadir!");
    setIsMobileMenuOpen(false);
  };

  // Search function
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Mencari: ${searchQuery}`);
    setSearchQuery('');
    setShowSearch(false);
  };

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // For auto-hide on scroll down
      if (window.innerWidth > 992) {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          document.querySelector('.navbar').style.transform = 'translateY(-100%)';
        } else {
          document.querySelector('.navbar').style.transform = 'translateY(0)';
        }
      }
      
      // For scrolled state
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

      {/* Hamburger Icon (Mobile Only) */}
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
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/produkMenu" onClick={() => setIsMobileMenuOpen(false)}>Produk Lain</Link></li>
          <li><Link to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</Link></li>
          <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Kontak</Link></li>
          <li><Link to="/team" onClick={() => setIsMobileMenuOpen(false)}>Tim</Link></li>
        </ul>
        
        {/* Search Bar (Desktop) */}
        {showSearch ? (
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">🔍</button>
            <button 
              type="button" 
              onClick={() => setShowSearch(false)}
              className="close-search"
            >
              ✕
            </button>
          </form>
        ) : (
          <div className="nav-actions">
            {/* Search Button (Mobile) */}
            <button 
              onClick={() => {
                setShowSearch(true);
                if (window.innerWidth <= 992) {
                  setIsMobileMenuOpen(false);
                }
              }} 
              className="btn-search"
              aria-label="Search"
            >
              🔍
            </button>

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
              {darkMode ? " Light" : " Dark"}
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;