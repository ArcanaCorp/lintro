'use client';

import { useEffect, useState } from "react";
import LinkItem from "./LinkItem";
import { deleteLink, getLinks, saveLinks } from "@/services/links.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Links () {

    const { user } = useAuth();

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // 🔥 CARGAR LINKS DESDE DB
    useEffect(() => {
        const fetchLinks = async () => {
            if (!user) return;

            const data = await getLinks(user.id);

            const formatted = data.map(link => ({
                id: link.id,
                title: link.title || "",
                url: link.url || "",
                view: link.is_visible
            }));

            setLinks(formatted);
            setLoading(false);
        };

        fetchLinks();
    }, [user]);

    // ➕ AGREGAR LINK
    const addLink = () => {
        setLinks([
            ...links,
            { id: Date.now(), title: "", url: "", view: true }
        ]);
    };

    // ❌ ELIMINAR LINK
    const removeLink = async (id) => setLinks(links.filter(link => link.id !== id));

    // ✏️ ACTUALIZAR
    const updateLink = (id, field, value) => {
        setLinks(links.map(link =>
            link.id === id ? { ...link, [field]: value } : link
        ));
    };

    // 👁️ VISIBILIDAD
    const viewLink = (id) => {
        setLinks(links.map(link =>
            link.id === id ? { ...link, view: !link.view } : link
        ));
    };

    // 💾 GUARDAR TODO
    const handleSave = async () => {
        try {
            setSaving(true);
            await saveLinks(user.id, links);
            setSaving(false);
            toast.success('Se guardaron los cambios correctamente.')
        } catch (error) {
            console.error(error);
            toast.error(`Hubo un error interno: ${error.message}`)
        }
    };

    if (loading) {
        return <p className="text-center">Cargando links...</p>;
    }

    return (
        <>
            <div className="w-full my-xl">
                <div className="w m-auto flex items-center justify-between" style={{"--w": "90%"}}>
                    <h2>Links</h2>
                    <div className="flex gap-xs">
                        <button className="btn btn-sm btn-primary" style={{width: "auto"}} onClick={addLink}>Agregar</button>
                    </div>
                </div>
            </div>
        
            <section className="w-full">
                <div className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                    {links.length === 0 && (<p className="text-center text-sm text-gray">No tienes links aún</p>)}
                    {links.map((link) => (
                        <LinkItem key={link.id} link={link} onSave={handleSave} onChange={updateLink} onDelete={removeLink} onView={viewLink} />
                    ))}
                </div>
            </section>
        </>
    )
}