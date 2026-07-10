'use client';

import { IconX } from "@tabler/icons-react";
import ButtonIcon from "../Buttons/ButtonIcon";
import { useCart } from "@/context/CartContext";
import ProductCart from "../Cards/ProductCart";
import { messageToWhatsapp } from "@/utils/message-cart";
import { useAnalytics } from "@/context/AnalyticsContext";

export default function ShoppingModal ({ profile, close }) {
    
    const { cart, totalPrice } = useCart();
    const { trackCheckout } = useAnalytics();

    const sendOrderToWhatsApp = () => {
        if (cart.length === 0) return;

        trackCheckout(cart, totalPrice);

        const whatsappNumber = profile?.whatsapp;

        if (!whatsappNumber) return console.error("No se ha configurado un número de WhatsApp");

        const message = messageToWhatsapp(cart, totalPrice);

        const whatsappUrl = `https://wa.me/51${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");
    }

    return (
        <div className="fixed inset w-screen h-screen center bg-overlay">
            <div className="w m-auto bg-white p-md rounded-md lg:w" style={{"--w": "90%", "--w-lg": "60%"}}>
                <div className="w-full flex items-center justify-between">
                    <h3>Carrito de compras</h3>
                    <ButtonIcon size={45} click={close}><IconX/></ButtonIcon>
                </div>
                <div className="w-full flex flex-col gap-md py-md">
                    {cart.map((item) => (
                        <ProductCart key={item.id} item={item} profile={profile} />
                    ))}
                    <li className="w-full flex gap-sm">
                        <div className="relative w h rounded-md" style={{"--w": "100px"}}></div>
                        <div>
                            <p>Total del pedido: <b>s/. {totalPrice.toFixed(2)}</b></p>
                        </div>
                    </li>
                    <button className="btn btn-primary" onClick={sendOrderToWhatsApp}>Realizar pedido</button>
                </div>
            </div>
        </div>
    )
}