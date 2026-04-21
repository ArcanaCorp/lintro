import { templates } from '@/config/registry';
import { getBySlug } from '@/services/slug.service';

export async function generateMetadata({ params }) {
    const { slug } = params;

    const data = await getBySlug(slug);
    const user = data?.[0];

    if (!user) {
        return {
            title: "Usuario no encontrado | LintLintro | Crea tu página en pocos click y date a conocer a tus clientes con un solo enlace.ro"
        };
    }

    const title = `${user.name} | Lintro | Crea tu página en pocos click y date a conocer a tus clientes con un solo enlace.`;
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

export default async function SlugPage ({ params }) {

    const { slug } = params;
    const data = await getBySlug(slug);
    const user = data?.[0];

    if (!user) return <div>No se encontró el usuario <b>{slug}</b></div>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: user?.name,
        description: user?.bio,
        image: user?.avatar_url,
        url: `https://lintro.link/${user?.username}`,
        sameAs: user?.social_links?.map(s => s.url) || []
    };

    const Template = templates[user.template] || templates.minimal;

    return (

        <>
            <script type='application/ld+json' dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
            <Template profile={user} />
        </>

    )

}