import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // <-- Menggunakan hook useCart

const GameProducts = () => {
    const [allProducts, setAllProducts] = useState([]); // State untuk semua produk
    const [filteredProducts, setFilteredProducts] = useState([]); // State untuk produk yang ditampilkan
    const [activeFilter, setActiveFilter] = useState('All'); // State untuk filter aktif
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Mengambil fungsi dari konteks
    // Mendefinisikan apiUrl dari environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    // Kategori filter, bisa disesuaikan dengan data Anda
    const gameFilters = ['All', 'Valorant', 'ML', 'FF', 'PUBG', 'COD', 'Genshin'];

    // 1. Ambil SEMUA produk saat komponen dimuat
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                // PERBAIKAN: Menggunakan backticks (`) bukan single quotes (')
                const response = await axios.get(`${apiUrl}/api/products`);
                setAllProducts(response.data.data); // Asumsi data ada di dalam 'data'
                setFilteredProducts(response.data.data); // Awalnya tampilkan semua
            } catch (error) {
                console.error("Gagal mengambil semua produk:", error);
            }
        };
        fetchAllProducts();
    }, [apiUrl]); // Tambahkan apiUrl sebagai dependency

    // 2. Fungsi untuk memfilter produk berdasarkan kategori
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        if (filter === 'All') {
            setFilteredProducts(allProducts);
        } else {
            // Asumsi nama produk mengandung nama game, misal "100 Diamond ML"
            const filtered = allProducts.filter(product => 
                product.name.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    // 3. Fungsi untuk menambahkan item ke keranjang
    const handleAddGameToCart = async (gameProduct) => {
        const { success } = await addToCart(gameProduct.id, 'product');
        if (success) {
            alert(`${gameProduct.name} berhasil ditambahkan ke keranjang!`);
        } else {
            alert('Gagal menambahkan item. Mungkin Anda belum login?');
        }
    };

    return (
        <div className="product-page-container" style={{padding: '2rem'}}>
            <h1>Top Up Game Credits</h1>

            {/* Tombol Filter */}
            <div className="filter-buttons" style={{ marginBottom: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {gameFilters.map(filter => (
                    <button 
                        key={filter} 
                        onClick={() => handleFilterChange(filter)}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            backgroundColor: activeFilter === filter ? '#007bff' : '#f0f0f0',
                            color: activeFilter === filter ? 'white' : 'black',
                            border: '1px solid #ccc',
                            borderRadius: '20px'
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Grid Produk */}
            <div className="product-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem'}}>
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id} style={{border: '1px solid #eee', padding: '1rem', borderRadius: '8px', textAlign: 'center'}}>
                        <img src={`${apiUrl}/storage/${product.image_url}`} alt={product.name} style={{width: '100%', height: '120px', objectFit: 'contain', marginBottom: '1rem'}}/>
                        <h3 style={{fontSize: '1rem', minHeight: '40px'}}>{product.name}</h3>
                        <p style={{fontWeight: 'bold', color: '#333'}}>Rp {product.price.toLocaleString('id-ID')}</p>
                        <button 
                            onClick={() => handleAddGameToCart(product)}
                            style={{width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px'}}
                        >
                            + Keranjang
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameProducts;
