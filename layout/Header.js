import header from './styles/header.module.css'

export default function Header () {

    return (

        <header className={header.wdfull}>
            <div className={header.box}>
                <div>
                    <a href='/'><h1>Lintro.</h1></a>
                </div>
                <nav className={header.nav}>
                    <ul className={header.itms}>
                        <li className={header.itm}>
                            <a href='/auth/sign' className={header.itmlink}>Ingresar</a>
                        </li>
                        <li className={header.itm}>
                            <a href='/auth/login' className={`${header.itmlink} ${header.active}`}>Comenzar</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    )

}