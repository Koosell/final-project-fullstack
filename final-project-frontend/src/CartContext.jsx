import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setCart(null);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cart', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCart(response.data);
        } catch (error) {
            console.error("Gagal mengambil keranjang:", error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (itemId, itemType) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Context tidak lagi mengarahkan halaman, hanya mengembalikan status.
            return { success: false, message: 'Harus login.' };
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/cart/add', 
                { item_id: itemId, item_type: itemType, quantity: 1 },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            await fetchCart();
            return { success: true };
        } catch (error) {
            console.error("Gagal menambah ke keranjang:", error);
            return { success: false, message: 'Gagal menambah item.' };
        }
    };

    const value = {
        cart,
        loading,
        fetchCart,
        addToCart,
        itemCount: cart?.cart_items?.length || 0,
        totalPrice: cart?.total_amount || 0,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
