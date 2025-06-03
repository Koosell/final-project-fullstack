import React from 'react';
import './css/ProdukMenu.css';
import './css/ProdukMenuAnimations.css';
import { Link } from 'react-router-dom';

const ProdukMenu = ({ addToCart }) => {
  const products = [
    {
      id: 1,
      name: "Gaming Headset RGB 7.1 Surround",
      image: "https://i.imgur.com/bOYAQMk.jpeg",
      price: 759000,
      category: "Audio",
      rating: 4.9,
      specs: "7.1 Surround Sound, RGB Lighting, Noise Cancelling"
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse Pro",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&auto=format",
      price: 599000,
      category: "Peripheral",
      rating: 4.7,
      specs: "25,600 DPI, 80-hour Battery, RGB"
    },
    {
      id: 3,
      name: "Gaming T-Shirt Esports Edition",
      image: "https://i.imgur.com/MUXFpkX.jpeg",
      price: 149000,
      category: "Apparel",
      rating: 4.3,
      specs: "Premium Cotton, Gaming Logo, Comfort Fit"
    },
    {
      id: 4,
      name: "Gaming Backpack RGB",
      image: "https://i.imgur.com/3VAnTzm.jpeg",
      price: 399000,
      category: "Accessories",
      rating: 4.6,
      specs: "LED Lights, Laptop Compartment, Water Resistant"
    },
    {
      id: 5,
      name: "Mechanical Keyboard RGB Clicky",
      image: "https://i.imgur.com/6y4fyQ8.jpeg",
      price: 899000,
      category: "Peripheral",
      rating: 4.8,
      specs: "Cherry MX Blue, RGB Per-Key, Anti-Ghosting"
    },
    {
      id: 6,
      name: "Gaming Chair Ergonomic Pro",
      image: "https://i.imgur.com/8lsVPBa.jpeg",
      price: 2499000,
      category: "Furniture",
      rating: 4.9,
      specs: "Lumbar Support, 4D Armrests, PU Leather"
    },
    {
      id: 7,
      name: "Gaming Monitor 144Hz Curved",
      image: "https://i.imgur.com/XYnESWE.jpeg",
      price: 3299000,
      category: "Display",
      rating: 5.0,
      specs: "27 inch, 144Hz, 1ms Response Time, Curved"
    },
    {
      id: 8,
      name: "Gaming Mousepad XXL RGB",
      image: "https://i.imgur.com/a1oRwdb.jpeg",
      price: 199000,
      category: "Peripheral",
      rating: 4.4,
      specs: "900x400mm, RGB Lighting, Non-Slip Base"
    },
    {
      id: 9,
      name: "Webcam 4K Gaming Streamer",
      image: "https://i.imgur.com/Xsl0SCA.jpeg",
      price: 1199000,
      category: "Streaming",
      rating: 4.7,
      specs: "4K 30fps, Auto Focus, Built-in Mic"
    },
    {
      id: 10,
      name: "Gaming Phone Cooler Fan",
      image: "https://i.imgur.com/2v53UWH.jpeg",
      price: 249000,
      category: "Mobile Gaming",
      rating: 4.2,
      specs: "Silent Operation, Universal Fit, LED Indicator"
    },
    {
      id: 11,
      name: "VR Gaming Headset",
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop&auto=format",
      price: 4999000,
      category: "VR",
      rating: 4.8,
      specs: "2880x1700 per eye, 90Hz, Inside-out Tracking"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      label: product.name,
      description: product.specs,
      price: product.price
    });
  };

  return (
    <section className="produk-container">
      <div className="produk-header">
        <h1>Koleksi Eksklusif Kami</h1>
        <p>Temukan produk terbaik dengan kualitas premium</p>
      </div>
      
      <div className="produk-grid">
        {products.map((product, index) => (
          <div className="produk-card" key={product.id} style={{ '--index': index }}>
            <div className="produk-badge">BESTSELLER</div>
            <div className="produk-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="produk-image"
                loading="lazy"
              />
            </div>
            <div className="produk-info">
              <h3>{product.name}</h3>
              <p className="produk-price">Rp {product.price.toLocaleString('id-ID')}</p>
              <Link 
                to="/keranjang" 
                className="produk-button" 
                onClick={() => handleAddToCart(product)}
              >
                + Keranjang
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="produk-cta">
        <button className="cta-button">Lihat Semua Produk</button>
      </div>
    </section>
  );
};

export default ProdukMenu;