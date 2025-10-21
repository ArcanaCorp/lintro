'use client';

import pagestyle from '@/app/[slug]/styles/page.module.css'
import { users } from '@/db/slug'
import { IconShare3 } from '@tabler/icons-react';
import { use } from 'react';
export default function SlugPage ({ params }) {

    const { slug } = use(params);

    // Buscar el usuario correspondiente
    const user = users.find(u => u.slug === slug);

    const handleShared = async () => {
        try {
            const shareData = {
                title: user?.name || "Compartir",
                text: `Mira esta página\n\n*${user.name}* - _${user.fullname}_ y lo puedes encontrar en el siguiente enlace:\n\n`,
                url: window.location.href,
            };
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                const text = encodeURIComponent(`${shareData.text}: ${shareData.url}`);
                window.open(`https://wa.me/send?text=${text}`, "_blank");
            }
        } catch (err) {
            console.error("Error al compartir:", err);
        }
    }

    if (!user) {
        return <div>No se encontró el usuario: {slug}</div>;
    }

    return (

        <div className={`${pagestyle.window}`}>

            <div className={`${pagestyle.box}`}>

                <section className={`${pagestyle.header}`}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', padding: '.8rem 1rem'}}>
                        <button className={`${pagestyle.share}`} onClick={handleShared}><IconShare3/></button>
                    </div>
                    <picture className={`${pagestyle.avatar}`}>
                        <img src={user.avatar.src} alt={`Foto de perfil de ${user.name} - ${user.fullname}`} />
                    </picture>
                    <h2 className={`${pagestyle.name}`}>{user.name}</h2>
                    <p className={`${pagestyle.textname}`}>{user.fullname}</p>
                </section>

                <section className={`${pagestyle.section}`}>
                    <h3 className={`${pagestyle.subtit}`}>Contáctanos</h3>
                    <ul className={pagestyle.lstntw}>
                        {user.contacts.map((ctn, idx) => (
                            <li key={idx}>
                                <a className={pagestyle.opc} href={ctn.link} target='_blank'>{ctn.icon}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={`${pagestyle.section}`}>
                    <h3 className={`${pagestyle.subtit}`}>Síguenos</h3>
                    <ul className={pagestyle.lstntw}>
                        {user.networks.map((ntw, idx) => (
                            <li key={idx}>
                                <a className={pagestyle.opc} href={ntw.link}>{ntw.icon}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={`${pagestyle.section}`}>
                    <h3 className={`${pagestyle.subtit}`}>{user.tit}</h3>
                    <ul className={`${pagestyle.lst}`}>
                        {user.services.map((srv, idx) => (
                            <li className={`${pagestyle.itm}`} key={idx}>{srv.txt}</li>
                        ))}
                    </ul>
                </section>

                <section className={`${pagestyle.section}`}>
                    <a className={`${pagestyle.badge}`} href='https://wa.me/51966327426/?text'>Únete a <b>{user.name}</b> en Lintro</a>
                </section>

            </div>

        </div>

    )

}