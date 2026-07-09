'use client';
import BaseLayout from "./BaseLayout";
import Header from "@/components/templates/Header";
import { IconShoppingBag } from "@tabler/icons-react";
import Product from "@/components/templates/Product";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ShoppingModal from "@/components/UI/Modals/ShoppingModal";

export default function Store ({ profile }) {

    const { cart } = useCart();
    const [ view, setView ] = useState(false)

    const toggleModal = () => setView(!view);

    return (
        <BaseLayout theme={profile?.theme}>
            <div className={`relative w-full h-screen m-auto p-md flex flex-col scroll gap-lg md:rounded-lg lg:w xl:w lg:rounded lg:h-auto lg:no-scroll`} style={{"--w-lg": "450px", "--mnw-lg": "450px", "--w-xl": "550px", "--mnw-xl": "550px", "--rounded-lg": `${profile?.theme.radius}px`, background: profile?.theme?.surface, border: profile?.theme?.border}}>
                <Header profile={profile} />
                <ul className="w-full grid grid-1 gap-md">
                    {profile?.products?.length > 0 ? (
                        profile?.products?.map((item) => (
                            <Product key={item.id} item={item} profile={profile}/>
                        ))
                    ) : (
                        <p className="text-center">No hay productos disponibles aún</p>
                    )}
                </ul>
                {cart.length > 0 && (
                    <button className="absolute rounded-full px-md py-sm flex items-center gap-sm" style={{background: profile?.theme?.bg,color: profile?.theme?.text}} onClick={toggleModal}><IconShoppingBag/> Ver carrito <span className="center w h rounded-full bg-white text-dark" style={{"--w": "20px", "--mnw": "20px", "--h": "20px"}}>{cart.length}</span></button>
                )}
                {view && <ShoppingModal profile={profile} close={toggleModal}/>}
            </div>
        </BaseLayout>
    )
}