'use client'

import { useAuth } from "@/context/AuthContext"

export default function DashbordPage () {

    const { user } = useAuth();

    console.log(user);
    

    return (

        <div>
            <h1>Bievenido {user?.name} - @{user?.username}</h1>
        </div>

    )

}