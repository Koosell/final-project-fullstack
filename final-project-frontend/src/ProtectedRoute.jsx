import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCart } from './CartContext';

const ProtectedRoute = () => {
  const { token, loading } = useCart();

  // 1. Saat context masih memvalidasi token, tampilkan pesan loading.
  if (loading) {
    return <div>Memuat...</div>;
  }

  // 2. Jika sudah selesai loading dan TIDAK ada token, baru arahkan ke login.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Jika ada token, tampilkan halaman yang diminta.
  return <Outlet />;
};

export default ProtectedRoute;
