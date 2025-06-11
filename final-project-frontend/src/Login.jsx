import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import { useCart } from './CartContext'; // <-- Menggunakan hook dari Context
import "./css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart(); // <-- Ambil fungsi 'login' dari Context

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Login gagal!");
        return;
      }

      if (data.token) {
        // Panggil fungsi 'login' dari Context untuk menangani semuanya
        login(data.token);
        
        alert("Login berhasil!");
        navigate("/");
      } else {
        setErrorMsg("Respons login tidak valid, token tidak ditemukan.");
      }

    } catch (error) {
      setErrorMsg("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-screen">
      {/* Seluruh kode JSX Anda sama persis dan tidak perlu diubah */}
      {/* ... banner, form, tombol, dll. ... */}
       <div className="game-banner">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Game Banner"
          className="banner-image"
        />
        <div className="banner-overlay">
          <div className="banner-content">
            <h2>Top-up Game Lebih Mudah</h2>
            <p>Dapatkan diamond dan item game favoritmu dengan harga terbaik</p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Proses instan dalam hitungan detik</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Harga termurah di pasaran</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Garansi 100% aman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-section">
        <div className="login-content">
          <button className="back-button" onClick={() => navigate("/")}>
            <FaArrowLeft /> Kembali ke Beranda
          </button>
          <div className="login-header">
            <h1>Masuk ke Akun</h1>
            <p>Selamat datang kembali di ABC Top-up</p>
          </div>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Masukkan email Anda" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-button" disabled={!email || !password || isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>
          <div className="divider"><span>atau lanjut dengan</span></div>
          <div className="social-login">
            <button type="button" className="google-button"><FaGoogle /> Google</button>
            <button type="button" className="facebook-button"><FaFacebookF /> Facebook</button>
          </div>
          <div className="login-footer">
            <p>Belum punya akun? <button type="button" onClick={() => navigate("/register")} className="text-button">Daftar disini</button></p>
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-button">Lupa password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
