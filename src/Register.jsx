import React from "react";
import "./index.css";


const Register = () => {
  return (
    <div className="register-body">
      <div className="register-box">
        <h1>Daftar Akun Baru</h1>

        <form action="/register" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Daftar</button>
        </form>

        <a href="/login" className="back-login">← Kembali ke Halaman Login</a>
      </div>
    </div>
  );
};

export default Register;
