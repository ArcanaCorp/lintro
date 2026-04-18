import { db } from "@/libs/supabase";

export async function getFullProfile(userId) {
    try {
        if (!userId) return null;

        const { data, error } = await db
            .from("profiles")
            .select(`
                *,
                links ( id, title, url, media, is_visible, order_index ),
                products ( id, title, description, price, stock, image_url, is_active ),
                social_links ( id, platform, url )
            `)
            .eq("id", userId)
            .maybeSingle(); // 🔥 IMPORTANTE

        if (error) {
            console.error("getFullProfile error:", error);
            return null;
        }

        return {
            ...data,
            links: data?.links?.filter(Boolean) || [],
            products: data?.products?.filter(Boolean) || [],
            social_links: data?.social_links?.filter(Boolean) || [],
        };

    } catch (error) {
        console.error(error);
        return { ok: false, message: error.message, error: error }
    }
}

export const updateProfile = async (updates, id) => {
    try {
        const { data } = await db
            .from("profiles")
            .update(updates)
            .eq("id", id);

        return { ok: true, data }

    } catch (error) {
        console.error(error);
        return { ok: false, error: error, message: `Hubo un error: ${error.message}` }
    }
}

export async function uploadAvatar(userId, file) {
    try {
        if (!file || !userId) return null;

        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}.${fileExt}`;
        const filePath = `profiles/${fileName}`;

        // Subir archivo
        const { error: uploadError } = await db.storage
            .from("profiles")
            .upload(filePath, file, {
                upsert: true // 🔥 reemplaza si ya existe
            });

        if (uploadError) {
            console.error(uploadError);
            return null;
        }

        // Obtener URL pública
        const { data } = db.storage
            .from("profiles")
            .getPublicUrl(filePath);

        const publicUrl = data.publicUrl;

        // Guardar en DB
        const { error: updateError } = await db
            .from("profiles")
            .update({ avatar_url: publicUrl })
            .eq("id", userId);

        if (updateError) {
            console.error(updateError);
            return null;
        }

        return publicUrl;
    } catch (error) {
        console.error(error);
        return { ok: false }
    }
}