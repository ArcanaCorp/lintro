'use client'

import { getCurrentUser } from "@/services/auth.service";
import { getFullProfile } from "@/services/profile.service";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const init = async () => {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                setLoading(false);
                return;
            }

            setUser(currentUser);

            const fullProfile = await getFullProfile(currentUser.id);

            setProfile(fullProfile);
            setLoading(false);
        };

        init();
    }, []);

    const contextValue = { user, setUser, loading, profile, setProfile };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);