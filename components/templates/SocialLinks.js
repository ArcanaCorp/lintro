import { SOCIAL_OPTIONS } from "@/helpers/dashboard";
import Link from "next/link";

export default function SocialLinks ({ link, profile }) {

    const findIcon = SOCIAL_OPTIONS.find((s) => s.value === link.platform);

    return (
        <li className={`w h `} style={{"--w": "50px", "--mnw": "50px", "--h": "50px"}}>
            <Link href={link?.url} className="w-full h-full center bg-neutro rounded-full text-dark" target="_blank" aria-label={`Ir al perfil de ${link?.platform} de ${profile?.name}`}>{findIcon.icon}</Link>
        </li>
    )
}