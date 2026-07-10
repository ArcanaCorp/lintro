'use client';
import BaseLayout from "./BaseLayout";
import Header from "@/components/templates/Header";
import { IconSearch, IconShoppingBag } from "@tabler/icons-react";
import Product from "@/components/templates/Product";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useState } from "react";
import ShoppingModal from "@/components/UI/Modals/ShoppingModal";
import ButtonIcon from "@/components/UI/Buttons/ButtonIcon";
import { useAnalytics } from "@/context/AnalyticsContext";

export default function Store ({ profile }) {

    const { cart, totalItems, totalPrice } = useCart();
    const { trackOpenCart, trackSearch } = useAnalytics();
    const [ view, setView ] = useState(false)
    const [ search, setSearch ] = useState("");

    const toggleModal = () => {
        if (!view) {
            trackOpenCart(totalPrice, totalItems);
        }
        setView((prev) => !prev);
    }

    const normalizeText = (text = "") => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    const filteredProducts = useMemo(() => {
        const products = profile?.products ?? [];
        const term = normalizeText(search);

        if (!term) {
            return products;
        }

        return products.filter((product) => {
            const searchableText = normalizeText(`
                ${product.title ?? ""}
                ${product.description ?? ""}
                ${product.extra?.category ?? ""}
                ${product.extra?.brand ?? ""}
            `);

            return searchableText.includes(term);
        });
    }, [profile?.products, search]);

    useEffect(() => {

        const query = search.trim();


        if (query.length < 2) {
            return;
        }


        const timeout = setTimeout(() => {

            trackSearch(
                query,
                filteredProducts.length
            );

        }, 700);


        return () => clearTimeout(timeout);


    }, [search, filteredProducts.length, trackSearch]);

    return (
        <BaseLayout theme={profile?.theme}>
            <div className={`relative w-full m-auto p-md flex flex-col scroll gap-lg md:rounded-lg lg:w xl:w lg:rounded`} style={{"--w-lg": "60%", "--mnw-lg": "60%", "--w-xl": "60%", "--mnw-xl": "60%"}}>
                <Header profile={profile} />
                <div className="w-full">
                    <div className="relative w-full bg-secondary rounded-md">
                        <input type="text" className="w-full h px-md" style={{"--h": "45px", background: "none"}} value={search} placeholder="Buscar productos..." onChange={(e) => setSearch(e.target.value)} />
                        <ButtonIcon size={45} rounded={'full'} style={{"position": "absolute", "top": "0", "right": "0", "color": "#888"}}><IconSearch/></ButtonIcon>
                    </div>
                </div>
                <div className="w-full">
                    {filteredProducts.length > 0 ? (
                        <ul className="w-full grid grid-1 gap-md lg:grid-3">
                            {filteredProducts.map((item) => (
                                <Product key={item.id} item={item} profile={profile}/>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">{search ? `No encontramos productos para "${search}"` : "No hay productos disponibles aún"}</p>
                    )}
                </div>
            </div>
            {cart.length > 0 && (
                <button className="btn-float" onClick={toggleModal}><IconShoppingBag/> Ver carrito <span className="center w h rounded-full bg-white text-dark" style={{"--w": "20px", "--mnw": "20px", "--h": "20px"}}>{cart.length}</span></button>
            )}
            {view && <ShoppingModal profile={profile} close={toggleModal}/>}
        </BaseLayout>
    )
}