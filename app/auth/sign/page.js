'use client';
import { Suspense } from 'react'
import FormSign from './FormSign';

export default function Sign () {

    return (

        <Suspense fallback={'Cargando...'}>
            <FormSign/>
        </Suspense>

    )

}