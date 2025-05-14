import React from 'react';
import "./index.css";

const Login = () => {
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

        {/* Register Link */}
        <a href="/register" className="btn-register">
          Daftar Akun Baru
        </a>

        {/* Back to Home */}
        <a href="/" className="back-home">← Kembali ke Beranda</a>
      </div>
    </div>
  );
};

export default Login;
