import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import "./css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Mengubah dari username menjadi email
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => { // Menggunakan async untuk fetch request
    e.preventDefault();
    setIsLoading(true); 
    setErrorMsg(""); // Bersihkan pesan error sebelumnya

    try {
      // Langkah 1: Dapatkan CSRF cookie dari Laravel Sanctum
      // Ini penting untuk keamanan dan agar sesi Laravel dapat dikenali
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET', // Metode GET untuk endpoint csrf-cookie
          credentials: 'include' // Penting untuk mengirim dan menerima cookie
      });

      // Langkah 2: Kirim kredensial login ke backend Laravel
      const response = await fetch('http://localhost:8000/api/login', { // Endpoint login Laravel
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Penting untuk mengirim cookie sesi/CSRF
        body: JSON.stringify({
          email: email, // Kirim email
          password: password,
        }),
      });

      if (!response.ok) {
        // Jika respons tidak OK (misal status 401 Unauthorized, 422 Validation Error)
        const errorData = await response.json();
        let message = "Login gagal!";
        if (errorData.message) {
            message = errorData.message;
        } else if (errorData.errors && errorData.errors.email) {
            message = errorData.errors.email[0]; // Ambil pesan error validasi email
        }
        setErrorMsg(message);
        console.error("Login Error:", errorData);
        return; // Hentikan eksekusi jika ada error
      }

      // Jika login berhasil
      const data = await response.json();
      localStorage.setItem('authToken', data.access_token); // Simpan token ke localStorage
      setErrorMsg(""); // Bersihkan error jika sebelumnya ada
      alert("Login berhasil!"); // Pemberitahuan sukses
      navigate("/"); // Arahkan ke halaman utama setelah login sukses

    } catch (error) {
      // Tangani error jaringan atau error lain yang tidak terkait respons HTTP
      setErrorMsg("Terjadi kesalahan koneksi atau server. Silakan coba lagi.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false); // Nonaktifkan loading state
    }
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
              <label htmlFor="email">Email</label> {/* Mengubah label menjadi Email */}
              <input
                id="email" // Mengubah id menjadi email
                type="email" // Mengubah type menjadi email
                placeholder="Masukkan email Anda" // Mengubah placeholder
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              disabled={!email || !password || isLoading} // Menggunakan email untuk disabled state
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
