import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaGoogle, FaFacebookF, FaArrowLeft } from "react-icons/fa";
import "./css/Register.css";

const Register = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [formData, setFormData] = useState({
    name: "", // Mengubah dari username menjadi name agar sesuai dengan field 'name' di Laravel User model
    email: "",
    password: "",
    password_confirmation: "" // Mengubah dari confirmPassword menjadi password_confirmation agar sesuai dengan validasi Laravel
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

  const handleRegister = async (e) => { // Menggunakan async untuk fetch request
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); // Bersihkan pesan error sebelumnya

    // Validasi frontend tambahan (Laravel juga akan melakukan validasi)
    if (formData.password !== formData.password_confirmation) {
      setErrorMsg("Password dan konfirmasi password tidak sama!");
      setIsLoading(false);
      return;
    }

    try {
      // Langkah 1: Dapatkan CSRF cookie dari Laravel Sanctum
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include'
      });

      // Langkah 2: Kirim data registrasi ke backend Laravel
      const response = await fetch('http://localhost:8000/api/register', { // Endpoint register Laravel
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Penting untuk mengirim cookie sesi/CSRF
        body: JSON.stringify({
          name: formData.name, // Mengirim 'name'
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation, // Mengirim 'password_confirmation'
        }),
      });

      if (!response.ok) {
        // Jika respons tidak OK (misal status 422 Validation Error, 500 Internal Server Error)
        const errorData = await response.json();
        let message = "Registrasi gagal!";
        if (errorData.message) {
            message = errorData.message;
        }
        if (errorData.errors) { // Jika ada error validasi dari Laravel
            // Gabungkan semua pesan error validasi
            const validationErrors = Object.values(errorData.errors).flat().join('\n');
            message += `\nDetail: ${validationErrors}`;
        }
        setErrorMsg(message);
        console.error("Register Error:", errorData);
        return; // Hentikan eksekusi jika ada error
      }

      // Jika registrasi berhasil
      const data = await response.json();
      localStorage.setItem('authToken', data.access_token); // Simpan token ke localStorage setelah registrasi
      setSuccess(true); // Tampilkan pesan sukses
      setErrorMsg(""); // Bersihkan error jika sebelumnya ada
      // Opsional: Langsung arahkan ke halaman utama atau login setelah registrasi sukses
      // navigate("/"); // Atau navigate("/login");

    } catch (error) {
      // Tangani error jaringan atau error lain yang tidak terkait respons HTTP
      setErrorMsg("Terjadi kesalahan koneksi atau server. Silakan coba lagi.");
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false); // Nonaktifkan loading state
    }
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
          <button className="back-button" onClick={() => navigate(-1)}> {/* Menggunakan navigate(-1) untuk kembali */}
            <FaArrowLeft /> Kembali
          </button>

          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h2>Registrasi Berhasil!</h2>
              <p>Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.</p>
              <button
                className="login-button"
                onClick={() => navigate("/login")} // Menggunakan navigate
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
                  <label htmlFor="name">Nama Lengkap</label> {/* Mengubah label menjadi Nama Lengkap */}
                  <input
                    id="name"
                    type="text"
                    name="name" // Mengubah name menjadi 'name'
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
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
                  <label htmlFor="password_confirmation">Konfirmasi Password</label> {/* Mengubah label */}
                  <input
                    id="password_confirmation" // Mengubah id
                    type="password"
                    name="password_confirmation" // Mengubah name
                    placeholder="Masukkan ulang password"
                    value={formData.password_confirmation}
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
                  <button type="button" onClick={() => navigate("/login")} className="text-button"> {/* Menggunakan navigate */}
                    Masuk disini
                  </button>
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
