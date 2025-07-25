import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // <-- Import useCart
import './css/ProdukMenu.css';
import './css/ProdukMenuAnimations.css';

const ProdukMenu = () => {
    const [merchandise, setMerchandise] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // <-- Mengambil fungsi dari konteks
    // Mendefinisikan apiUrl dari environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchMerchandise = async () => {
            try {
                // PERBAIKAN: Menggunakan backticks (`) dan apiUrl
                const response = await axios.get(`${apiUrl}/api/merchandise`);
                
                // Ambil data dari properti 'data' karena menggunakan paginasi
                setMerchandise(response.data.data);

            } catch (error) {
                console.error("Gagal mengambil data merchandise:", error);
            }
        };
        fetchMerchandise();
    }, [apiUrl]); // <-- Tambahkan apiUrl sebagai dependency

    const handleAddToCart = async (merchItem) => {
        // Menggunakan fungsi terpusat dari CartContext
        const { success } = await addToCart(merchItem.id, 'merchandise');
        if (success) {
            alert(`${merchItem.name} berhasil ditambahkan ke keranjang!`);
            navigate('/keranjang');
        } else {
            alert('Gagal menambahkan item. Mungkin Anda belum login?');
            navigate('/login');
        }
    };

    return (
        <section className="produk-container">
            <div className="produk-header">
                <h1>Koleksi Eksklusif Kami</h1>
                <p>Temukan produk terbaik dengan kualitas premium</p>
            </div>
            
            <div className="produk-grid">
                {merchandise.map((item, index) => (
                    <div className="produk-card" key={item.id} style={{ '--index': index }}>
                        <div className="produk-badge">NEW!</div>
                        <div className="produk-image-container">
                            {/* PERBAIKAN: Menggunakan path gambar yang lengkap */}
                            <img src={`${apiUrl}/storage/${item.image_url}`} alt={item.name} className="produk-image" loading="lazy" />
                        </div>
                        <div className="produk-info">
                            <h3>{item.name}</h3>
                            <p className="produk-price">Rp {item.price.toLocaleString('id-ID')}</p>
                            <button className="produk-button" onClick={() => handleAddToCart(item)}>
                                + Keranjang
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProdukMenu;
