'use client';

import { useAuth } from "@/context/AuthContext";
import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import { getSocials } from "@/services/socials.service";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Socials () {

    const { user } = useAuth();

    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSocial = async () => {
            if (!user) return;
            try {
                const data = await getSocials(user?.id);
                setSocials(
                    data.map(item => ({
                        id: item.id,
                        platform: item.platform,
                        url: item.url,
                        editing: false
                    }))
                )
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSocial();
    }, [user])

    const addSocial = () => {
        setSocials([
            ...socials,
            {
                id: Date.now(),
                platform: "instagram",
                url: "",
                editing: true
            }
        ]);
    };

    const updateSocial = (id, field, value) => {
        setSocials(socials.map(s =>
            s.id === id ? { ...s, [field]: value } : s
        ));
    };

    // 💾 guardar uno
    const saveSocial = async (social) => {
        const saved = await saveSocials(user.id, [social]);

        if (saved) {
            setSocials(socials.map(s =>
                s.id === social.id
                    ? { ...saved[0], editing: false }
                    : s
            ));
        }
    };

    // ❌ eliminar
    const removeSocial = async (id) => {
        setSocials(socials.filter(s => s.id !== id));

        if (typeof id !== "number") {
            await deleteSocial(id);
        }
    };

    if (loading) return <Skeleton/>

    return (
        <div className="w-full bg-white border rounded-md p-md flex flex-col gap-md">
            <h3 className="text-sm mb-md">Redes sociales</h3>
            <div className="w-full flex flex-col gap-md">
                {socials.map((social) => (
                    <div key={social.id} className="flex gap-sm items-center">
                        <select className="input" value={social.platform} disabled={!social.editing} onChange={(e) => updateSocial(social.id, "platform", e.target.value)}>
                            <option value={''} hidden>Red social</option>
                            {SOCIAL_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <input className="input" placeholder="https://..." value={social.url} disabled={!social.editing} onChange={(e) => updateSocial(social.id, "url", e.target.value)}/>
                        {social.editing && ( <button className="center w h rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><IconCheck/></button> )}
                        <button className="center w h rounded-md" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}><IconTrash/></button>
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-md">
                <button className="btn btn-primary" onClick={addSocial}>Agregar redes sociales</button>
            </div>
        </div>
    )
}