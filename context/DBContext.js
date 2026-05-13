'use client';

import { useProducts } from "@/hooks/useProducts";
import { createContext, useContext } from "react";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const products = useProducts();

    const refreshAll = async () => {
        await Promise.all([
            products.fetchProducts(),
        ])
    }

    const contextValue = {
        products: products.products,
        addProduct: products.addProduct,
        updateProduct: products.updateProduct,
        deleteProduct: products.deleteProduct
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext);