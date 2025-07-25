import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import MerchandiseFormModal from './MerchandiseFormModal.jsx';
import './ProductList.css'; // File CSS untuk styling

// --- Sentralisasi URL API untuk kemudahan maintenance ---
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin/merchandise`;

const MerchandiseList = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [pagination, setPagination] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMerch, setEditingMerch] = useState(null);

    const fetchMerchandise = (pageUrl) => {
        setLoading(true);
        const url = pageUrl || API_BASE_URL;

        axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const { data, ...paginationData } = response.data;
                setMerchandise(data);
                setPagination(paginationData);
                setLoading(false);
            })
            .catch(err => {
                setError('Gagal memuat data merchandise.');
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if(token) {
            fetchMerchandise();
        }
    }, [token]);

    const handleSave = (formData, id) => {
        const isEditing = !!id;
        const url = isEditing ? `${API_BASE_URL}/${id}` : API_BASE_URL;

        // Penting: Tambahkan _method 'PUT' untuk update di Laravel
        if (isEditing) {
            formData.append('_method', 'PUT');
        }

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            alert(`Merchandise berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
            setIsModalOpen(false);
            fetchMerchandise(pagination.path + '?page=' + pagination.current_page);
        })
        .catch(err => {
            const message = err.response?.data?.message || 'Gagal menyimpan merchandise.';
            alert(message);
            console.error(err.response?.data);
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus merchandise ini?')) {
            axios.delete(`${API_BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Merchandise berhasil dihapus!');
                 if (merchandise.length === 1 && pagination.current_page > 1) {
                    fetchMerchandise(pagination.prev_page_url);
                } else {
                    fetchMerchandise(pagination.path + '?page=' + pagination.current_page);
                }
            })
            .catch(err => {
                alert('Gagal menghapus merchandise.');
                console.error(err);
            });
        }
    };

    const handleOpenModal = (merch = null) => {
        setEditingMerch(merch);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if (loading) return <div className="loading-message">Memuat data merchandise...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="list-container">
            <MerchandiseFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                initialData={editingMerch}
            />

            <div className="list-header">
                <h1>Manajemen Merchandise</h1>
                <button className="add-button" onClick={() => handleOpenModal(null)}>
                    Tambah Merchandise
                </button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Gambar</th>
                        <th>Nama Merchandise</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {merchandise.length > 0 ? merchandise.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img
                                    src={item.image_url || 'https://placehold.co/100x100?text=No+Image'}
                                    alt={item.name}
                                    className="item-image"
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>Rp {new Intl.NumberFormat('id-ID').format(item.price)}</td>
                            <td>{item.stock}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button" onClick={() => handleOpenModal(item)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(item.id)}>Hapus</button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="no-data">Tidak ada merchandise ditemukan.</td></tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-controls">
                <span>Halaman <strong>{pagination.current_page}</strong> dari <strong>{pagination.last_page}</strong></span>
                <div>
                    <button
                        className="pagination-button"
                        onClick={() => fetchMerchandise(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}>
                        &laquo; Sebelumnya
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => fetchMerchandise(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}>
                        Berikutnya &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MerchandiseList;