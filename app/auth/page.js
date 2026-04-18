'use client';

import { useAuth } from "@/context/AuthContext";
import { getCurrentUser, signInOrSignUp } from "@/services/auth.service";
import { isValidEmail, isValidPassword, validate } from "@/utils/verify-data";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page () {

    const router = useRouter();

    const { setUser } = useAuth();
    
    const [form, setForm] = useState({
        email: '',
        password: '',
        showPassword: false,
        errors: {}
    });

    const [ loading, setLoading ] = useState(false);
    
    const toggleShow = () => setForm(prev => ({...prev, showPassword: !prev.showPassword}))
    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setForm(prev => ({
            ...prev,
            [field]: value,
            errors: {
                ...prev.errors,
                [field]: ''
            }
        }));
    };

    const handleSign = async (e) => {
        e.preventDefault();
        const errors = validate(form);
        setForm(prev => ({ ...prev, errors }));
        if (errors.email || errors.password) return toast.warning('Revisa los campos para poder continuar');
        try {
            setLoading(true);
            const { user } = await signInOrSignUp(form.email, form.password);
            if (!user) return;
            const fullUser = await getCurrentUser();
            setUser(fullUser);
            router.push('/dashboard')
            toast.success('Inicio de sesión correctamente.')
        } catch (error) {
            console.error(error);
            toast.error(`Hubo un error: ${error.message}`)
        } finally {
            setLoading(false);
        }
    }

    return (
    
        <div className="w-full flex flex-col gap-md">

            <div className="text-center">
                <h2 className="w lh-tight m-auto text-3xl lg:w" style={{"--w": "100%", "--mxw-lg": "80%"}}>Bienvenido a tener todo a un click</h2>
                <p className="text-xs text-gray">Crea o ingresa a una cuenta para acceder a tus herramientas.</p>
            </div>

            <div className="w-full py-md flex flex-col gap-md">
                <form className="w-full flex flex-col gap-md" onSubmit={handleSign}>
                    <div className="w-full">
                        <label htmlFor="email" className="block mb-sm text-xs text-gray fw-medium">Ingresa tu correo electrónico</label>
                        <div className="relative w-full">
                            <input type="email" name="email" id="email" className={`input ${form.errors.email && 'input-error'}`} placeholder="Ingresa tu correo electrónico" value={form.email} onChange={handleChange('email')} />
                            {form.errors.email && (<p className="text-xs text-error mt-xs">{form.errors.email}</p>)}
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="pwd" className="block mb-sm text-xs text-gray fw-medium">Ingresa tu contraseña</label>
                        <div className="relative w-full">
                            <input type={form.showPassword ? 'text' : 'password'} name="pwd" id="pwd" className={`input ${form.errors.password && 'input-error'}`} placeholder="Ingresa tu contraseña" value={form.password} onChange={handleChange('password')} />
                            <span className="absolute center w h" style={{"--w": "50px", "--h": "50px", top: '0', right: '0', cursor: 'pointer'}} onClick={toggleShow}><IconEye/></span>
                            {form.errors.password && (<p className="text-xs text-error mt-xs">{form.errors.password}</p>)}
                        </div>
                    </div>
                    <div className="w-full">
                        <button className={`btn btn-primary`} disabled={loading}>{loading ? 'Cargando...' : 'Continuar'}</button>
                    </div>
                </form>
                <p className="text-center">o</p>
                <button className="btn">Ingresar con Google</button>
                <p className='text-xs text-center text-gray'>Al hacer clic en <b>Crear cuenta</b> o <b>Iniciar con Google</b>, acepta el <Link href='/' className="fw-medium">aviso de privacidad</Link>, los <Link href='/' className="fw-medium">términos y condiciones</Link> de Lintro y recibir ofertas, noticias y actualizaciones.</p>
            </div>

        </div>
    
    )

}