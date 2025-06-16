import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
// --- PERBAIKAN DI SINI: Menambahkan ekstensi .jsx pada import ---
import MerchandiseFormModal from './MerchandiseFormModal.jsx';
import './ProductList.css'; // Kita bisa gunakan kembali CSS dari ProductList

const MerchandiseList = () => {
    const [merchandise, setMerchandise] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [pagination, setPagination] = useState({});

    // --- STATE BARU UNTUK MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMerch, setEditingMerch] = useState(null); // Untuk menyimpan data yang diedit

    const fetchMerchandise = (pageUrl) => {
        setLoading(true);
        const url = pageUrl || 'http://localhost:8000/api/admin/merchandise';

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
        fetchMerchandise();
    }, [token]);

    // --- FUNGSI BARU UNTUK MENANGANI PENYIMPANAN ---
    const handleSave = (formData, id) => {
        const isEditing = !!id;
        const url = isEditing
            ? `http://localhost:8000/api/admin/merchandise/${id}`
            : 'http://localhost:8000/api/admin/merchandise';
        
        // Gunakan POST untuk create dan update (karena ada file upload)
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            alert(`Merchandise berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
            setIsModalOpen(false);
            setEditingMerch(null);
            fetchMerchandise(); // Muat ulang data
        })
        .catch(err => {
            alert(`Gagal menyimpan merchandise.`);
            console.error(err.response?.data);
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus merchandise ini?')) {
            axios.delete(`http://localhost:8000/api/admin/merchandise/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Merchandise berhasil dihapus!');
                fetchMerchandise(pagination.path + '?page=' + pagination.current_page);
            })
            .catch(err => {
                alert('Gagal menghapus merchandise.');
                console.error(err);
            });
        }
    };

    // --- FUNGSI UNTUK MEMBUKA MODAL ---
    const handleOpenModal = (merch = null) => {
        setEditingMerch(merch); // Jika null, berarti 'tambah baru'. Jika ada data, berarti 'edit'.
        setIsModalOpen(true);
    };

    if (loading) return <div className="loading-message">Memuat data merchandise...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-list-container">
            {/* Modal untuk form tambah/edit */}
            <MerchandiseFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingMerch}
            />

            <div className="product-list-header">
                <h1>Manajemen Merchandise</h1>
                <button className="add-button" onClick={() => handleOpenModal(null)}>
                    Tambah Merchandise Baru
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
                                    src={item.image || 'https://placehold.co/100x100/EEE/31343C?text=No+Image'}
                                    alt={item.name}
                                    className="product-image"
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>Rp {new Intl.NumberFormat('id-ID').format(item.price)}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleOpenModal(item)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(item.id)}>Hapus</button>
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
