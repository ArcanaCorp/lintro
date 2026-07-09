import Image from "next/image";

export default function ProductCart ({ item }) {
    return (
        <li className="w-full flex gap-sm">
            <div className="relative w h rounded-md bg-neutro" style={{"--w": "100px", "--h": "100px"}}>
                <Image src={item.image_url ? item.image_url : `/placeholder.png`} width={100} height={100} alt={`${item?.title} - ${item?.description}`} />
            </div>
            <div className="flex flex-col gap-xs">
                <h4>{item?.title}</h4>
                <p className="text-sm text-gray">Precio: <b>s/. {(item?.price).toFixed(2)}</b></p>
                <p className="text-sm text-gray">Cantidad: <b>{item?.amount}</b></p>
                <p className="text-sm text-gray">Subtotal: <b>s/. {(item?.price * item?.amount).toFixed(2)}</b></p>
            </div>
        </li>
    )
}