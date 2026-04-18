import { db } from "@/libs/supabase";

export const signInOrSignUp = async (email, password) => {
    try {
        
        const { data: loginData, error: loginError } = await db.auth.signInWithPassword({email, password});

        if (!loginError && loginData?.user) {
            await db.auth.getSession();
            return { user: loginData?.user, isNew: true }
        }

        const { data: signUpData, error: signUpError } = await db.auth.signUp({ email, password });

        if (signUpError) throw signUpError;

        const user = signUpData?.user;

        if (!user) return { user: null, isNew: true };

        await db.auth.getSession();

        return { user, isNew: true }

    } catch (error) {
        console.error(error);
        return { user: null, error: error, message: error.message }
    }
}

export async function signInWithGoogle() {
    try {
        const { data, error } = await db.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if (error) return { success: false, message: error.message };

        return { success: true, data};

    } catch (err) {
        return { success: false, message: err.message || 'Error inesperado'};
    }
}

export async function logout() {
    const { error } = await db.auth.signOut();

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return { success: true };
}

/* =========================
👤 GET USER
========================= */
export async function getCurrentUser() {
    const { data, error } = await db.auth.getUser();

    if (error) return null;

    return data?.user || null;
}