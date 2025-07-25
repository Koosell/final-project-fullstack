import React, { createContext, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// PENTING: Ganti dengan CLIENT_KEY Midtrans Anda dari mode Sandbox
const MIDTRANS_CLIENT_KEY = "MASUKKAN_CLIENT_KEY_ANDA_DI_SINI";

// 1. Membuat Context
const PaymentContext = createContext();

// 2. Membuat Custom Hook untuk mempermudah penggunaan context
export const usePayment = () => {
  return useContext(PaymentContext);
};

// 3. Membuat Provider
export const PaymentProvider = ({ children }) => {

  // Load script Midtrans sekali saja saat aplikasi dimuat
  useEffect(() => {
    const script = document.createElement('script');
    // Pastikan menggunakan URL Sandbox untuk development
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fungsi untuk memproses pembayaran, bisa dipanggil dari komponen manapun
  const handlePay = useCallback(async (orderDetails) => {
    // orderDetails akan berisi: { productName, price, quantity, ...detail lain jika perlu }
    if (!orderDetails || !orderDetails.productName || !orderDetails.price || !orderDetails.quantity) {
      console.error("Order details are incomplete.", orderDetails);
      alert("Detail pesanan tidak lengkap.");
      return;
    }

    try {
      // Panggil backend Laravel Anda
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/payment/create`, {
        product_name: orderDetails.productName,
        price: orderDetails.price,
        quantity: orderDetails.quantity,
      });

      const { snap_token } = response.data;

      if (snap_token) {
        window.snap.pay(snap_token, {
          onSuccess: (result) => {
            console.log('Payment Success:', result);
            alert('Pembayaran Berhasil!');
            // TODO: Arahkan ke halaman sukses atau update UI
          },
          onPending: (result) => {
            console.log('Payment Pending:', result);
            alert('Menunggu Pembayaran!');
            // TODO: Arahkan ke halaman status pesanan
          },
          onError: (result) => {
            console.log('Payment Error:', result);
            alert('Pembayaran Gagal!');
          },
          onClose: () => {
            console.log('Pop-up pembayaran ditutup oleh pengguna.');
          }
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert('Gagal terhubung ke server pembayaran.');
    }
  }, []);

  return (
    <PaymentContext.Provider value={{ handlePay }}>
      {children}
    </PaymentContext.Provider>
  );
};