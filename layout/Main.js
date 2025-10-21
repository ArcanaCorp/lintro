"use client";

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { serviceVerifyUser } from '@/services/auth/service.auth';

import main from './styles/main.module.css'

export default function Main () {

    const username = useRef();
    const navigate = useRouter();

    const [ loading, setLoading ] = useState(false);

    const handleVerifyUsername = async () => {
    
        const value = username.current.value;
    
        if (!value) return alert('Ingresa un nombre de usuario antes de continuar.')

            try {

                setLoading(true);
                const data = await serviceVerifyUser(value);

                if (!data.success) {
                    alert(data.message)
                    return;
                }

                navigate.push(`/auth/sign/?u=${value}`)

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

    }

    return (

        <main className={main.wdfull}>
            <div className={main.box}>
                <div className={`${main.col} ${main.colA}`}>
                    <span className={main.badge}>Todo en un solo link</span>
                    <h1 className={main.title}>Enlaces para tu perfil, negocio, portafolio o comunidad en un solo lugar.</h1>
                    <p className={main.subtext}>Centraliza todos tus enlaces, muestra tu marca personal o negocio y comparte tu mundo en segundos. Diseñado para creadores, emprendedores y comunidades que quieren destacar online.</p>
                    <div className={main.form}>
                        <div className={main.entrygroup}>
                            <span>lintro.link/</span>
                            <input className={main.entry} type='text' name='username' id='username' placeholder='Tu nombre...' ref={username} />
                        </div>
                        <button className={main.btn} onClick={handleVerifyUsername}>{loading ? 'Cargando...' : 'Comenzar'}</button>
                    </div>
                </div>
                <div className={main.col}></div>
            </div>
        </main>

    )

}