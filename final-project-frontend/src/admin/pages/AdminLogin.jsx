import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './AdminLogin.css'; // File CSS untuk halaman login

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setToken, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Jika sudah login sebagai admin, langsung redirect ke dashboard
    useEffect(() => {
        if (isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [isAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/login`, {
                email,
                password,
            });
            
            // --- KODE DEBUG DIMULAI ---
            // Baris ini akan menampilkan semua data yang diterima dari backend ke konsol browser.
            console.log("Data yang diterima dari backend:", response.data);
            // --- KODE DEBUG SELESAI ---

            const { user, token } = response.data;

            // PENTING: Periksa apakah role user adalah 'admin'
            if (user && user.role === 'admin') {
                setToken(token); // Simpan token ke context
                navigate('/admin/dashboard'); // Arahkan ke dashboard
            } else {
                // --- KODE DEBUG TAMBAHAN ---
                console.error("Pemeriksaan GAGAL. Role yang diterima adalah:", user ? `'${user.role}'` : 'User tidak ditemukan dalam data');
                // --- KODE DEBUG SELESAI ---
                setError('Akses ditolak. Akun Anda bukan admin.');
            }

        } catch (err) {
            const message = err.response?.data?.message || 'Email atau password salah.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Panel Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
