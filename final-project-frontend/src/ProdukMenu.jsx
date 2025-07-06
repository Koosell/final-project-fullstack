import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/ProdukMenu.css';
import './css/ProdukMenuAnimations.css';

const ProdukMenu = () => {
    const [merchandise, setMerchandise] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMerchandise = async () => {
            try {
                // PERBAIKAN: Menggunakan endpoint API publik yang baru
                const response = await axios.get('http://127.0.0.1:8000/api/merchandise');
                
                // Ambil data dari properti 'data' karena menggunakan paginasi
                setMerchandise(response.data.data);

            } catch (error) {
                console.error("Gagal mengambil data merchandise:", error);
            }
        };
        fetchMerchandise();
    }, []);

    const handleAddToCart = async (merchItem) => {
        const yourAuthToken = localStorage.getItem('token');
        if (!yourAuthToken) {
            alert("Anda harus login terlebih dahulu!");
            navigate('/login');
            return;
        }
        
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/add', {
                item_id: merchItem.id,
                item_type: 'merchandise', // Pastikan backend mengenali tipe ini
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${yourAuthToken}`
                }
            });
            
            alert(`${merchItem.name} berhasil ditambahkan ke keranjang!`);
            navigate('/keranjang');

        } catch (error) {
            console.error('Gagal menambahkan ke keranjang:', error.response?.data);
            alert('Gagal menambahkan item ke keranjang.');
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
                            {/* Gunakan 'image_url' yang dikirim dari API Resource */}
                            <img src={item.image_url} alt={item.name} className="produk-image" loading="lazy" />
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
