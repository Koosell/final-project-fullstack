import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./index.jsx";
import CheckoutML from "./CheckoutML.jsx";
import CheckoutFF from "./CheckoutFF.jsx";
import CheckoutPUBG from "./CheckoutPUBG.jsx";
import Navbar from "./Navbar.jsx";
import Register from "./Register";
import Login from "./Login";
import Rating from './Rating';
import TentangKami from "./TentangKami.jsx";
import Contact from "./Contact";
import ProdukMenu from "./ProdukMenu";
import Team from "./Team";




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <>
      <Navbar /> {/* Navbar tetap tampil di semua halaman */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/checkout/ml" element={<CheckoutML />} />
        <Route path="/checkout/ff" element={<CheckoutFF />} />
        <Route path="/checkout/pubg" element={<CheckoutPUBG />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/ProdukMenu" element={<ProdukMenu />} />
      </Routes>
    </>
  </BrowserRouter>
);
