import { getBySlug } from "@/services/slug.service";

export async function generateMetadata({ params }) {
    const { slug } = params;

    const data = await getBySlug(slug);
    const user = data?.[0];

    if (!user) {
        return {
            title: "Usuario no encontrado | Lintro"
        };
    }

    const title = `${user.name} | Lintro`;
    const description = user.bio || "Descubre mis enlaces en Lintro";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [user.avatar_url],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [user.avatar_url],
        }
    };
}