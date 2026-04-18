import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import '@/assets/global.css'

const poppins = Poppins({
    variable: '--font-poppins-sans',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
})

export const metadata = {
    title: 'Lintro | Crea tu página en pocos click y date a conocer a tus clientes con un solo enlace.'
}

export default function RootLayout ({ children }) {

    return (

        <html lang="en">
            <body className={`${poppins.variable}`}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>

    )

}