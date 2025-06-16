import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ProductFormModal from './ProductFormModal.jsx'; // <-- IMPORT BARU
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [pagination, setPagination] = useState({});

    // State untuk mengelola modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = (pageUrl) => {
        setLoading(true);
        const url = pageUrl || 'http://localhost:8000/api/admin/products';

        axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const { data, ...paginationData } = response.data;
                setProducts(data);
                setPagination(paginationData);
                setLoading(false);
            })
            .catch(err => {
                setError('Gagal memuat data produk.');
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const handleSave = (formData, id) => {
        const isEditing = !!id;
        const url = isEditing
            ? `http://localhost:8000/api/admin/products/${id}`
            // Untuk update, kita perlu menambahkan _method PUT karena HTML form tidak mendukung PUT
            : 'http://localhost:8000/api/admin/products';
        
        const method = isEditing ? 'put' : 'post';

        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            alert(`Produk berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        })
        .catch(err => {
            alert('Gagal menyimpan produk.');
            console.error(err.response?.data);
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Produk berhasil dihapus!');
                fetchProducts(pagination.path + '?page=' + pagination.current_page);
            })
            .catch(err => {
                alert('Gagal menghapus produk.');
                console.error(err);
            });
        }
    };

    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    if (loading) return <div className="loading-message">Memuat data produk...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-list-container">
            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingProduct}
            />

            <div className="product-list-header">
                <h1>Manajemen Produk</h1>
                <button className="add-button" onClick={() => handleOpenModal(null)}>
                    Tambah Produk Baru
                </button>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Gambar</th>
                        <th>Nama Produk</th>
                        <th>Game</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={product.image || 'https://placehold.co/100x100/EEE/31343C?text=No+Image'}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.game_name}</td>
                            <td>Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleOpenModal(product)}>Edit</button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="no-data">Tidak ada produk ditemukan.</td></tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-controls">
                <span>Halaman <strong>{pagination.current_page}</strong> dari <strong>{pagination.last_page}</strong></span>
                <div>
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}>
                        &laquo; Sebelumnya
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => fetchProducts(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}>
                        Berikutnya &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
