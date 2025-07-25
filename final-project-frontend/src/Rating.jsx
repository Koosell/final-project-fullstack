import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext'; // <-- Menggunakan hook untuk cek login
import './css/Rating.css'; // <-- Menggunakan file CSS terpisah

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(""); // State baru untuk komentar
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useCart(); // Ambil token untuk memeriksa status login

  const handleClick = (index) => {
    setRating(index);
  };

  // Mendefinisikan apiUrl dari environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    if (rating === 0) {
        alert("Harap pilih rating bintang terlebih dahulu.");
        return;
    }

    if (!token) {
        alert("Anda harus login untuk memberikan rating.");
        navigate('/login');
        return;
    }

    setIsLoading(true);
    try {
        await axios.post(`${apiUrl}/api/testimonials`, 
        {
            rating: rating,
            comment: comment
        }, 
        {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        setSubmitted(true);
    } catch (error) {
        console.error("Gagal mengirim rating:", error);
        alert("Gagal mengirim rating. Silakan coba lagi.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  const handleMouseEnter = (index) => setHoveredRating(index);
  const handleMouseLeave = () => setHoveredRating(0);

  const getRatingText = (ratingValue) => {
    const texts = {
      1: "Sangat Buruk �",
      2: "Buruk 😕",
      3: "Biasa Saja 😐",
      4: "Bagus 😊",
      5: "Sangat Bagus! 🤩"
    };
    return texts[ratingValue] || "Pilih Rating";
  };

  return (
    <div className="rating-background">
      <div className="rating-card">
        <div className="rating-card-content">
          {!submitted ? (
            <>
              <div className="rating-header">
                <h2>Berikan Rating Anda</h2>
                <p>Bagaimana pengalaman Anda dengan layanan kami?</p>
              </div>

              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="star"
                    style={{ color: (hoveredRating || rating) >= star ? '#FFD700' : '#ddd' }}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="rating-text-container">
                <p>{getRatingText(hoveredRating || rating)}</p>
              </div>

              {/* Textarea untuk komentar */}
              <div className="comment-group">
                <textarea
                  placeholder="Ceritakan pengalaman Anda (opsional)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                ></textarea>
              </div>

              <button
                className="submit-rating-btn"
                onClick={handleSubmit}
                disabled={rating === 0 || isLoading}
              >
                {isLoading ? 'Mengirim...' : 'Kirim Rating'}
              </button>
            </>
          ) : (
            <div className="thank-you-message">
              <div className="thank-you-icon">🎉</div>
              <h2>Terima Kasih!</h2>
              <div className="submitted-rating">{rating} ⭐ Bintang</div>
              <p>Feedback Anda sangat berharga untuk meningkatkan kualitas produk dan layanan kami!</p>
            </div>
          )}

          <button className="back-btn" onClick={handleBack}>
            ← Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rating;
