import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import "./css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password dan konfirmasi password tidak sama!");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    }, 1500);
  };

  return (
    <div className="register-screen">
      {/* Left Side - Game Banner */}
      <div className="game-banner">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
          alt="Game Banner"
          className="banner-image"
        />
        <div className="banner-overlay">
          <div className="banner-content">
            <h2>Bergabunglah Dengan Kami</h2>
            <p>Dapatkan akses penuh untuk top-up game favoritmu</p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Proses instan dalam hitungan detik</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Bonus voucher untuk member baru</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Garansi 100% aman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="register-section">
        <div className="register-content">
          <button className="back-button" onClick={() => window.history.back()}>
            <FaArrowLeft /> Kembali
          </button>

          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Registrasi Berhasil!</h2>
              <p>Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.</p>
              <button 
                className="login-button"
                onClick={() => window.location.href = "/login"}
              >
                Ke Halaman Login
              </button>
            </div>
          ) : (
            <>
              <div className="register-header">
                <h1>Daftar Akun Baru</h1>
                <p>Buat akun untuk mulai berbelanja</p>
              </div>

              {errorMsg && <div className="error-message">{errorMsg}</div>}

              <form onSubmit={handleRegister} className="register-form">
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Masukkan username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Konfirmasi Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Masukkan ulang password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="register-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                </button>
              </form>

              <div className="divider">
                <span>atau daftar dengan</span>
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
                  Sudah punya akun?{' '}
                  <a href="/login" className="text-button">
                    Masuk disini
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;