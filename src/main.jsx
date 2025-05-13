import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./index.jsx";
import CheckoutML from "./CheckoutML.jsx";
import CheckoutFF from "./CheckoutFF.jsx";
import CheckoutPUBG from "./CheckoutPUBG.jsx";
import Navbar from "./navbar.jsx"; // Pastikan path ke Navbar.jsx benar
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <>
      <Navbar /> {/* Navbar tetap tampil di semua halaman */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/checkout/ml" element={<CheckoutML />} />
        <Route path="/checkout/ff" element={<CheckoutFF />} />
        <Route path="/checkout/pubg" element={<CheckoutPUBG />} />
      </Routes>
    </>
  </BrowserRouter>
);
