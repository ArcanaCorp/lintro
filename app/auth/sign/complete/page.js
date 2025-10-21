'use client'

import { Suspense } from 'react';
import Form from './Form';

export default function Complete () {

    return (

        <Suspense fallback={'Cargando formulario'}>
            <Form/>
        </Suspense>

    )

}