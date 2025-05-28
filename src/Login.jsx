import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import "./css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        setErrorMsg("");
        navigate("/");
      } else {
        setErrorMsg("Username atau password salah!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-screen">
      {/* Left Side - Game Banner */}
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

      {/* Right Side - Login Form */}
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
              <label htmlFor="username">Username atau Email</label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username atau email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={!username || !password || isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk Sekarang'}
            </button>
          </form>

          <div className="divider">
            <span>atau lanjut dengan</span>
          </div>

          <div className="social-login">
            <button type="button" className="google-button">
              <FaGoogle /> Google
            </button>
            <button type="button" className="facebook-button">
              <FaFacebookF /> Facebook
            </button>
          </div>

          <div className="login-footer">
            <p>
              Belum punya akun?{' '}
              <button type="button" onClick={() => navigate("/register")} className="text-button">
                Daftar disini
              </button>
            </p>
            <button type="button" onClick={() => navigate("/forgot-password")} className="text-button">
              Lupa password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;