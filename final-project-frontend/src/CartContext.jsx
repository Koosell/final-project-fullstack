import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a custom hook for easy access
export const useCart = () => useContext(CartContext);

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    // Function to fetch both user and cart data
    const fetchData = async (currentToken) => {
        if (!currentToken) {
            setCart(null);
            setUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            // Use Promise.all to fetch data in parallel for better performance
            const [userResponse, cartResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/user', { headers: { 'Authorization': `Bearer ${currentToken}` } }),
                axios.get('http://127.0.0.1:8000/api/cart', { headers: { 'Authorization': `Bearer ${currentToken}` } })
            ]);
            setUser(userResponse.data);
            setCart(cartResponse.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            if (error.response && error.response.status === 401) {
                // If token is invalid, log the user out
                logout();
            } else {
                setUser(null);
                setCart(null);
            }
        } finally {
            setLoading(false);
        }
    };

    // This effect runs whenever the 'token' state changes
    useEffect(() => {
        fetchData(token);
    }, [token]);

    // Centralized login function
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken); // Updating the state will trigger the useEffect above
    };

    // Centralized logout function
    const logout = () => {
        const currentToken = localStorage.getItem('token');
        if (currentToken) {
            axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: { 'Authorization': `Bearer ${currentToken}` }
            }).catch(err => console.error("Server logout failed:", err));
        }
        localStorage.removeItem('token');
        setToken(null);
    };
    
    // Function to add an item to the cart
    const addToCart = async (itemId, itemType) => {
        if (!token) {
            return { success: false, message: 'Harus login.' };
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/cart/add', 
                { item_id: itemId, item_type: itemType, quantity: 1 },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            await fetchData(token); // Refetch all data after adding an item
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Gagal menambah item.' };
        }
    };

    // The values provided to the rest of the app
    const value = {
        cart,
        loading,
        token,
        user,
        login,
        logout,
        addToCart,
        fetchCart: () => fetchData(token),
        itemCount: cart?.cart_items?.length || 0,
        totalPrice: cart?.total_amount || 0,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
