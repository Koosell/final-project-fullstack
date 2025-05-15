import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana hardcoded
    if (username === "admin" && password === "123456") {
      setErrorMsg("");
      alert("Login berhasil!");
      navigate("/"); // Redirect ke homepage
    } else {
      setErrorMsg("Username atau password salah!");
    }
  };

  // Clear error jika user ubah input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="login-body">
      <div className="login-box">
        <h1 className="login-title">Login ke ABC 🎮</h1>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form onSubmit={handleLogin} className="login-form" noValidate>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="btn-login"
            disabled={!username || !password}
          >
            Sign In
          </button>
        </form>

        <hr className="divider" />

        {/* Login dengan Google */}
        <form action="/login-google" method="POST" className="social-login">
          <button type="submit" className="btn-google">
            Login dengan Google
          </button>
        </form>

        {/* Login dengan Facebook */}
        <form action="/login-facebook" method="POST" className="social-login">
          <button type="submit" className="btn-facebook">
            Login dengan Facebook
          </button>
        </form>

        <button onClick={goToRegister} className="btn-register">
          Daftar Akun Baru
        </button>

        <button onClick={goBackToHome} className="back-home">
          ← Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Login;
