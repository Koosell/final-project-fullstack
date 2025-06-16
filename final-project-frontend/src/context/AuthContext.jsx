import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Kita akan gunakan axios sementara, nanti kita ganti

// 1. Membuat Context
// Ini seperti membuat sebuah "kotak data global" kosong.
const AuthContext = createContext({
  user: null,
  token: null,
  isAdmin: false,
  setUser: () => {},
  setToken: () => {},
  logout: () => {}
});

// 2. Membuat Provider (Penyedia Data)
// Ini adalah komponen yang akan "mengisi kotak data" dan membagikannya.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Ambil token dari localStorage saat pertama kali aplikasi dimuat
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  // Fungsi khusus untuk mengatur token, agar tersimpan juga di localStorage
  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Cek ke backend setiap kali token berubah untuk mendapatkan data user
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:8000/api/user', { // Ganti URL ini jika berbeda
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        // Jika token tidak valid, logout
        logout();
      });
    }
  }, [token]);

  // Cek apakah user yang login adalah admin
  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Membuat Custom Hook
// Ini adalah cara mudah bagi komponen lain untuk "mengambil data dari kotak".
export const useAuth = () => useContext(AuthContext);
