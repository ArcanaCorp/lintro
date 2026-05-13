'use client';

import { useAuth } from "@/context/AuthContext";
import { getProducts } from "@/services/products.service";
import { useCallback, useEffect, useState } from "react";

export const useProducts = () => {

    const { user } = useAuth();

    const [ products, setProducts ] = useState([]);
    const [ loadingProducts, setLoadingProducts ] = useState(true);

    const fetchProducts = useCallback(async () => {
        if (!user?.id) return;
        try {
            const data = await getProducts(user?.id);
            setProducts(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProducts(false);
        }
    }, [user])

    const addProduct = (newProduct) => setProducts(prev => [newProduct, ...prev]);
    const updateProduct = (updateProduct) => setProducts(prev => prev.map(p => p.id === updateProduct.id ? updateProduct : p));
    const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

    useEffect(() => {
        if (!user?.id) return;
        fetchProducts();
    }, [ user, fetchProducts ]);

    return {
        products,
        loadingProducts,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    }

}