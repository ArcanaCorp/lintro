'use client';
import { useAuth } from "@/context/AuthContext";
import { useDB } from "@/context/DBContext";
import { createProduct } from "@/services/products.service";
import { IconCamera } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormCreateProduct ({ closed }) {

    const { addProduct } = useDB();

    const { user } = useAuth();
    const [ form, setForm ] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
    });

    const [ imagePrev, setImagePrev ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const localUrl = URL.createObjectURL(file);
        setImagePrev(localUrl);
        setForm(prev => ({ ...prev, image: file }))
    }

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.stock) return toast.warning('Completa los campos obligatorios: nombre, precio y stock')
        try {
            setLoading(true);
            const data = await createProduct(user?.id, form);
            addProduct(data);
            toast.success('Producto añadido correctamente');
            setForm({
                name: '',
                description: '',
                price: '',
                stock: '',
                image: null
            });
            setImagePrev('');
            closed();
        } catch (error) {
            console.error(error);
            toast.error(`Hubo un error inesperado: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex flex-col gap-sm">
            <div className="w-full">
                <label id="imageProduct" className="center w-full h rounded-md bg-background overflow-hidden" style={{"--h": "180px", cursor: 'pointer'}}>
                    {imagePrev === '' ? (<IconCamera/>) : ( <img src={imagePrev} className="w-inherit h-inherit" style={{objectFit: 'cover'}} /> )}
                    <input type="file" name="imageProduct" id="imageProduct" accept="image/*" hidden onChange={handleChangeFile} />
                </label>
            </div>
            <div className="w-full">
                <label htmlFor="name_P" className="block mb-sm text-xs text-muted">Ingresa el nombre del producto</label>
                <input type="text" className="input" name="name" id="name_P" placeholder="Ej. Caja de chocolates" value={form.name} onChange={handleChange} />
            </div>
            <div className="w-full">
                <label htmlFor="text_P" className="block mb-sm text-xs text-muted">Ingresa una descripción corta del producto</label>
                <textarea className="textarea" name="description" id="text_P" placeholder="Ej. Caja de chocolate sublime de 12 unidades" value={form.description} onChange={handleChange}/>
            </div>
            <div className="w-full flex gap-sm">
                <div className="w-full">
                    <label htmlFor="price_P" className="block mb-sm text-xs text-muted">Ingresa el precio del producto</label>
                    <input type="number" inputMode="decimal" className="input" name="price" id="price_P" placeholder="Ej. 12.00" value={form.price} onChange={handleChange} />
                </div>
                <div className="w-full">
                    <label htmlFor="stock_P" className="block mb-sm text-xs text-muted">Ingresa el stock del producto</label>
                    <input type="number" inputMode="numeric" className="input" name="stock" id="stock_P" placeholder="Ej. 2" value={form.stock} onChange={handleChange} />
                </div>
            </div>
            <div className="w-full">
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? 'Añadiendo...' : 'Añadir producto'}</button>
            </div>
        </div>
    )
}