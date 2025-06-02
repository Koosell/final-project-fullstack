import React, { useState } from "react";
import "./css/Keranjang.css";


const Keranjang = () => {
  const { cartItems } = useCart();

  return (
    <div className="keranjang-container">
      <h3>Keranjang Saya</h3>
      {cartItems.length === 0 ? (
        <p className="kosong">Keranjang kosong</p>
      ) : (
        <ul className="keranjang-list">
          {cartItems.map((item, index) => (
            <li key={index} className="keranjang-item">
              <img
                src={`/src/assets/images/${item.img}`}
                alt={item.label}
                className="keranjang-image"
              />
              <div className="keranjang-info">
                <span>{item.label}</span>
                <span className="harga">{item.price}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Keranjang; 