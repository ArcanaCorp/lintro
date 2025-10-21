import { Toaster } from 'sonner'
import styles from '../styles/auth.module.css'

export const metadata = {
    title: 'Crear cuenta | Lintro | Crea tu página en pocos click y date a conocer a tus clientes con un solo enlace.'
}

export default function SignLayout ({ children }) {

    return (

        <main className={styles.main}>

            <section className={styles.col}>
                <div className={styles.title}>
                    <a href='/' className={styles.linklogo}><h1 className={styles.logo}>Lintro.</h1></a>
                </div>
                <div className={styles.content}>{children}</div>
            </section>

            <section className={`${styles.col} ${styles.bg} ${styles.bglogin}`}></section>

            <Toaster position='top-center' duration={3000} richColors />

        </main>

    )

}