import { db } from "@/libs/supabase";

export const getBySlug = async (slug) => {
    try {
        const { data, error } = await db
            .from('profiles')
            .select(`
                *,
                links ( id, title, url, media, is_visible, order_index ),
                products ( id, title, description, price, stock, image_url, is_active ),
                social_links ( id, platform, url )
            `)
            .eq('username', slug)
        
        if (error) throw new Error(error);
        
        return data;

    } catch (error) {
        console.error(error);
    }
}