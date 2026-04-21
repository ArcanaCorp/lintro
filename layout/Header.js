import { IconShare2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header ({ user, profile }) {

    const pathname = usePathname();

    const txt = {
        '/dashboard': 'Links',
        '/dashboard/store': 'Tienda',
        '/dashboard/design': 'Diseño'
    }

    const title = txt[pathname] || 'Bievenido';

    return (

        <header className='w-full h bg-white' style={{"--h": "60px"}}>
            <div className="w h-full m-auto flex items-center justify-between" style={{"--w": "90%"}}>
                <h1 className="text-xl">{title}</h1>
                <div className="flex gap-xs items-center">
                    <button className="h flex items-center gap-md px-md rounded-full text-xs" style={{"--h": "40px"}}><IconShare2/> Compartir</button>
                    <Link href={'/'} className="block w h rounded-full bg-gray overflow-hidden" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}}>
                        <img src={`https://ui-avatars.com/api/?name=${profile?.name || user?.name || user?.email}&background=06f988&color=00351e&bold`} />
                    </Link>
                </div>
            </div>
        </header>

    )

}