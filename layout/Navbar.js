import { IconLink, IconPalette, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar ({ user, profile }) {

    const pathname = usePathname();

    return (

        <nav className="w h bg-white lg:w lg:h-screen" style={{"--w": "100%", "--h": "60px", "--mnw-lg": "300px"}}>
            <div className="none lg:flex lg:items-center lg:w-full lg:h lg:px-md" style={{"--h-lg": "60px"}}>
                <h1 className="text-primary">Lintro.</h1>
            </div>
            <ul className='w m-auto h-full flex items-center justify-between lg:flex-col lg:justify-start lg:py-lg lg:gap-lg lg:h' style={{"--w": "90%", "--h-lg": "calc(100dvh - 180px)"}}>
                <li className='w-full'>
                    <Link href="/dashboard" className={`w-full flex items-center gap-sm justify-center py-md ${pathname === '/dashboard' ? 'bg-primary rounded-full text-accent' : ''}`}>
                        <IconLink strokeWidth={1.5} />
                        <span className="text-xs">Links</span>
                    </Link>
                </li>
                <li className='w-full'>
                    <Link href="/dashboard/store" className={`w-full flex items-center gap-sm justify-center py-md ${pathname === '/dashboard/store' ? 'bg-primary rounded-full text-accent' : ''}`}>
                        <IconShoppingBag strokeWidth={1.5} />
                        <span className="text-xs">Tienda</span>
                    </Link>
                </li>
                <li className='w-full'>
                    <Link href="/dashboard/design" className={`w-full flex items-center gap-sm justify-center py-md ${pathname === '/dashboard/design' ? 'bg-primary rounded-full text-accent' : ''}`}>
                        <IconPalette strokeWidth={1.5} />
                        <span className="text-xs">Diseño</span>
                    </Link>
                </li>
            </ul>
            <div className="none lg:h lg:flex lg:flex-col lg:gap-md lg:px-md" style={{"--h-lg": "120px"}}>
                <div className="flex gap-sm">
                    <picture className="block w h rounded-full bg-gray" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                        <img src={`https://ui-avatars.com/api/?name=${profile?.name || user?.name || user?.email}&background=06f988&color=00351e&bold`} className="w-full h-full rounded-full" />
                    </picture>
                    <div>
                        <h4>{profile?.name || user?.email}</h4>
                        <p className="text-xs text-gray">@{profile?.username}</p>
                    </div>
                </div>
                <button className="btn">Cerrar sesión</button>
            </div>
        </nav>

    )

}