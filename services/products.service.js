import { db } from "@/libs/supabase";

export const getProducts = async (id) => {
    
    try {
        const { data, error } = await db
            .from('products')
            .select('*')
            .eq('user_id', id)
            .order('id', { ascending: false })
    
        if (error) throw new Error(error);
            return data;
    } catch (error) {
        console.error(error);
    }
}

export const createProduct = async (userId, form) => {

    try {

        let imageUrl = null;

        // 🔥 1. SUBIR IMAGEN
        if (form.image) {
            const file = form.image;

            const ext = file.name.split('.').pop();
            const fileName = `${userId}_${Date.now()}.${ext}`;

            const { data: uploadData, error: uploadError } = await db
                .storage
                .from('products')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 🔗 Obtener URL pública
            const { data: publicUrlData } = db
                .storage
                .from('products')
                .getPublicUrl(fileName);

            imageUrl = publicUrlData.publicUrl;
        }

        // 🔥 2. INSERTAR EN DB
        const { data, error } = await db
            .from('products')
            .insert({
                user_id: userId,
                title: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                image_url: imageUrl
            })
            .select()
            .single();

        if (error) throw error;
        
        return data;

    } catch (error) {
        console.error("createProduct error:", error);
        throw error;
    }
}