import { Poppins } from "next/font/google"

const poppins = Poppins({
    variable: '--font-poppins-sans',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
})

export const metadata = {
    title: 'AAPRODEH | Lintro | Crea tu página en pocos click y date a conocer a tus clientes con un solo enlace.'
}

export default function SlugLayout ({ children }) {

    return (

        <html lang="en">
            <body className={`${poppins.variable}`}>{children}</body>
        </html>

    )

}