'use client'

import { useState } from 'react';
import styles from '../styles/auth.module.css'
import { isValidEmail, isValidPassword } from '@/utils/verify-data';
import { Eye, EyeClosed } from 'lucide-react';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import { serviceLoginUser, serviceSearchUser } from '@/services/auth/service.auth';
import { useRouter } from 'next/navigation';
export default function Login () {

    const navigate = useRouter();

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

    const handleSearchAccount = async () => {

        try {
            
            setLoading(true)
            const data = await serviceSearchUser(email.value);
            if (!data.success) return toast.warning('Alerta', { description: data.message })

                setStep(1)
                const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set('c_sub', data?.data.sub, { expires: oneHourFromNow })

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    const handleLoginAccount = async () => {

        try {
            
            setLoading(true);
            const sub = Cookies.get('c_sub')
            const data = await serviceLoginUser(sub, password.value)

            if (!data.success) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                Cookies.remove('c_sub')
                Cookies.set('c_user', data?.data.token, { expires: 365 })
                navigate.replace('/dashboard')

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
        }

    }

    return (

        <>
        
            <div style={{marginBottom: '2rem'}}>
                <h1 className={styles.txtPrimary}>Bienvenido</h1>
                <p className={styles.txtSecondary}>Inicia sesión en tu Lintro</p>
            </div>

            <div className={styles.form}>

                <div className={styles.formGroup}>
                    <div className={styles.formControl}>
                        <input className={styles.entry} type="email" name="email-login" id="email-login" value={email.value} placeholder="Ingresa tu correo electrónico" onChange={handleChangeEmail} autoComplete='off' />
                    </div>
                    {email.error !== '' && <span className={`${styles.message}`}>{email.error}</span>}
                </div>

                {step === 1 && (
                    <div className={styles.formGroup}>
                        <div className={styles.formControl}>
                            <input className={styles.entry} type={password.view ? 'text' : 'password'} name="password-login" id="password-login" value={password.value} placeholder="Ingresa tu contraseña" onChange={handleChangePassword} autoComplete='off' />
                            <button className={styles.btnView} onClick={() => setPassword(prev => ({ ...prev, view: !prev.view }))}>{password.view ? <EyeClosed strokeWidth={1.5} /> : <Eye strokeWidth={1.5} />}</button>
                        </div>
                        {password.error !== '' && <span className={`${styles.message}`}>{password.error}</span>}
                    </div>
                )}

                <div className={styles.formGroup}>
                    {step === 0 ? (
                        <button className={`${styles.btn} ${email.isValid && styles.active}`} disabled={!email.isValid} onClick={handleSearchAccount}>{loading ? 'Cargando...' : 'Continuar'}</button>
                    ) : (
                        <button className={`${styles.btn} ${password.isValid && styles.active}`} disabled={!password.isValid} onClick={handleLoginAccount}>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</button>
                    )}
                </div>

            </div>

            <div style={{textAlign: 'center', margin: '4rem 0'}}>O</div>

            <div></div>

            <div style={{marginBottom: '2rem'}}>
                <p className={styles.txtAccount}>No tengo una cuenta. <a href="/auth/sign">Únete</a></p>
            </div>

        </>

    )

}