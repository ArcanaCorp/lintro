import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import Link from "next/link";

export default function SocialLinks ({ link, profile }) {

    const findIcon = SOCIAL_OPTIONS.find((s) => s.value === link.platform);

    return (
        <li className="w h center" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
            <Link href={link?.url} style={{color: profile?.theme?.text}} target="_blank" aria-label={`Ir al perfil de ${link?.platform} de ${profile?.name}`}>{findIcon.icon}</Link>
        </li>
    )
}