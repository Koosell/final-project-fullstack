import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Mengimpor useNavigate
import './index.css';

const Rating = () => {
  const [rating, setRating] = useState(0); // Menyimpan rating yang dipilih
  const [submitted, setSubmitted] = useState(false); // Menyimpan status apakah rating sudah dikirim
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleClick = (index) => {
    setRating(index); // Mengubah rating saat bintang diklik
  };

  const handleSubmit = () => {
    setSubmitted(true); // Mengubah status menjadi sudah terkirim
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div className="rating-container">
      {!submitted ? (
        <>
          <h2>Rating</h2>
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => handleClick(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <p>{rating} / 5</p>
          <button className="submit-button" onClick={handleSubmit}>
            Submit Rating
          </button>
        </>
      ) : (
        <div className="thank-you-message">
          <h2>Terima Kasih!</h2>
          <p>Terima kasih telah memberikan rating {rating} bintang! Kami sangat menghargai masukan Anda.</p>
        </div>
      )}

      {/* Tombol Back */}
      <button className="back-button" onClick={handleBack}>
        Kembali
      </button>
    </div>
  );
};

export default Rating;
