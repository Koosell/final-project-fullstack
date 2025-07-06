import React, { useState, useEffect } from 'react';
import './MerchandiseFormModal.css'; // Pastikan file CSS ini ada

const MerchandiseFormModal = ({ isOpen, onClose, onSave, initialData }) => {
    // State untuk semua field form
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); // <-- State untuk Kategori
    const [size, setSize] = useState('');         // <-- State untuk Ukuran
    const [material, setMaterial] = useState(''); // <-- State untuk Bahan
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Mode Edit: Isi form dengan data yang ada
                setName(initialData.name || '');
                setPrice(initialData.price || '');
                setStock(initialData.stock || '');
                setDescription(initialData.description || '');
                setCategory(initialData.category || ''); // Isi kategori
                setSize(initialData.size || '');         // Isi ukuran
                setMaterial(initialData.material || ''); // Isi bahan
                setPreview(initialData.image_url || null); 
                setImage(null);
            } else {
                // Mode Tambah Baru: Kosongkan semua field
                setName('');
                setPrice('');
                setStock('');
                setDescription('');
                setCategory(''); // Kosongkan kategori
                setSize('');     // Kosongkan ukuran
                setMaterial(''); // Kosongkan bahan
                setImage(null);
                setPreview(null);
            }
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
        // Tambahkan semua data ke FormData untuk dikirim ke backend
        formData.append('name', name);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('category', category); // Kirim kategori
        formData.append('size', size);         // Kirim ukuran
        formData.append('material', material); // Kirim bahan
        
        if (image) {
            formData.append('image', image);
        }

        onSave(formData, initialData?.id);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{initialData ? 'Edit Merchandise' : 'Tambah Merchandise Baru'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nama Merchandise</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Harga</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Stok</label>
                        <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
                    </div>
                    {/* Input field baru untuk Kategori */}
                    <div className="input-group">
                        <label>Kategori</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Ukuran (Size)</label>
                        <input type="text" value={size} onChange={e => setSize(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Bahan (Material)</label>
                        <input type="text" value={material} onChange={e => setMaterial(e.target.value)} />
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

export default MerchandiseFormModal;
