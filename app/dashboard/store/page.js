'use client';

import FormCreateProduct from "@/components/dashboard/FormCreateProduct";
import Products from "@/components/dashboard/Products";
import { useAuth } from "@/context/AuthContext"
import { IconCamera, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function StorePage () {

    const { profile } = useAuth();
    const [ modal, setModal ] = useState(false);

    const toggleModal = () => setModal(!modal);

    return (

        <>
            <div className="w-full flex flex-col gap-md">
                <section className="w-full">
                    <div className="w m-auto flex flex-col gap-md" style={{"--w": "90%"}}>
                        <div className="w-full flex items-center gap-md">
                            <picture className="block w h rounded-full" style={{"--w": "80px", "--mnw": "80px", "--h": "80px"}}>
                                <img className="w-full h-full rounded-full" src={profile?.avatar_url} />
                            </picture>
                            <div>
                                <h3>{profile?.name}</h3>
                                <p className="text-sm text-muted">{profile?.bio}</p>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={toggleModal}>Añadir producto</button>
                    </div>
                </section>
                <section className="w-full">
                    <Products/>
                </section>
            </div>
            {modal && (
                <div className="absolute w-screen h-screen center inset" style={{background: 'rgba(0 0 0 / .2)'}}>
                    <div className="w p-md rounded-md bg-white lg:w" style={{"--w": "60%", "--w-lg": "40%"}}>
                        <div className="w-full flex items-center justify-between">
                            <h3>Agregar nuevo producto</h3>
                            <button className="center w h rounded-full" style={{"--w": "40px", "--mnw": "40px", "--h": "40px"}} onClick={toggleModal}><IconX/></button>
                        </div>
                        <FormCreateProduct closed={toggleModal} />
                    </div>
                </div>
            )}
        </>

    )

}