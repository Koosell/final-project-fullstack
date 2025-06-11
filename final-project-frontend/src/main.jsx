import React from "react";
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
import GameProducts from "./GameProducts.jsx";
import Profile from "./Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx"; // <-- Import the guard
import { CartProvider } from "./CartContext.jsx";   // <-- Import the provider

const Main = () => {
  return (
    // BrowserRouter must be the outermost component
    <BrowserRouter basename="/final-project-fullstack">
      {/* CartProvider wraps the components that need access to the cart state */}
      <CartProvider>
        <>
          <Navbar />
          <Routes>
            {/* Public Routes (accessible to everyone) */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<GameProducts />} />
            <Route path="/ProdukMenu" element={<ProdukMenu />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />

            {/* Protected Routes (require login) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/keranjang" element={<Keranjang />} />
              <Route path="/checkout/produk" element={<CheckoutProduk />} />
              {/* Add your game checkout routes here if they require login */}
              <Route path="/checkout/ml" element={<CheckoutML />} />
              <Route path="/checkout/ff" element={<CheckoutFF />} />
              <Route path="/checkout/pubg" element={<CheckoutPUBG />} />
              <Route path="/checkout/gensin" element={<CheckoutGensin />} />
              <Route path="/checkout/valo" element={<CheckoutValo />} />
              <Route path="/checkout/cod" element={<CheckoutCOD />} />
            </Route>

          </Routes>
          <Footer />
        </>
      </CartProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
export default Main;
