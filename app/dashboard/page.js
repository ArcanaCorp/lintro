'use client'

import Information from "@/components/dashboard/Information";
import Links from "@/components/dashboard/Links";
import Photo from "@/components/dashboard/Photo";
import Socials from "@/components/dashboard/Socials";
import { useAuth } from "@/context/AuthContext"

export default function DashbordPage () {

    const { profile } = useAuth();

    return (

        <div className="w-full">
        
            <section className="w-full">
                <div className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                    <Photo profile={profile} />
                    <Information profile={profile} />                    
                    <Socials/>
                </div>
            </section>

            <Links/>
        
        </div>

    )

}