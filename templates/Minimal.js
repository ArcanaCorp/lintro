'use client';

import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import BaseLayout from "./BaseLayout";
import { useState } from "react";
import { IconShare3 } from "@tabler/icons-react";
import Link from "next/link";
import SocialLinks from "@/components/templates/SocialLinks";
import { toast } from "sonner";

export default function Minimal ({ profile }) {

    const [ view, setView ] = useState('links');

    const handleShare = async () => {

        const shareData = {
            title: profile?.name || 'Mi Lintro',
            text: profile?.bio || 'Mira mi perfil',
            url: window.location.href
        };

        try {

            // API nativa del navegador
            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                // Fallback desktop viejo
                await navigator.clipboard.writeText(window.location.href);

                toast.success('Se copió el link al portapapeles');

            }

        } catch (error) {

            console.error('Error sharing:', error);

        }
    };

    return (
        <BaseLayout theme={profile?.theme}>
            <div className={`relative w-full m-auto p-md flex flex-col gap-lg md:rounded-lg lg:w xl:w`} style={{"--w-lg": "450px", "--mnw-lg": "450px", "--w-xl": "550px", "--mnw-xl": "550px", background: profile?.theme?.surface, border: profile?.theme?.border, borderRadius: profile?.theme.radius}}>
                <div className="w-full flex items-center justify-end">
                    <button className="center w h rounded-full" style={{"--w": "50px", "--mnw": "50px", "--h": "50px", background: profile?.theme?.bg}} onClick={handleShare}><IconShare3 color={profile?.theme?.text}/></button>
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
                {profile?.products?.length > 0 && (
                    <ul className="w m-auto flex items-center justify-center gap-xs" style={{"--mxw": "60%"}}>
                        <button className={`btn btn-sm ${view === 'links' ? 'btn-primary' : ''}`} onClick={() => setView('links')}>Links</button>
                        <button className={`btn btn-sm ${view === 'shop' ? 'btn-primary': ''}`} onClick={() => setView('shop')}>Tienda</button>
                    </ul>
                )}
                {view === 'links' && (
                    <ul className="w-full flex flex-col gap-md">
                        {profile?.links?.map((item) => (
                            <li key={item.id} className="w-full">
                                <Link className="btn" href={`${item.url}/?utm_source=lintro`} target="_blank"><span>{item.title}</span></Link>
                            </li>
                        ))}
                    </ul>
                )}
                {view === 'shop' && (
                    <ul className="w-full grid grid-2 gap-md">
                        {profile?.products?.map((item) => (
                            <li key={item.id} className="w-full rounded-md overflow-hidden" style={{"background": profile?.theme?.bg}}>
                                <div className="w-full h lg:h" style={{"--h": "160px", "--h-lg": "180px"}}>
                                    <img src={item.image_url ? item.image_url : `https://ui-avatars.com/api/?name=${item?.title}&background=06f988&color=00351e&bold`} style={{objectFit: 'cover'}} />
                                </div>
                                <div className="w-full p-md">
                                    <h4>{item.title}</h4>
                                    <p className="text-xs text-muted">{item.description}</p>
                                    <p>S/. {(item.price).toFixed(2)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="flex items-center justify-center gap-xs text-xs py-md" style={{color: profile?.theme?.text}}><Link href={'/'} style={{color: profile?.theme?.text}}>Cookie Preferences</Link> • <Link href={'/'} style={{color: profile?.theme?.text}}>Report</Link> • <Link href={'/'} style={{color: profile?.theme?.text}}>Privacy</Link> • <Link href={'/'} style={{color: profile?.theme?.text}}>Explore</Link></p>
            </div>
        </BaseLayout>
    )
}