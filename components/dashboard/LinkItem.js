import { deleteLink } from "@/services/links.service";
import { IconEye, IconEyeClosed, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LinkItem ({ link, onDelete }) {

    const [ form, setForm ] = useState({
        title: '',
        url: '',
        view: false
    });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const toogleVisibility = () => setForm(prev => ({...prev, view: prev.view}));

    const handleDelete = async () => {
        try {
            await deleteLink(link.id)
            onDelete(link.id)
            toast.success('Se eliminó con éxito el link')
        } catch (error) {
            console.error(error);
            toast.error(`Hubo un error al eliminar el link`)
        }
    }

    const onSave = async () => {}

    useEffect(() => {
        if (link) {
            setForm({
                title: link.title,
                url: link.url,
                view: link.view
            })
        }
    }, [link]);

    return (
        <div className="w-full bg-white border rounded-md p-md flex flex-col gap-md">
            <div className="w-full">
                <label className="block mb-md text-xs text-gray uppercase fw-medium">Titulo</label>
                <input type="text" name="title" className="input" value={form.title} placeholder="Ingresa el titulo" onChange={handleChange}/>
            </div>
            <div className="w-full">
                <label className="block mb-md text-xs text-gray uppercase fw-medium">Enlace</label>
                <input type="text" name="link" className="input" placeholder="Ingresa el enlace" value={form.url} onChange={handleChange} />
            </div>
            <div className="w-full flex items-center gap-sm justify-end">
                <button className="center px-md h rounded-md bg-primary text-accent text-medium" style={{"--h": "40px"}} onClick={onSave}>{loading ? 'Guardando...' : 'Guardar'}</button>
                <button className="center w h rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={() => handleDelete(link.id)}><IconTrash/></button>
                <button className="center w h rounded-md" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={toogleVisibility}>{form.view ? <IconEye/> : <IconEyeClosed/>}</button>
            </div>
        </div>
    )
}