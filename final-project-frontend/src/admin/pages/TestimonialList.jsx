import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './TestimonialList.css';

const TestimonialList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();
    const [pagination, setPagination] = useState({});

    const fetchTestimonials = (pageUrl) => {
        setLoading(true);
        const url = pageUrl || 'http://localhost:8000/api/admin/testimonials';

        axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const { data, ...paginationData } = response.data;
            setTestimonials(data);
            setPagination(paginationData);
            setLoading(false);
        })
        .catch(err => {
            setError('Gagal memuat data testimoni.');
            console.error(err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchTestimonials();
    }, [token]);

    const handleApprove = (id) => {
        if (window.confirm('Setujui testimoni ini untuk ditampilkan di halaman utama?')) {
            axios.put(`http://localhost:8000/api/admin/testimonials/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Testimoni berhasil disetujui!');
                fetchTestimonials(pagination.path + '?page=' + pagination.current_page);
            })
            .catch(err => {
                alert('Gagal menyetujui testimoni.');
                console.error(err);
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            axios.delete(`http://localhost:8000/api/admin/testimonials/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                alert('Testimoni berhasil dihapus!');
                fetchTestimonials(pagination.path + '?page=' + pagination.current_page);
            })
            .catch(err => {
                alert('Gagal menghapus testimoni.');
                console.error(err);
            });
        }
    };

    if (loading) return <div className="loading-message">Memuat data testimoni...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="testimonial-list-container">
            <h1>Manajemen Testimoni</h1>
            <p>Setujui testimoni agar dapat ditampilkan di halaman depan website Anda.</p>

            <div className="testimonial-grid">
                {testimonials.length > 0 ? testimonials.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-card">
                        <p className="testimonial-content">"{testimonial.content}"</p>
                        <div className="testimonial-footer">
                            <span className="testimonial-author">- {testimonial.user ? testimonial.user.name : 'Anonymous'}</span>
                            <div className="testimonial-actions">
                                {!testimonial.is_featured && (
                                    <button
                                        className="approve-button"
                                        onClick={() => handleApprove(testimonial.id)}
                                    >
                                        Setujui
                                    </button>
                                )}
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(testimonial.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p className="no-data">Tidak ada testimoni ditemukan.</p>
                )}
            </div>

            <div className="pagination-controls">
                <span>Halaman <strong>{pagination.current_page}</strong> dari <strong>{pagination.last_page}</strong></span>
                <div>
                    <button
                        className="pagination-button"
                        onClick={() => fetchTestimonials(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}>
                        &laquo; Sebelumnya
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => fetchTestimonials(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}>
                        Berikutnya &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialList;
