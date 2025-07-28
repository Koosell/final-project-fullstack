import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './context/AuthContext'; // <-- IMPORT BARU untuk status admin
import './css/Navbar.css';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Mengambil data dari Context
    const { token, user, logout, itemCount } = useCart();
    const { isAdmin } = useAuth(); // <-- AMBIL STATUS ADMIN DARI AUTHCONTEXT
    const navigate = useNavigate();

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
    
    const handleLogout = () => {
        if (window.confirm('Apakah Anda yakin ingin logout?')) {
            logout();
            setIsMobileMenuOpen(false);
        }
    };

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
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>ABC Top-up</Link>
            </div>

            <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle Menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {isMobileMenuOpen && (
                <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>
            )}

            <div className={`nav-container ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="nav-links">
                    <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li><NavLink to="/produkMenu" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Produk Lain</NavLink></li>
                    <li><NavLink to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Tentang Kami</NavLink></li>
                    <li><NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Kontak</NavLink></li>
                    <li><NavLink to="/team" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Tim</NavLink></li>
                    {/* Tampilkan link Admin Panel jika user adalah admin */}
                    {isAdmin && (
                        <li><NavLink to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={({isActive}) => isActive ? 'active' : ''}>Admin Panel</NavLink></li>
                    )}
                </ul>

                <div className="nav-actions">
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
                                {user ? user.name.split(' ')[0] : 'Profil'}
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
