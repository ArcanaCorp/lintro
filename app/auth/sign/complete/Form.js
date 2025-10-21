import { toast } from 'sonner';
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from "js-cookie";
import { serviceCompletAccount } from '@/services/auth/service.auth';

import styles from '../../styles/auth.module.css'

export default function Form () {

    const navigate = useRouter();
    const searchParams = useSearchParams();
    const userparam = searchParams.get('u');

    const [ name, setName ] = useState({
        value: '',
        isValid: false,
        error: ''
    })

    const [username, setUsername] = useState({
        value: userparam ?? '',
        isValid: userparam ? userparam.length >= 3 : false,
        error: userparam && userparam.length < 3 ? 'Debe tener al menos 3 caracteres' : ''
    })

    const [loading, setLoading] = useState(false);

    const handleChangeName = (e) => {
        const { value } = e.target
        setName({
            value,
            isValid: value.length >= 3,
            error: value.length < 3 ? 'Debe tener al menos 3 caracteres' : ''
        })
    }

    // 👉 Handle para username
    const handleChangeUsername = (e) => {
        const { value } = e.target
        setUsername({
            value,
            isValid: value.length >= 3,
            error: value.length < 3 ? 'Debe tener al menos 3 caracteres' : ''
        })
    }

    const handleCompleteRegister = async () => {

        try {
            
            setLoading(true)

            const sub = Cookies.get('c_sub');
            const data = await serviceCompletAccount(sub, name.value, username.value)

            if (!data.success) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                Cookies.set('c_user', data?.data.token, { expires: 365 })
                Cookies.remove('c_sub')
                navigate.replace('/dashboard')

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
                <h1 className={styles.txtPrimary}>Completa tu info</h1>
                <p className={styles.txtSecondary}>Ya falta poco</p>
            </div>

            <div className={styles.form}>
                
                <div className={styles.formGroup}>
                    <div className={styles.formControl}>
                        <input className={styles.entry} type='text' name='name-sign' id='name-sign' value={name.value} placeholder='Ingresa tu nombre' autoComplete='off' onChange={handleChangeName} />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.formControl}>
                        <input className={styles.entry} type='text' name='username-sign' id='username-sign' value={username.value} placeholder={userparam ? userparam : 'Ingresa tu nombre de usuario'} autoComplete='off' onChange={handleChangeUsername} />
                    </div>
                </div>
                
                <div className={styles.formGroup}>
                    <button className={`${styles.btn} ${name.isValid && username.isValid && styles.active}`} disabled={!name.isValid || !username.isValid} onClick={handleCompleteRegister}>{loading ? 'Finalizando...' : 'Finalizar'}</button>
                </div>

            </div>

            <div style={{marginBottom: '2rem'}}>
                <p className={styles.txtAccount}>Ya tengo una cuenta. <a href="/auth/login">Iniciar Sesión</a></p>
            </div>

        </>

    )

}