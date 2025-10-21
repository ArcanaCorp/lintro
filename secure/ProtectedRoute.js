'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
    
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        const token = Cookies.get("c_user");
        if (!loading && !token) {
            router.replace("/auth/login"); // 🔁 si no hay sesión, fuera
        }
    }, [loading, user, router]);

    if (loading) return <p>Cargando...</p>;

    return children;
}
