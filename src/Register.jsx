import React, { useState } from "react";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan Password harus diisi!");
      return;
    }

    // Simulasi proses register (tanpa backend)
    setTimeout(() => {
      setSuccess(true);
      setUsername("");
      setPassword("");
    }, 1000);
  };

  return (
    <div className="register-body">
      <div className="register-box">
        <h1>Daftar Akun Baru</h1>

        {success ? (
          <div className="success-checkout">
            <h3>✅ Registrasi Berhasil!</h3>
            <p>Silakan login untuk melanjutkan.</p>
            <a href="/login" className="btn-home">Ke Halaman Login</a>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Daftar</button>
          </form>
        )}

        <a href="/login" className="back-login">← Kembali ke Halaman Login</a>
      </div>
    </div>
  );
};

export default Register;
