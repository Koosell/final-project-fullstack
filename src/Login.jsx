import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css";

const Login = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk mengarahkan ke halaman register
  const goToRegister = () => {
    navigate("/register"); // Arahkan ke halaman register
  };

  // Fungsi untuk mengarahkan kembali ke beranda
  const goBackToHome = () => {
    navigate("/"); // Arahkan ke halaman beranda
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <h1 className="login-title">Login ke ABC 🎮</h1>

        {/* Login with Google */}
        <form action="/login-google" method="POST">
          <button type="submit" className="btn-google">
            Login dengan Google
          </button>
        </form>

        {/* Login with Facebook */}
        <form action="/login-facebook" method="POST">
          <button type="submit" className="btn-facebook">
            Login dengan Facebook
          </button>
        </form>

        {/* Register Link - Diganti menjadi button dengan onClick */}
        <button onClick={goToRegister} className="btn-register">
          Daftar Akun Baru
        </button>

        {/* Back to Home - Diganti menjadi button dengan onClick */}
        <button onClick={goBackToHome} className="back-home">
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Login;
