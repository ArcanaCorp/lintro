'use client';

import { useAuth } from "@/context/AuthContext";
import { uploadAvatar } from "@/services/profile.service";
import { IconCamera } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Photo ({ profile }) {

    const { setProfile } = useAuth();

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 🔥 Preview inmediato
        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);

        setLoading(true);

        const url = await uploadAvatar(profile.id, file);

        setLoading(false);

        if (url) {
            setProfile(prev => ({
                ...prev,
                avatar_url: url
            }));
        }

        toast.success('Se actualizó la foto de perfil')

    };

    useEffect(() => {
        if (profile) {
            setPreview(profile?.avatar_url)
        }
    }, [profile])

    return (
        <div className="w-full bg-white border rounded-md p-md">
            <label htmlFor="picture-bussines" className="relative block w h m-auto rounded-full bg-background" style={{"--w": "180px", "--mnw": "180px", "--h": "180px"}}>
                {preview && (
                    <img src={preview} alt="avatar" className="w-full h-full object-cover rounded-full"/>
                )}
                <div className="absolute center w h bg-white rounded-full border" style={{"--w": "60px", "--mnw": "60px", "--h": "60px", bottom: 0, right: 0}}>
                    <IconCamera/>
                </div>
                <input type="file" id="picture-bussines" name="picture-bussines" hidden accept="image/*" onChange={handleChange}/>
            </label>
            {loading && (<p className="text-xs mt-2 text-center">Subiendo...</p>)}
        </div>
    )
}