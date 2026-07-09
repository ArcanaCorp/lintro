import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import Link from "next/link";

export default function SocialLinks ({ link, profile }) {

    const findIcon = SOCIAL_OPTIONS.find((s) => s.value === link.platform);

    return (
        <li className={`w h rounded-full`} style={{"--w": "50px", "--mnw": "50px", "--h": "50px", backgroundColor: profile?.theme.bg}}>
            <Link href={link?.url} className="w-full h-full center" style={{color: profile?.theme?.text}} target="_blank" aria-label={`Ir al perfil de ${link?.platform} de ${profile?.name}`}>{findIcon.icon}</Link>
        </li>
    )
}