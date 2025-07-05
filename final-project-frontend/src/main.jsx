import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Providers
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./CartContext.jsx";
import { PaymentProvider } from "./PaymentContext.jsx"; // <-- HANYA MENAMBAH IMPORT INI

// Komponen Utama & Rute Khusus
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import AdminRoutes from "./admin/routes/AdminRoutes.jsx";
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx";

// Halaman-Halaman
import Index from "./index.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";
import Keranjang from "./Keranjang.jsx";
import ProdukMenu from "./ProdukMenu.jsx";
import TentangKami from "./TentangKami.jsx";
import Contact from "./Contact.jsx";
import Team from "./Team.jsx";
import Rating from './Rating.jsx';
import GameProducts from "./GameProducts.jsx";
import CheckoutProduk from "./CheckoutProduk.jsx";
import CheckoutML from "./CheckoutML.jsx";
import CheckoutFF from "./CheckoutFF.jsx";
import CheckoutPUBG from "./CheckoutPUBG.jsx";
import CheckoutGensin from "./CheckoutGensin.jsx";
import CheckoutValo from "./CheckoutValo.jsx";
import CheckoutCOD from "./CheckoutCOD.jsx";

// Komponen Wrapper untuk Logika Tampil/Sembunyi Navbar & Footer
// TIDAK ADA YANG DIUBAH DI SINI
const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      
      <Routes>
        {/* Rute Admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* --- RUTE PUBLIK & TIDAK DILINDUNGI --- */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<GameProducts />} />
        <Route path="/produkMenu" element={<ProdukMenu />} />
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
        <Route path="/profile" element={<Profile />} />

        {/* --- RUTE YANG DILINDUNGI --- */}
        <Route element={<ProtectedRoute />}>
            <Route path="/keranjang" element={<Keranjang />} />
            <Route path="/checkout/produk" element={<CheckoutProduk />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

// Komponen Utama Aplikasi
// TIDAK ADA YANG DIUBAH DI SINI, HANYA DITAMBAHKAN PEMBUNGKUS
const Main = () => {
  return (
    <BrowserRouter basename="/final-project-fullstack">
      <AuthProvider>
        <CartProvider>
          <PaymentProvider> {/* <-- HANYA MENAMBAH PEMBUNGKUS INI */}
            <AppContent />
          </PaymentProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
export default Main;