import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css'; // Import file CSS yang baru dibuat

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar (Menu Navigasi Samping) */}
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/admin/dashboard" className="admin-sidebar-link">Dashboard</Link>
                    <Link to="/admin/products" className="admin-sidebar-link">Produk</Link>
                    <Link to="/admin/merchandise" className="admin-sidebar-link">Merchandise</Link>
                    <Link to="/admin/orders" className="admin-sidebar-link">Penjualan</Link>
                    <Link to="/admin/testimonials" className="admin-sidebar-link">Testimoni</Link>
                </nav>
            </aside>

            {/* Konten Utama */}
            <main className="admin-main-content">
                <header className="admin-header">
                    <div>Selamat datang, <strong>{user?.name || 'Admin'}</strong></div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </header>
                <div className="admin-page-content">
                    {/* Di sini halaman spesifik (Dashboard, dll) akan ditampilkan */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
