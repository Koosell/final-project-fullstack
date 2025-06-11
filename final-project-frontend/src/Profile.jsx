import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import { FaUserCircle, FaShoppingBag, FaCheckCircle, FaTruck, FaTimesCircle, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './css/Profile.css';

const Profile = () => {
    // Ambil fungsi fetchCart untuk me-refresh data user setelah update
    const { user, loading: userLoading, fetchCart } = useCart(); 
    
    // State untuk mode edit dan data form
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '' });
    const [isSaving, setIsSaving] = useState(false);
    
    const [orders, setOrders] = useState([]); 
    const [ordersLoading, setOrdersLoading] = useState(true);

    // Update state formData setiap kali data user dari context berubah
    useEffect(() => {
        if (user) {
            setFormData({ name: user.name });
        }
    }, [user]);

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
            case 'completed': return <FaCheckCircle className="status-icon completed" />;
            case 'shipping': return <FaTruck className="status-icon shipping" />;
            case 'cancelled': return <FaTimesCircle className="status-icon cancelled" />;
            default: return null;
        }
    };

    // Fungsi untuk toggle mode edit
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing && user) {
            setFormData({ name: user.name }); // Reset form jika dibatalkan
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fungsi untuk menyimpan perubahan ke backend
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://127.0.0.1:8000/api/user/profile', formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Profil berhasil diperbarui!');
            await fetchCart(); // Refresh data user & keranjang dari context
            setIsEditing(false);
        } catch (error) {
            console.error("Gagal memperbarui profil:", error);
            alert('Gagal memperbarui profil. Silakan coba lagi.');
        } finally {
            setIsSaving(false);
        }
    };

    if (userLoading) return <div className="profile-loading">Memuat profil...</div>;
    if (!user) return <div className="profile-unauthorized">Anda harus login untuk melihat halaman ini.</div>;

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
                        {isEditing ? (
                            <form onSubmit={handleSaveChanges}>
                                <div className="form-group">
                                    <label htmlFor="name">Nama:</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <p className="email-display">{user.email}</p>
                                </div>
                                <div className="edit-actions">
                                    <button type="submit" className="save-btn" disabled={isSaving}>
                                        <FaSave /> {isSaving ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={handleEditToggle}>
                                        <FaTimes /> Batal
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <p><strong>Nama:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <button className="edit-profile-btn" onClick={handleEditToggle}>
                                    <FaEdit /> Ubah Profil
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* KODE YANG HILANG SAYA KEMBALIKAN DI SINI */}
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
                                        {order.items.map(item => (
                                            <li key={item.id}>
                                                <span>{item.orderable ? item.orderable.name : '(Item Dihapus)'} (x{item.quantity})</span>
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
                {/* AKHIR DARI KODE YANG HILANG */}

            </div>
        </div>
    );
};

export default Profile;
