import { db } from "@/libs/supabase";

export async function getSocials(userId) {
    const { data, error } = await db
        .from("social_links")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

// 💾 guardar (upsert)
export async function saveSocials(userId, socials) {
    const payload = socials.map(s => ({
        id: typeof s.id === "number" ? undefined : s.id,
        user_id: userId,
        platform: s.platform,
        url: s.url
    }));

    const { data, error } = await db
        .from("social_links")
        .upsert(payload, { onConflict: "id" })
        .select();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

// ❌ eliminar
export async function deleteSocial(id) {
    const { error } = await db
        .from("social_links")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
    }
}