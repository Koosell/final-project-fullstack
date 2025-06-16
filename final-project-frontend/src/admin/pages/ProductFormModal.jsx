import React, { useState, useEffect } from 'react';
import './ProductFormModal.css'; // Kita akan buat CSS-nya

const ProductFormModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [name, setName] = useState('');
    const [gameName, setGameName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Mengisi form jika sedang mode edit
    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setGameName(initialData.game_name || '');
            setPrice(initialData.price || '');
            setDescription(initialData.description || '');
            setPreview(initialData.image || null);
        } else {
            // Reset form jika mode tambah baru
            setName('');
            setGameName('');
            setPrice('');
            setDescription('');
            setImage(null);
            setPreview(null);
        }
    }, [initialData, isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('game_name', gameName);
        formData.append('price', price);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        onSave(formData, initialData?.id);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{initialData ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nama Produk</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Nama Game</label>
                        <input type="text" value={gameName} onChange={e => setGameName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Harga</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Deskripsi</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="input-group">
                        <label>Gambar</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {preview && <img src={preview} alt="Preview" className="image-preview" />}
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>Batal</button>
                        <button type="submit" className="save-button">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
