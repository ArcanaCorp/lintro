'use client'

import Information from "@/components/dashboard/Information";
import Links from "@/components/dashboard/Links";
import Photo from "@/components/dashboard/Photo";
import { useAuth } from "@/context/AuthContext"

export default function DashbordPage () {

    const { profile } = useAuth();

    return (

        <>
        
            <section className="w-full">
                <div className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                    <Photo profile={profile} />
                    <Information profile={profile} />                    
                    <div className="w-full bg-white border rounded-md p-md">
                        <h3 className="text-sm mb-md">Redes sociales</h3>
                        <div className="w-full flex flex-col gap-md">
                            <button className="btn btn-primary">Agregar redes sociales</button>
                        </div>
                    </div>
                </div>
            </section>

            <Links/>
        
        </>

    )

}