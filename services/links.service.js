import { db } from "@/libs/supabase";

export async function getLinks(userId) {
    const { data, error } = await db
        .from("links")
        .select("*")
        .eq("user_id", userId)
        .order("order_index", { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function saveLinks(userId, links) {
    try {
        if (!userId) return null;

        // limpiar estructura para DB
        const payload = links.map(link => ({// nuevos no tienen uuid
            user_id: userId,
            title: link.title,
            url: link.url,
            is_visible: link.view,
            order_index: links.indexOf(link)
        }));

        const { data, error } = await db
            .from("links")
            .upsert(payload, {
                onConflict: "id"
            })
            .select();

        if (error) {
            console.error("saveLinks error:", error);
            return null;
        }

        return data;

    } catch (error) {
        console.error(error);
        return { ok: false }
    }
}

export async function deleteLink(id) {
    const { error } = await db
        .from("links")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("deleteLink error:", error);
    }
}