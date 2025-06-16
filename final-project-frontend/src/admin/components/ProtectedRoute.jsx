import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    // Ambil data dari AuthContext yang sudah kita buat
    const { token, isAdmin, user } = useAuth();

    // Jika data user masih loading, tampilkan pesan loading
    // Ini penting agar tidak langsung redirect sebelum status admin diketahui
    if (token && !user) {
        return <div>Loading user data...</div>;
    }
    
    // Jika ada token dan user adalah admin, izinkan akses.
    // Outlet akan merender komponen anak (misalnya: AdminLayout, Dashboard, dll.)
    if (token && isAdmin) {
        return <Outlet />;
    }

    // Jika tidak ada token atau user bukan admin, paksa kembali ke halaman login.
    return <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
