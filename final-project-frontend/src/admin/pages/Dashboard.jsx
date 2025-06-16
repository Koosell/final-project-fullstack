import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css'; // File CSS untuk halaman dashboard

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            // Pastikan ada token sebelum mencoba fetch data
            if (!token) {
                setLoading(false);
                setError('Otentikasi gagal. Silakan login kembali.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/admin/dashboard/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStats(response.data);
            } catch (err) {
                setError('Gagal memuat data dashboard. Pastikan backend berjalan dan endpoint sudah benar.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) {
        return <div className="loading-message">Memuat data dashboard...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <p>Ringkasan data dari toko Anda.</p>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Produk</h3>
                    <p className="stat-number">{stats?.total_products || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Merchandise</h3>
                    <p className="stat-number">{stats?.total_merchandise || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Penjualan</h3>
                    <p className="stat-number">{stats?.total_orders || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Pendapatan Bulan Ini</h3>
                    <p className="stat-number">Rp {stats?.monthly_revenue?.toLocaleString('id-ID') || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
