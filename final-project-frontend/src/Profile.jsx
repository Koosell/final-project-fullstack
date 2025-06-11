import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Menggunakan hook dari Context
import axios from 'axios';
import { FaUserCircle, FaShoppingBag, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';
import './css/Profile.css'; // <-- Menggunakan file CSS terpisah

const Profile = () => {
    const { user, loading: userLoading } = useCart(); 
    const [orders, setOrders] = useState([]); 
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setOrdersLoading(false);
                return;
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/orders', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data && Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders);
                }
            } catch (error) {
                console.error("Gagal mengambil riwayat pesanan:", error);
            } finally {
                setOrdersLoading(false);
            }
        };

        if (!userLoading) {
            fetchOrders();
        }
    }, [userLoading]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <FaCheckCircle className="status-icon completed" />;
            case 'shipping':
                return <FaTruck className="status-icon shipping" />;
            case 'cancelled':
                return <FaTimesCircle className="status-icon cancelled" />;
            default:
                return null;
        }
    };

    if (userLoading) {
        return <div className="profile-loading">Memuat profil...</div>;
    }

    if (!user) {
        return <div className="profile-unauthorized">Anda harus login untuk melihat halaman ini.</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Profil Saya</h1>
                <p>Kelola informasi akun dan lihat riwayat pesanan Anda.</p>
            </header>
            
            <div className="profile-content">
                <div className="profile-details-card">
                    <div className="card-header">
                        <FaUserCircle className="card-icon" />
                        <h3>Informasi Akun</h3>
                    </div>
                    <div className="card-body">
                        <p><strong>Nama:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button className="edit-profile-btn">Ubah Profil</button>
                    </div>
                </div>

                <div className="order-history-card">
                     <div className="card-header">
                        <FaShoppingBag className="card-icon" />
                        <h3>Riwayat Pesanan</h3>
                    </div>
                    <div className="card-body">
                        {ordersLoading ? (
                            <p>Memuat riwayat pesanan...</p>
                        ) : orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="order-item">
                                    <div className="order-item-header">
                                        <h4>Pesanan #{order.id}</h4>
                                        <span className={`order-status ${order.status.toLowerCase()}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="order-date">Tanggal: {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <ul className="order-product-list">
                                        {order.order_items.map(item => (
                                            <li key={item.id}>
                                                <span>{item.product ? item.product.name : '(Item Dihapus)'} (x{item.quantity})</span>
                                                <span>{formatPrice(item.price)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="order-total">
                                        Total Pesanan: <strong>{formatPrice(order.total_price)}</strong>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Anda belum memiliki riwayat pesanan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
