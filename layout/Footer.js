import footer from './styles/footer.module.css'

export default function Footer () {

    const keys = [
        'Influencers',
        'Comercios',
        'Productos',
        'Tutoriales',
        'Freelancers',
        'Artistas',
        'Músicos',
        'Fotógrafos',
        'Emprendedores',
        'ONGs',
        'Startups',
        'Eventos',
        'Portafolios'
    ]

    return (
        <footer className={footer.wdfull}>
            <div className={footer.marquee}>
                <ul className={footer.lst}>
                    {keys.map((k, i) => (
                        <li key={i} className={footer.itm}>
                            <span>{k}</span>
                        </li>
                    ))}
                    {keys.map((k, i) => ( // 👈 duplicamos para loop continuo
                        <li key={`dup-${i}`} className={footer.itm}>
                            <span>{k}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )

}