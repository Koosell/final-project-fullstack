// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    setDarkMode(!darkMode);
  };

  const openChat = () => {
    alert("Chat support belum tersedia!"); // ganti ini dengan fitur nyata jika ada
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ABC Top-up</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/tentang-kami">Deskripsi</Link></li>
      </ul>
      <div className="nav-actions">
        <button onClick={openChat} className="btn-chat">💬 Chat</button>
        <button onClick={toggleDarkMode} className="btn-darkmode">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <a href="/login" className="login-btn">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
