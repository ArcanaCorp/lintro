export const messageToWhatsapp = (cart, totalPrice) => {
        if (cart.length === 0) return;

        const productsMessage = cart
            .map((item, index) => {
                const subtotal = Number(item.price) * item.amount;

                return `${index + 1}. *${item.title}*
Cantidad: ${item.amount}
Precio: S/. ${Number(item.price).toFixed(2)}
Subtotal: S/. ${subtotal.toFixed(2)}`;
            })
            .join("\n\n");

        const message = `🛒 *NUEVO PEDIDO*

Hola 👋, quiero realizar el siguiente pedido:

${productsMessage}

━━━━━━━━━━━━━━
💰 *TOTAL: S/. ${totalPrice.toFixed(2)}*
━━━━━━━━━━━━━━

Quedo atento(a) para coordinar el pago y la entrega.`;
    return message;
};