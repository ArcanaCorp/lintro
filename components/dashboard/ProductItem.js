import { IconTrash } from "@tabler/icons-react";
import Switch from "../UI/Switch";

export default function ProductItem ({ product }) {
    return (
        <li className="w-full bg-white rounded-md p-md flex gap-md">
            <picture className="block w h rounded-md overflow-hidden bg-background" style={{"--w": "120px", "--mnw": "120px", "--h": "120px"}}>
                <img src={product?.image_url ? product?.image_url : `https://ui-avatars.com/api/?name=${product?.title}&background=06f988&color=00351e&bold`} className="w-inherit h-inherit" alt={`Foto del producto ${product.title} - ${product.description}`} />
            </picture>
            <div className="w-full flex flex-col justify-between">
                <div className="w-full">
                    <h3>{product?.title}</h3>
                    <p className="text-sm text-muted">{product?.description}</p>
                    <p className="flex items-center text-sm gap-md"><span>S/. {(product?.price).toFixed(2)}</span> - <span>{product?.stock} unidades</span></p>
                </div>
                <div className="w-full flex items-center justify-end gap-xs">
                    <Switch active={product?.is_active} />
                    <button className="center w h rounded-sm bg-background" style={{"--w": "35px", "--mnw": "35px", "--h": "35px"}}><IconTrash/></button>
                </div>
            </div>
        </li>
    )
}