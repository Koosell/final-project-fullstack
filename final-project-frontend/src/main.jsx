
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./index.jsx";
import CheckoutML from "./CheckoutML.jsx";
import CheckoutFF from "./CheckoutFF.jsx";
import CheckoutPUBG from "./CheckoutPUBG.jsx";
import CheckoutGensin from "./CheckoutGensin.jsx";
import CheckoutValo from "./CheckoutValo.jsx";
import CheckoutCOD from "./CheckoutCOD.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Register from "./Register";
import Login from "./Login";
import Rating from './Rating';
import TentangKami from "./TentangKami.jsx";
import Contact from "./Contact";
import ProdukMenu from "./ProdukMenu";
import Team from "./Team";
import Keranjang from "./Keranjang.jsx";
import CheckoutProduk from "./CheckoutProduk.jsx";

const Main = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <BrowserRouter basename="/final-project-fullstack">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/checkout/ml" element={<CheckoutML />} />
          <Route path="/checkout/ff" element={<CheckoutFF />} />
          <Route path="/checkout/pubg" element={<CheckoutPUBG />} />
          <Route path="/checkout/gensin" element={<CheckoutGensin />} />
          <Route path="/checkout/valo" element={<CheckoutValo />} />
          <Route path="/checkout/cod" element={<CheckoutCOD />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ProdukMenu" element={<ProdukMenu addToCart={addToCart} />} />
          <Route path="/keranjang" element={
            <Keranjang 
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              getTotalPrice={getTotalPrice}
            />
          } />
          <Route path="/checkout/produk" element={
            <CheckoutProduk
              cartItems={cartItems}
              getTotalPrice={getTotalPrice}
              setCartItems={setCartItems}
            />
          } />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
export default Main;
