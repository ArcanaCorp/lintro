'use client';

import { useState } from 'react'
import { toast } from 'sonner';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from "js-cookie";

import { isValidEmail, isValidPassword } from '@/utils/verify-data';
import { serviceCreateAccount, serviceRegisterEmail } from '@/services/auth/service.auth';

import styles from '../styles/auth.module.css'

export default function Sign () {

    const navigate = useRouter();
    const query = useSearchParams();

    const [ email, setEmail ] = useState({
        value: '',
        isValid: false,
        error: ''
    });

    const [ password, setPassword ] = useState({
        value: '',
        isValid: false,
        error: '',
        view: false
    })

    const [ step, setStep ] = useState(0);

    const [ loading, setLoading ] = useState(false);

    const handleChangeEmail = (e) => {
        const { value } = e.target;
        const valid = isValidEmail(value);
        setEmail({
            value: value,
            isValid: valid,
            error: !valid ? 'Ingresa un correo válido por favor' : ''
        })
    }

    const handleChangePassword = (e) => {

        const { value } = e.target;
        const valid = isValidPassword(value)
        setPassword(prev => ({
            ...prev,
            value: value,
            isValid: valid.isValid,
            error: valid.message
        }))

    }

    const handleRegisterEmail = async () => {

        if (!email.isValid) return toast.warning('Alerta', {description: 'Ingresa un correo válido antes de continuar.'})

        try {

            setLoading(true);
            
            const username = query.get('u');

            const data = await serviceRegisterEmail(username, email.value)

            if (!data.success) {
                toast.warning('Alerta', {description: data.message})
                return;
            }

            setStep(1);
            

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    const handleCreateAccount = async () => {

        try {
            
            setLoading(true);

            const data = await serviceCreateAccount(email.value, password.value)

            if (!data.success) {
                toast.warning('Alerta', {
                    description: data.message
                })
                return;
            }

            toast.success('Éxito', { description: data.message })
            const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
            Cookies.set('c_sub', data?.data.sub, { expires: oneHourFromNow })
            const username = query.get('u');
            navigate.push(`/auth/sign/complete?u=${username}`)

        } catch (error) {
            toast.error('Error', { description: error.message })
            console.error(error);
        } finally {
            setLoading(false)
        }

    }

    return (
        
        <>
        
            <div style={{marginBottom: '2rem'}}>
                <h1 className={styles.txtPrimary}>Únete a Lintro</h1>
                <p className={styles.txtSecondary}>Regístrate gratis</p>
            </div>

            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <div className={styles.formControl}>
                        <input className={styles.entry} type="email" name="email-sign" id="email-sign" value={email.value} placeholder="Ingresa tu correo electrónico" onChange={handleChangeEmail} disabled={step === 1 ? true : false} autoComplete='off' />
                    </div>
                    {email.error !== '' && <span className={`${styles.message}`}>{email.error}</span>}
                </div>
                {step === 1 && (
                    <div className={styles.formGroup}>
                        <div className={styles.formControl}>
                            <input className={styles.entry} type={password.view ? 'text' : 'password'} name="password-sign" id="password-sign" value={password.value} placeholder="Ingresa tu contraseña" onChange={handleChangePassword} autoComplete='off'/>
                            <button className={styles.btnView} onClick={() => setPassword(prev => ({ ...prev, view: !prev.view }))}>{password.view ? <EyeClosed strokeWidth={1.5} /> : <Eye strokeWidth={1.5} />}</button>
                        </div>
                        {password.error !== '' && <span className={`${styles.message}`}>{password.error}</span>}
                    </div>
                )}
                <div className={styles.formGroup}>
                    {step === 0 ? (
                        <button className={`${styles.btn} ${email.isValid && styles.active}`} disabled={!email.isValid} onClick={handleRegisterEmail}>{loading ? 'Cargando...' : 'Continuar'}</button>
                    ) : (
                        <button className={`${styles.btn} ${password.isValid && styles.active}`} disabled={!password.isValid} onClick={handleCreateAccount}>{loading ? 'Cargando...' : 'Crear cuenta'}</button>
                    )}
                </div>
            </div>

            <div style={{marginBottom: '2rem'}}>
                <p className={styles.txtTerms}>Al hacer clic en <b>Crear cuenta</b>, acepta el <a href='/'>aviso de privacidad</a>, los <a href='/'>términos y condiciones</a> de Lintro y recibir ofertas, noticias y actualizaciones.</p>
            </div>

            <div style={{textAlign: 'center', margin: '4rem 0'}}>O</div>

            <div></div>

            <div style={{marginBottom: '2rem'}}>
                <p className={styles.txtAccount}>Ya tengo una cuenta. <a href="/auth/login">Iniciar Sesión</a></p>
            </div>

        </>

    )

}