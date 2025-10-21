'use client'

import { Link, Store, Paintbrush, Settings, LogOut } from "lucide-react";
import ProtectedRoute from "@/secure/ProtectedRoute";
import styles from './styles/layout.module.css'
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout ({ children }) {

    const { user } = useAuth();

    return (
    
        <ProtectedRoute>

            <div className={styles.box}>

                <nav className={styles.nav}>

                    <ul className={styles.head}>
                        <li className={styles.content}>
                            <div className={styles.avatar}></div>
                            <h4>{user?.name}</h4>
                        </li>
                    </ul>
                    
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <a href="/dashboard">
                                <Link strokeWidth={1.5} />
                                <span>Links</span>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="/dashboard/store">
                                <Store strokeWidth={1.5} />
                                <span>Tienda</span>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="/dashboard/design">
                                <Paintbrush strokeWidth={1.5} />
                                <span>Diseño</span>
                            </a>
                        </li>
                    </ul>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <a href="/dashboard/settings">
                                <Settings strokeWidth={1.5} />
                                <span>Configuración</span>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a>
                                <LogOut strokeWidth={1.5} />
                                <span>Cerrar Sesión</span>
                            </a>
                        </li>
                    </ul>

                </nav>

                <main className={styles.main}>
                    <div>{children}</div>
                </main>

            </div>

        </ProtectedRoute>
    
    )

}