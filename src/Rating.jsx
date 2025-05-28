import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Rating.css";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setRating(index);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMouseEnter = (index) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Sangat Buruk 😞",
      2: "Buruk 😕",
      3: "Biasa Saja 😐",
      4: "Bagus 😊",
      5: "Sangat Bagus! 🤩"
    };
    return texts[rating] || "Pilih Rating";
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {!submitted ? (
            <>
              <div style={{
                marginBottom: '30px'
              }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  Berikan Rating Anda
                </h2>
                <p style={{
                  color: '#666',
                  fontSize: '1.1rem'
                }}>
                  Bagaimana pengalaman Anda dengan produk kami?
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{
                      fontSize: '3rem',
                      color: (hoveredRating || rating) >= star ? '#FFD700' : '#ddd',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: (hoveredRating || rating) >= star ? 'scale(1.2)' : 'scale(1)',
                      textShadow: (hoveredRating || rating) >= star ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none',
                      filter: (hoveredRating || rating) >= star ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))' : 'none'
                    }}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div style={{
                marginBottom: '30px',
                minHeight: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: rating > 0 ? '#667eea' : '#999',
                  transition: 'all 0.3s ease'
                }}>
                  {getRatingText(hoveredRating || rating)}
                </p>
              </div>

              <button
                style={{
                  background: rating > 0 
                    ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                    : 'linear-gradient(45deg, #ccc, #999)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  cursor: rating > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxShadow: rating > 0 
                    ? '0 10px 20px rgba(102, 126, 234, 0.3)' 
                    : '0 5px 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '20px'
                }}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  if (rating > 0) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = rating > 0 
                    ? '0 10px 20px rgba(102, 126, 234, 0.3)' 
                    : '0 5px 10px rgba(0, 0, 0, 0.1)';
                }}
                disabled={rating === 0}
              >
                {rating > 0 ? 'Kirim Rating' : 'Pilih Rating Dulu'}
              </button>
            </>
          ) : (
            <div style={{
              animation: 'fadeInUp 0.6s ease-out'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '20px'
              }}>
                🎉
              </div>
              <h2 style={{
                fontSize: '2.5rem',
                background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                Terima Kasih!
              </h2>
              <div style={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                display: 'inline-block',
                boxShadow: '0 10px 20px rgba(255, 215, 0, 0.3)'
              }}>
                {rating} ⭐ Bintang
              </div>
              <p style={{
                fontSize: '1.2rem',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '30px'
              }}>
                Feedback Anda sangat berharga untuk meningkatkan kualitas produk dan layanan kami!
              </p>
            </div>
          )}

          <button
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 15px rgba(255, 107, 107, 0.3)'
            }}
            onClick={handleBack}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 20px rgba(255, 107, 107, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 15px rgba(255, 107, 107, 0.3)';
            }}
          >
            ← Kembali
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Rating;