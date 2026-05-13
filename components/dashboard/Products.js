import { useDB } from "@/context/DBContext"
import ProductItem from "./ProductItem";

export default function Products () {

    const { products } = useDB();

    console.log(products);

    return (
        products.length > 0 && (
            <ul className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                {products.map((p) => (
                    <ProductItem key={p.id} product={p} />
                ))}
            </ul>
        )
    )

}