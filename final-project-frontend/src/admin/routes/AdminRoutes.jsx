import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/Dashboard';
import ProductList from '../pages/ProductList';
import MerchandiseList from '../pages/MerchandiseList';
import OrderList from '../pages/OrderList';
import TestimonialList from '../pages/TestimonialList';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';

const AdminRoutes = () => {
    return (
        <Routes>
            {/* Rute ini publik, untuk halaman login admin */}
            <Route path="/login" element={<AdminLogin />} />

            {/* Rute di bawah ini dilindungi. Hanya admin yang sudah login bisa akses */}
            <Route element={<ProtectedRoute />}>
                {/* Gunakan AdminLayout untuk semua halaman yang dilindungi */}
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/merchandise" element={<MerchandiseList />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/testimonials" element={<TestimonialList />} />
                </Route>
            </Route>
            
            {/* Jika user mengakses /admin/ atau /admin, arahkan ke dashboard */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    );
};

export default AdminRoutes;
