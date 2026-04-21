'use client'
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/layout/Navbar";
import Header from "@/layout/Header";
import { Toaster } from "sonner";
import Mobile from "@/components/dashboard/Mobile";

export default function DashboardLayout ({ children }) {

    const { user, profile } = useAuth();

    return (
    
        <>

            <div className="flex flex-col-reverse lg:flex-row">

                <NavBar user={user?.user_metadata} profile={profile} />

                <main className="w h bg-background" style={{"--w": "100%", "--h": "calc(100dvh - 60px)"}}>
                    <Header user={user?.user_metadata} profile={profile} />
                    <div className="w h py-md lg:h lg:flex" style={{"--w": "100%", "--h": "calc(100dvh - 120px)", "--h-lg": "calc(100dvh - 60px)", overflowY: 'auto'}}>
                        {children}
                        <Mobile profile={profile} />
                    </div>
                </main>

            </div>

            <Toaster position="top-left" duration={5000} richColors />

        </>
    
    )

}