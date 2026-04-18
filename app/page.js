import InfinityScroll from "@/components/landing/InfinityScroll";
import { IconArrowRight, IconBoltFilled, IconChartDonutFilled, IconPaletteFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Page () {

    const year = new Date().getFullYear();

    return (

        <>
        
            <header className='w-screen h bg-white' style={{"--h": "80px"}}>
                <div className='w h-full m-auto flex items-center justify-between' style={{"--w": "90%"}}>
                    <Link href='/'><h1>Lintro.</h1></Link>
                    <ul className='flex items-center gap-sm'>
                        <li><Link href='/auth/sign' className='btn btn-sm'>Ingresar</Link></li>
                        <li><Link href='/auth/login' className='btn btn-sm btn-primary'>Comenzar</Link></li>
                    </ul>
                </div>
            </header>

            <main className="w-full overflow-hidden">
                <section className="w-full h m-auto" style={{"--h": "calc(100dvh - 160px)"}} id="hero">
                    <div className="w h-full m-auto lg:w xl:w" style={{"--w": "90%", "--w-lg": "60%", "--w-xl": "40%"}}>
                        <div className="h-full flex flex-col gap-md justify-center">
                            <h1 className="text-3xl lg:text-4xl">Centraliza tu presencia digital en <span className="text-primary">un solo link</span></h1>
                            <p>Conecta tu contenido, redes sociales y proyectos en una página elegante y optimizada para la conversión</p>
                            <div className="flex gap-md">
                                <Link href={'/'} className="btn btn-primary">Comenzar</Link>
                                <Link href={'/'} className="btn">Ver ejemplos</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <InfinityScroll/>
                <section className="w-full h flex flex-col gap-md m-auto bg-dark py-2xl" style={{"--h": "calc(100dvh - 80px)"}} id="plus">
                    <div className="w m-auto flex flex-col gap-sm lg:w" style={{"--w": "90%", "--w-lg": "60%"}}>
                        <p className="text-primary uppercase">Por qué elegir <b>Lintro</b></p>
                        <h2 className="text-white text-3xl">Diseñado para la velocidad del creador moderno.</h2>
                    </div>
                    <ul className="w m-auto grid grid-1 gap-md lg:w lg:grid-2" style={{"--w": "90%", "--w-lg": "60%"}}>
                        <li className="w-full bg-black rounded-md p-md flex flex-col gap-md">
                            <span className="center w h rounded-sm" style={{"--w": "40px", "--h": "40px"}}><IconBoltFilled fill="#06f988"/></span>
                            <h3 className="text-white">Rápido & Fluído</h3>
                            <p className="text-muted text-sm lh-relaxed">Carga en milisegundos. Tus seguidores no esperan, y nosotros tampoco. Optimizamos cada activo para que tu impacto sea instantáneo.</p>
                            <Link href={'/'} className="flex items-center gap-sm text-primary py-sm px-md">Explora la tecnología <IconArrowRight/></Link>
                        </li>
                        <li className="w-full bg-negative rounded-md p-md flex flex-col gap-md">
                            <span className="center w h rounded-sm" style={{"--w": "40px", "--h": "40px"}}><IconChartDonutFilled fill="#06f988"/></span>
                            <h3 className="text-white">Análisis</h3>
                            <p className="text-muted text-sm lh-relaxed">Entiende de dónde viene tu tráfico y qué contenido genera clics reales. Datos precisos para decisiones inteligentes.</p>
                        </li>
                        <li className="w-full bg-negative rounded-md p-md flex flex-col gap-md">
                            <span className="center w h rounded-sm" style={{"--w": "40px", "--h": "40px"}}><IconPaletteFilled fill="#06f988"/></span>
                            <h3 className="text-white">Diseño minimalista</h3>
                            <p className="text-muted text-sm lh-relaxed">Menos es más. Una interfaz editorial que pone tu contenido en el centro, eliminando el ruido innecesario.</p>
                        </li>
                        <li className="w-full bg-primary rounded-md p-md flex flex-col gap-md">
                            <span className="center w h rounded-sm" style={{"--w": "40px", "--h": "40px"}}><IconBoltFilled/></span>
                            <h3 className="text-white">Rápido & Fluído</h3>
                        </li>
                    </ul>
                </section>
                <section className="w-full h-screen bg-white py-2xl">
                    <div className="w h-full m-auto flex flex-col gap-md items-center justify-center lg:w" style={{"--w": "90%", "--w-lg": "60%"}}>
                        <h2 className="text-center text-3xl lg:text-4xl">Listo para el siguiente nivel de tu marca personal?</h2>
                        <p className="text-center text-sm text-gray">Únete a comienza a construir tu marca personal con nuestro ecosistema digital.</p>
                        <div>
                            <Link href={'/'} className="btn btn-primary">Empieza ahora - Es gratis</Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full py-2xl">
                <div className="w m-auto flex flex-col gap-md lg:flex-row" style={{"--w": "90%"}}>
                    <div>
                        <h2 className="text-2xl lg:text-4xl">Lintro</h2>
                        <p className="text-xs text-muted">Simplificando el caos digital para creadores, marcas y empresas globales.</p>
                    </div>
                    <div className="w-full flex flex-col gap-md lg:flex-row">
                        <ul className="w-full flex flex-col gap-md items-center">
                            <h3>Producto</h3>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Características</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Análisis</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Precios</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Diseños</Link></li>
                        </ul>
                        <ul className="w-full flex flex-col gap-md items-center">
                            <h3>Compañia</h3>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Acerca de</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Blog</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Carreras</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Contacto</Link></li>
                        </ul>
                        <ul className="w-full flex flex-col gap-md items-center">
                            <h3>Soporte</h3>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Ayuda</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Términos</Link></li>
                            <li><Link href={'/'} className="text-sm text-muted fw-medium">Privacidad</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="w m-auto flex items-center justify-between py-2xl" style={{"--w": "90%"}}>
                    <p className="text-xs">© {year} Lintro. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-xs">
                        <Link href={'/'} className="text-xs text-muted uppercase fw-medium px-md">Instagram</Link>
                        <Link href={'/'} className="text-xs text-muted uppercase fw-medium px-md">Twitter</Link>
                        <Link href={'/'} className="text-xs text-muted uppercase fw-medium px-md">LinkedIn</Link>
                    </div>
                </div>
            </footer>

        </>

    )

}