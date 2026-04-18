import { db } from "@/libs/supabase";

export const getBySlug = async (slug) => {
    try {
        const { data, error } = await db
            .from('profiles')
            .select('*')
            .eq('username', slug)
        
        if (error) throw new Error(error);
        
        return data;

    } catch (error) {
        console.error(error);
    }
}