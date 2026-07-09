'use client'
import { IconShare3 } from "@tabler/icons-react";
import { toast } from "sonner";
import SocialLinks from "./SocialLinks";

export default function Header ({ profile }) {

    const handleShare = async () => {

        try {

            const shareData = {
                title: profile?.name || 'Mi Lintro',
                text: profile?.bio || 'Mira mi perfil',
                url: window.location.href
            };
            // API nativa del navegador
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Se copió el link al portapapeles');
            }

        } catch (error) {

            console.error('Error sharing:', error);

        }
    };

    return (
        <>
            <div className="w-full flex items-center justify-end">
                <button className="center w h rounded-full bg-neutro" style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}} onClick={handleShare}><IconShare3 color={profile?.theme?.text}/></button>
            </div>
            <section className="w-full flex flex-col gap-md">
                <picture className="block w h m-auto bg-neutro rounded-full" style={{"--w": "160px", "--mnw": "160px", "--h": "160px", border: profile?.theme?.border}}>
                    <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.name || 'Mi+Lintro'}`} alt={`Foto de perfil de ${profile?.name}`} className="w-full h-full rounded-full" />
                </picture>
                <h2 className="text-center" aria-label={profile?.name}>{profile?.name}</h2>
                <p className="text-center text-xs text-muted">{profile?.bio}</p>
            </section>
            {profile?.social_links?.length > 0 && (
                <ul className="flex flex-wrap gap-md items-center justify-center">
                    {profile?.social_links.map((link) => ( 
                        <SocialLinks key={link.id} link={link} profile={profile} />
                    ))}
                </ul>
            )}
        </>
    )
}