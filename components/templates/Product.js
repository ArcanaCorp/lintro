'use client';

import { useCart } from "@/context/CartContext";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";

export default function Product ({ item, profile }) {

    const { cart, addToCart, increaseQuantity, decreaseQuantity, removeItemCart } = useCart();

    const itemFind = cart.find((c) => c.id === item.id);

    return (
        <li className="w-full flex rounded-md overflow-hidden" style={{"background": profile?.theme?.bg}}>
            <div className="relative w-full h-full">
                <Image src={item.image_url ? item.image_url : `/placeholder.png`} fill alt={`${item.title} - ${item.description}`} />
            </div>
            <div className="w-full p-md flex flex-col gap-sm">
                <h4>{item.title}</h4>
                <p className="text-xs text-muted my-sm">{item.description}</p>
                <p>S/. {(item.price).toFixed(2)}</p>
                {itemFind ? (
                    <div className="w-full flex items-center justify-between">
                        <div className="flex gap-xs">
                            {itemFind.amount > 1 ? (
                                <button className="w h center rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px",background: profile?.theme.surface, color:profile?.theme?.text}} onClick={() => decreaseQuantity(item.id)}><IconMinus/></button>
                            ) : (
                                <button className="w h center rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px", background: profile?.theme.surface, color:profile?.theme?.text}} onClick={() => removeItemCart(item.id)}><IconTrash/></button>
                            )}
                            <div className="w h center rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px",background: profile?.theme.surface, color:profile?.theme?.text}}>{itemFind.amount}</div>
                            <button className="w h center rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px",background: profile?.theme.surface, color:profile?.theme?.text}} onClick={() => increaseQuantity(item.id)}><IconPlus/></button>
                        </div>
                    </div>
                ) : (   
                    <button className="w-full text-xs py-md rounded-md" style={{background: profile?.theme.surface, color:profile?.theme?.text}} onClick={() => addToCart(item)}>Agregar al carrito</button>
                )}
            </div>
        </li>
    )
}