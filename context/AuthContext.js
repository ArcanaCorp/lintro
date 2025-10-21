'use client'

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { serviceGetAccount } from "@/services/account/account.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null); 
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        const initAuth = async () => {
            const token = Cookies.get("c_user");
            if (token) {
                try {
                    const data = await serviceGetAccount(token);
                    if (data.success) {
                        const decode = jwtDecode(data?.data.user);
                        setUser(decode); // 👈 aquí guardas el user completo que devuelve backend
                    } else {
                        Cookies.remove("c_user"); // si falla, limpia
                        setUser(null);
                    }
                } catch (err) {
                    Cookies.remove("c_user");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (token) => {
        Cookies.set("c_user", token, { expires: 1 / 24 }); // 1h de vida
        setUser({ token }); // podrías disparar un fetch para traer perfil
    };

    const logout = () => {
        Cookies.remove("c_user");
        setUser(null);
    };

    const contextValue = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);