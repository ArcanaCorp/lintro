'use client'
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/layout/Navbar";
import Header from "@/layout/Header";
import { Toaster } from "sonner";

export default function DashboardLayout ({ children }) {

    const { user } = useAuth();

    return (
    
        <>

            <div className="flex flex-col-reverse">

                <NavBar user={user?.user_metadata} />

                <main className="w h bg-background" style={{"--w": "100%", "--h": "calc(100dvh - 60px)"}}>
                    <Header user={user?.user_metadata}/>
                    <div className="w h py-md" style={{"--w": "100%", "--h": "calc(100dvh - 120px)", overflowY: 'auto'}}>{children}</div>
                </main>

            </div>

            <Toaster position="top-left" duration={5000} richColors />

        </>
    
    )

}