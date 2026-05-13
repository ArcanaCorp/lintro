import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import Link from "next/link";
import { useState } from "react";

export default function Mobile ({ profile }) {
    
    const [ view, setView ] = useState('links');

    return (
        <div className="none lg:block w h bg-white border rounded-lg p-lg lg:flex lg:flex-col lg:gap-md" style={{"--w": "350px", "--mnw": "350px", "--h": "calc(100dvh - 80px)"}}>
            <section className="w-full py-md">
                <picture className="block w h m-auto bg-neutro rounded-full border" style={{"--w": "160px", "--mnw": "160px", "--h": "160px"}}>
                    <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.name || 'Mi+Lintro'}`} alt={`Foto de perfil de ${profile?.name}`} className="w-full h-full rounded-full" />
                </picture>
                <h2 className="text-center" aria-label={profile?.name}>{profile?.name}</h2>
                <p className="text-center text-xs text-muted">{profile?.bio}</p>
            </section>
            {profile?.social_links.length > 0 && (
                <ul className="flex flex-wrap gap-md items-center justify-center">
                    {SOCIAL_OPTIONS.map((social, idx) => (
                        <li key={idx} className="w h center" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                            <Link href={`https://facebook.com`} target="_blank" aria-label={`Cuenta de ${social.value} de ${profile?.name}`}>{social.icon}</Link>
                        </li>
                    ))}
                </ul>
            )}
            {profile?.products.length > 0 && (
                <ul className="flex items-center justify-center">
                    <button className={`btn btn-sm ${view === 'links' ? 'btn-primary' : ''}`} onClick={() => setView('links')}>Links</button>
                    <button className={`btn btn-sm ${view === 'shop' ? 'btn-primary': ''}`} onClick={() => setView('shop')}>Tienda</button>
                </ul>
            )}
            {view === 'links' && (
                <ul className="w-full py-md">
                    {profile?.links.map((item) => (
                        <li key={item.id} className="w-full">
                            <Link className="btn" href={`${item.url}/?utm_source=lintro`} target="_blank"><span>{item.title}</span></Link>
                        </li>
                    ))}
                </ul>
            )}
            {view === 'shop' && (
                <ul className="w-full py-md grid grid-2">
                    {profile?.products.map((itm) => (
                        <li key={itm.id} className="w-full">
                            <div></div>
                            <div>
                                <h4>{itm.title}</h4>
                                <p>S/. {(itm.price).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}