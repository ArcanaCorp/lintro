'use client';

import pagestyle from '@/app/[slug]/styles/page.module.css'
import { getBySlug } from '@/services/slug.service';
import { IconShare3 } from '@tabler/icons-react';
import { use, useEffect, useState } from 'react';
export default function SlugPage ({ params }) {

    const { slug } = use(params);
    const [ user, setUser ] = useState(null);

    // Buscar el usuario correspondiente

    const handleShared = async () => {}


    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await getBySlug(slug);
                setUser(data[0])
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
    }, [slug]);


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
                        <img src={user?.avatar_url} alt={`Foto de perfil de ${user?.name}`} />
                    </picture>
                    <h2 className={`${pagestyle.name}`}>{user?.name}</h2>
                    <p className={`${pagestyle.textname}`}>{user?.bio}</p>
                </section>

                <section className={`${pagestyle.section}`}>
                    <a className={`${pagestyle.badge}`} href='https://wa.me/51966327426/?text'>Únete a <b>{user.name}</b> en Lintro</a>
                </section>

            </div>

        </div>

    )

}