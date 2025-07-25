import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './OrderList.css'; // File CSS yang akan kita buat

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [pagination, setPagination] = useState({});

    const fetchOrders = (pageUrl) => {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const url = pageUrl || `${apiUrl}/api/admin/orders`;

        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const { data, ...paginationData } = response.data;
            setOrders(data);
            setPagination(paginationData);
            setLoading(false);
        })
        .catch(err => {
            setError('Gagal memuat data penjualan.');
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed': return 'status-completed';
            case 'processing': return 'status-processing';
            case 'cancelled': return 'status-cancelled';
            case 'failed': return 'status-failed';
            case 'pending':
            default:
                return 'status-pending';
        }
    };

    if (loading) return <div className="loading-message">Memuat data penjualan...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="order-list-container">
            <div className="order-list-header">
                <h1>Daftar Penjualan</h1>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID Pesanan</th>
                        <th>Nama Pelanggan</th>
                        <th>Tanggal</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.user ? order.user.name : 'Guest'}</td>
                            <td>{formatDate(order.created_at)}</td>
                            <td>Rp {new Intl.NumberFormat('id-ID').format(order.total_price)}</td>
                            <td>
                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <button className="view-button">Lihat Detail</button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="6" className="no-data">Tidak ada data penjualan.</td></tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-controls">
                <span>Halaman <strong>{pagination.current_page}</strong> dari <strong>{pagination.last_page}</strong></span>
                <div>
                    <button
                        className="pagination-button"
                        onClick={() => fetchOrders(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}>
                        &laquo; Sebelumnya
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => fetchOrders(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}>
                        Berikutnya &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
