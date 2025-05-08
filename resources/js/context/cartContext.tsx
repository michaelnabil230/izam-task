import { App } from '@/types';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface CartContextProps {
    cart: App.Models.Cart[];
    addToCart: (product: App.Models.Product) => void;
    minisToCart: (id: number) => void;
    findProduct: (id: number) => App.Models.Cart | undefined;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, newQuantity: number) => void;
    clearCart: () => void;
    getSubtotal: () => number;
    getShipping: () => number;
    getTax: () => number;
    getTotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within an CartProvider');
    }

    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<App.Models.Cart[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: App.Models.Product) => {
        const existingItem = findProduct(product.id);
        if (existingItem) {
            setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const findProduct = (id: number) => {
        return cart.find((item) => item.id === id);
    };

    const minisToCart = (id: number) => {
        const existingItem = findProduct(id);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)));
            } else {
                removeFromCart(id);
            }
        }
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getSubtotal = () => {
        return cart.reduce((total, product) => {
            const quantity = product.quantity || 0;
            return total + product.price * quantity;
        }, 0);
    };

    const getShipping = () => {
        return getSubtotal() > 0 ? 10 : 0;
    };

    const getTax = () => {
        return getSubtotal() * 0.1; // 10% tax
    };

    const getTotal = () => {
        return getSubtotal() + getShipping() + getTax();
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                minisToCart,
                findProduct,
                removeFromCart,
                updateQuantity,
                clearCart,
                getSubtotal,
                getShipping,
                getTax,
                getTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
