import { updateProfile } from "@/services/profile.service";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Information ({ profile }) {

    console.log(profile);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const [editingField, setEditingField] = useState(null); // "name" | "bio" | null
    const [loading, setLoading] = useState(false);

    const handleUpdateorSave = (field) => {
        if (editingField === field) {
            handleSave(field);
        } else {
            setEditingField(field);
        }
    }

    const handleSave = async (field) => {
        try {
            setLoading(true);
            const updates = {
                [field]: field === "name" ? name : bio
            };
            const data = await updateProfile(updates, profile?.id);
            if (!data.ok) return toast.error(data.message);
                setEditingField(null)
                toast.success('Se actualizó con éxito');
        } catch (error) {
            console.error(error);
            toast.error('Error', { description: `Hubo un error: ${error.message}` })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (profile) {
            setName(profile?.name)
            setBio(profile?.bio)
        }
    }, [profile])

    return (
        <div className="w-full bg-white border rounded-md p-md">
            <h3 className="text-sm mb-md">Información de la página</h3>
            <div className="w-full flex flex-col gap-md">
                <div className="relative">
                    <input type="text" name="name" id="name" className="input" placeholder="Nombre de la página" value={name} onChange={(e) => setName(e.target.value)} disabled={editingField !== "name"} />
                    <button className="absolute center w h bg-background" style={{"--w": "50opx", "--mnw": "50px", "--h": "50px", top: 0, right: 0}} onClick={() => handleUpdateorSave('name')}>
                        {loading && editingField === "name" ? <Loader2/> : editingField === "name" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
                <div className="relative">
                    <input type="text" name="name" id="name" className="input" placeholder="Bio de la página" value={bio} onChange={(e) => setBio(e.target.value)} disabled={editingField !== "bio"} />
                    <button className="absolute center w h bg-background" style={{"--w": "50opx", "--mnw": "50px", "--h": "50px", top: 0, right: 0}} onClick={() => handleUpdateorSave('bio')}>
                        {loading && editingField === "bio" ? <Loader2/> : editingField === "bio" ? <IconCheck /> : <IconPencil />}
                    </button>
                </div>
            </div>
        </div>
    )
}