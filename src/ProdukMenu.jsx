// ProdukMenu.jsx
import React from 'react';
import './css/ProdukMenu.css';

const ProdukMenu = () => {
  const products = [
  {
    name: "Gaming Headset RGB 7.1 Surround",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop&auto=format",
    price: "Rp 759.000",
    category: "Audio",
    rating: 4.9,
    specs: "7.1 Surround Sound, RGB Lighting, Noise Cancelling"
  },
  {
    name: "Wireless Gaming Mouse Pro",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&auto=format",
    price: "Rp 599.000",
    category: "Peripheral",
    rating: 4.7,
    specs: "25,600 DPI, 80-hour Battery, RGB"
  },
  {
    name: "Gaming T-Shirt Esports Edition",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop&auto=format",
    price: "Rp 149.000",
    category: "Apparel",
    rating: 4.3,
    specs: "Premium Cotton, Gaming Logo, Comfort Fit"
  },
  {
    name: "Gaming Backpack RGB",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format",
    price: "Rp 399.000",
    category: "Accessories",
    rating: 4.6,
    specs: "LED Lights, Laptop Compartment, Water Resistant"
  },
  {
    name: "Mechanical Keyboard RGB Clicky",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&auto=format",
    price: "Rp 899.000",
    category: "Peripheral",
    rating: 4.8,
    specs: "Cherry MX Blue, RGB Per-Key, Anti-Ghosting"
  },
  {
    name: "Gaming Chair Ergonomic Pro",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    price: "Rp 2.499.000",
    category: "Furniture",
    rating: 4.9,
    specs: "Lumbar Support, 4D Armrests, PU Leather"
  },
  {
    name: "Gaming Monitor 144Hz Curved",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&auto=format",
    price: "Rp 3.299.000",
    category: "Display",
    rating: 5.0,
    specs: "27 inch, 144Hz, 1ms Response Time, Curved"
  },
  {
    name: "Gaming Mousepad XXL RGB",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop&auto=format",
    price: "Rp 199.000",
    category: "Peripheral",
    rating: 4.4,
    specs: "900x400mm, RGB Lighting, Non-Slip Base"
  },
  {
    name: "Webcam 4K Gaming Streamer",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop&auto=format",
    price: "Rp 1.199.000",
    category: "Streaming",
    rating: 4.7,
    specs: "4K 30fps, Auto Focus, Built-in Mic"
  },
  {
    name: "Gaming Phone Cooler Fan",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format",
    price: "Rp 249.000",
    category: "Mobile Gaming",
    rating: 4.2,
    specs: "Silent Operation, Universal Fit, LED Indicator"
  },
  {
    name: "VR Gaming Headset",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop&auto=format",
    price: "Rp 4.999.000",
    category: "VR",
    rating: 4.8,
    specs: "2880x1700 per eye, 90Hz, Inside-out Tracking"
  }
];

  return (
    <section className="produk-container">
      <div className="produk-header">
        <h1>Koleksi Eksklusif Kami</h1>
        <p>Temukan produk terbaik dengan kualitas premium</p>
      </div>
      
      <div className="produk-grid">
        {products.map((product, index) => (
          <div className="produk-card" key={index}>
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
              <p className="produk-price">{product.price}</p>
              <button className="produk-button">+ Keranjang</button>
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