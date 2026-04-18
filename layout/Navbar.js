import { IconLink, IconPalette, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar ({ user }) {

    const pathname = usePathname();

    return (

        <nav className="w h bg-white" style={{"--w": "100%", "--h": "60px"}}>
            <div className="none"></div>
            <ul className='w m-auto h-full flex items-center justify-between' style={{"--w": "90%"}}>
                <li className='w-full'>
                    <Link href="/dashboard" className={`w-full flex items-center gap-sm justify-center ${pathname === '/dashboard' ? 'bg-primary rounded-full py-md text-accent' : 'bg-hover'}`}>
                        <IconLink strokeWidth={1.5} />
                        <span className="text-xs">Links</span>
                    </Link>
                </li>
                <li className='w-full'>
                    <Link href="/dashboard/store" className={`w-full flex items-center gap-sm justify-center ${pathname === '/dashboard/store' ? 'bg-primary rounded-full py-md text-accent' : 'bg-hover'}`}>
                        <IconShoppingBag strokeWidth={1.5} />
                        <span className="text-xs">Tienda</span>
                    </Link>
                </li>
                <li className='w-full'>
                    <Link href="/dashboard/design" className={`w-full flex items-center gap-sm justify-center ${pathname === '/dashboard/design' ? 'bg-primary rounded-full py-md text-accent' : 'bg-hover'}`}>
                        <IconPalette strokeWidth={1.5} />
                        <span className="text-xs">Diseño</span>
                    </Link>
                </li>
            </ul>
            <div className="none flex flex-col gap-md">
                <div className="flex gap-sm">
                    <picture className="block w h rounded-full bg-gray" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}></picture>
                    <div>
                        <h4>{user?.email}</h4>
                        <p></p>
                    </div>
                </div>
                <button>Cerrar sesión</button>
            </div>
        </nav>

    )

}