import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- AWAL PENAMBAHAN KODE ADMIN ---
// 1. AuthProvider akan kita buat setelah ini. Fungsinya untuk mengelola data login.
import { AuthProvider } from "./context/AuthContext";
// 2. AdminRoutes adalah komponen yang akan berisi semua halaman panel admin.
import AdminRoutes from "./admin/routes/AdminRoutes"; 
// --- AKHIR PENAMBAHAN KODE ADMIN ---

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
import GameProducts from "./GameProducts.jsx";
import Profile from "./Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { CartProvider } from "./CartContext.jsx";

const Main = () => {
  return (
    <BrowserRouter basename="/final-project-fullstack">
      {/* --- AWAL PENAMBAHAN KODE ADMIN --- */}
      {/* 3. Bungkus semua komponen dengan AuthProvider agar status login bisa diakses di mana saja */}
      <AuthProvider>
      {/* --- AKHIR PENAMBAHAN KODE ADMIN --- */}
        <CartProvider>
          <>
            {/* Navbar & Footer bisa dibuat kondisional agar tidak tampil di panel admin nanti */}
            <Navbar /> 
            <Routes>
              {/* --- AWAL PENAMBAHAN KODE ADMIN --- */}
              {/* 4. Tambahkan satu rute ini untuk menangani semua URL di bawah /admin */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              {/* --- AKHIR PENAMBAHAN KODE ADMIN --- */}

              {/* Rute Publik (accessible to everyone) - INI SEMUA TETAP SAMA */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/games" element={<GameProducts />} />
              <Route path="/ProdukMenu" element={<ProdukMenu />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/tentang-kami" element={<TentangKami />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/checkout/ml" element={<CheckoutML />} />
              <Route path="/checkout/ff" element={<CheckoutFF />} />
              <Route path="/checkout/pubg" element={<CheckoutPUBG />} />
              <Route path="/checkout/gensin" element={<CheckoutGensin />} />
              <Route path="/checkout/valo" element={<CheckoutValo />} />
              <Route path="/checkout/cod" element={<CheckoutCOD />} />

              {/* Protected Routes (require login) - INI SEMUA TETAP SAMA */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/keranjang" element={<Keranjang />} />
                <Route path="/checkout/produk" element={<CheckoutProduk />} />
              </Route>

            </Routes>
            <Footer />
          </>
        </CartProvider>
      {/* --- AWAL PENAMBAHAN KODE ADMIN --- */}
      </AuthProvider>
      {/* --- AKHIR PENAMBAHAN KODE ADMIN --- */}
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
export default Main;
