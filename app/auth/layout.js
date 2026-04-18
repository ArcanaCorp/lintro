import { Toaster } from "sonner";

export default function AuthLayout ({ children }) {

    return (

        <main className='w-screen h-screen flex'>

            <section className="w-full h-inherit bg-white">
                <div className='w h m-auto flex items-center' style={{"--w": "80%","--h": "100px"}}>
                    <a href='/'><h1 className='text-3xl'>Lintro.</h1></a>
                </div>
                <div className='w m-auto' style={{"--w": "80%"}}>{children}</div>
            </section>

            <section className="w-full h-inherit none lg:block"></section>

            <Toaster position='top-center' duration={3000} richColors />

        </main>        

    )

}