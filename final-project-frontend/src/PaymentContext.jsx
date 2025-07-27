import React, { createContext, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Ganti dengan Client Key Midtrans Anda
const MIDTRANS_CLIENT_KEY = "Mid-client-KsjpTd5dvf67ANe0"; 

const PaymentContext = createContext();

export const usePayment = () => {
    return useContext(PaymentContext);
};

export const PaymentProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePay = useCallback(async (orderDetails, callbacks) => {
        // --- PERBAIKAN DIMULAI DI SINI ---

        // 1. Ambil token dari localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Sesi Anda telah berakhir. Silakan login kembali.");
            // Arahkan ke halaman login jika perlu
            // navigate('/login'); 
            return;
        }

        const isCartCheckout = !!orderDetails.items; 

        const url = isCartCheckout 
            ? `${apiUrl}/api/payment/create` 
            : `${apiUrl}/api/payment/create-topup`;

        const payload = isCartCheckout
            ? { total_price: orderDetails.totalPrice, items: orderDetails.items }
            : { product_name: orderDetails.productName, price: orderDetails.price, quantity: orderDetails.quantity };
        
        try {
            // 2. Tambahkan header Authorization ke permintaan axios
            const response = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
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
            if (error.response && error.response.status === 401) {
                alert("Otentikasi gagal. Silakan login kembali.");
            } else if (error.response && error.response.status === 422) {
                console.error("Validation Error:", error.response.data.errors);
                alert("Data yang dikirim tidak lengkap atau tidak valid.");
            } else {
                console.error("Payment error:", error);
            }
        }
    }, [apiUrl]);


    return (
        <PaymentContext.Provider value={{ handlePay }}>
            {children}
        </PaymentContext.Provider>
    );
};
