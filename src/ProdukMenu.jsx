import React from "react";
import './css/ProdukMenu.css';

const products = [
  { name: "Jersey", image: "/src/assets/images/jersey.jpg"},
  { name: "Gantungan Kunci", image: "/src/assets/images/gantungan kunci panci.jpg" },
  { name: "Kaos", image: "/src/assets/images/kaos mobile legend.jpg"},
];

const ProductCard = ({ name, image }) => (
  <div className="product-card">
    <div className="product-image">
      <img src={image} alt={name} />
    </div>
    <div className="product-name">
      <h2>{name}</h2>
    </div>
  </div>
);

const ProdukMenu = () => {
  return (
    <div className="produk-menu">
      <h1>Produk Kami</h1>
      <div className="produk-grid">
        {products.map((product, index) => (
          <ProductCard key={index} name={product.name} image={product.image} />
        ))}
      </div>
    </div>
  );
};

export default ProdukMenu;