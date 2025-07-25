import React, { createContext, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Ganti dengan Client Key Midtrans Anda
const MIDTRANS_CLIENT_KEY = "Mid-client-KsjpTd5dvf67ANe0"; 

const PaymentContext = createContext();

export const usePayment = () => {
    return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
    // Mendefinisikan apiUrl dari environment variable
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const script = document.createElement('script');
        // Gunakan URL produksi Midtrans jika diperlukan, atau atur via environment variable
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePay = useCallback(async (orderDetails, callbacks) => {
        // Cek apakah ini checkout keranjang (ada 'items') atau top-up
        const isCartCheckout = !!orderDetails.items; 

        // PERBAIKAN: Menggunakan apiUrl untuk memilih URL yang benar
        const url = isCartCheckout 
            ? `${apiUrl}/api/payment/create` 
            : `${apiUrl}/api/payment/create-topup`;

        // Menggunakan snake_case agar sesuai dengan backend
        const payload = isCartCheckout
            ? { total_price: orderDetails.totalPrice, items: orderDetails.items }
            : { product_name: orderDetails.productName, price: orderDetails.price, quantity: orderDetails.quantity };
        
        try {
            const response = await axios.post(url, payload);
            const { snap_token } = response.data;

            if (snap_token) {
                window.snap.pay(snap_token, {
                    onSuccess: callbacks?.onSuccess || function(result){ alert('Berhasil!'); },
                    onPending: callbacks?.onPending || function(result){ alert('Pending'); },
                    onError: callbacks?.onError || function(result){ alert('Error!'); },
                    onClose: callbacks?.onClose || function(){ console.log('Pop-up ditutup.'); }
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error("Validation Error:", error.response.data.errors);
                alert("Data yang dikirim tidak lengkap atau tidak valid.");
            } else {
                console.error("Payment error:", error);
            }
        }
    }, [apiUrl]); // Tambahkan apiUrl sebagai dependency


    return (
        <PaymentContext.Provider value={{ handlePay }}>
            {children}
        </PaymentContext.Provider>
    );
};
