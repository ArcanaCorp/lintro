'use client';

import { createContext, useContext, useMemo, useState} from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((product) => product.id === item.id);

            // Si ya existe, aumentamos la cantidad
            if (existingProduct) return prevCart.map((product) => product.id === item.id ? { ...product, amount: product.amount + 1 } : product );

            // Si no existe, lo agregamos con cantidad 1
            return [
                ...prevCart,
                {
                    ...item,
                    amount: 1,
                },
            ];
        });
    };

    const removeItemCart = (id) => setCart((prevCart) => prevCart.filter((product) => product.id !== id));

    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((product) =>
                product.id === id ? {...product, amount: product.amount + 1} : product
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((product) => product.id === id ? { ...product, amount: product.amount - 1 } : product).filter((product) => product.amount > 0)
        );
    };

    const changeQuantity = (id, amount) => {
        const newAmount = Number(amount);
        if (!Number.isInteger(newAmount) || newAmount < 1) return;
        setCart((prevCart) =>
            prevCart.map((product) => product.id === id? { ...product, amount: newAmount } : product)
        );
    };

    const clearCart = () => setCart([]);

    const totalItems = useMemo(() =>
        cart.reduce((total, product) => total + product.amount, 0), [cart]
    );

    const totalPrice = useMemo(() =>
        cart.reduce((total, product) => total + Number(product.price) * product.amount, 0), [cart]
    );

    const contextValue = {
        cart,
        totalItems,
        totalPrice,
        addToCart,
        removeItemCart,
        increaseQuantity,
        decreaseQuantity,
        changeQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe utilizarse dentro de un CartProvider');
    }

    return context;
};