import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE } from '@/config/config';


const supabaseAdmin = createClient(SUPABASE.URL, SUPABASE.SECRET, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


const ALLOWED_EVENTS = [
    'page_view',
    'product_view',
    'search',
    'add_to_cart',
    'remove_from_cart',
    'open_cart',
    'whatsapp_checkout',
];


export async function POST(request) {

    try {

        const body = await request.json();


        const {
            user_id,
            visitor_id,
            session_id,
            event_name,
            path,
            referrer,
            product_id,
            value,
            search_query,
            metadata = {},
        } = body;


        /*
        |--------------------------------------------------------------------------
        | Validaciones
        |--------------------------------------------------------------------------
        */

        if (
            !UUID_REGEX.test(user_id) ||
            !UUID_REGEX.test(visitor_id) ||
            !UUID_REGEX.test(session_id)
        ) {

            return NextResponse.json(
                {
                    error: 'Identificadores inválidos',
                },
                {
                    status: 400,
                }
            );

        }


        if (
            !ALLOWED_EVENTS.includes(event_name)
        ) {

            return NextResponse.json(
                {
                    error: 'Evento no permitido',
                },
                {
                    status: 400,
                }
            );

        }


        if (
            product_id &&
            !UUID_REGEX.test(product_id)
        ) {

            return NextResponse.json(
                {
                    error: 'Producto inválido',
                },
                {
                    status: 400,
                }
            );

        }


        const numericValue =
            value === null ||
            value === undefined
                ? null
                : Number(value);


        if (
            numericValue !== null &&
            !Number.isFinite(numericValue)
        ) {

            return NextResponse.json(
                {
                    error: 'Valor inválido',
                },
                {
                    status: 400,
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | Obtener información de la petición
        |--------------------------------------------------------------------------
        */

        const userAgent =
            request.headers.get('user-agent');

        const language =
            request.headers.get('accept-language');


        /*
        |--------------------------------------------------------------------------
        | Registrar visita/sesión
        |--------------------------------------------------------------------------
        |
        | Solo se inserta una vez por:
        |
        | user_id + session_id
        |
        */

        const {
            error: visitorError,
        } = await supabaseAdmin
            .from('visitors')
            .upsert(
                {
                    user_id,

                    visitor_id,

                    session_id,

                    path:
                        path?.slice(0, 500) ||
                        '/',

                    referrer:
                        referrer?.slice(0, 1000) ||
                        null,

                    utm_source:
                        metadata?.utm_source ||
                        null,

                    utm_medium:
                        metadata?.utm_medium ||
                        null,

                    utm_campaign:
                        metadata?.utm_campaign ||
                        null,

                    utm_content:
                        metadata?.utm_content ||
                        null,

                    utm_term:
                        metadata?.utm_term ||
                        null,

                    language:
                        language
                            ?.slice(0, 100) ||
                        null,

                    user_agent:
                        userAgent
                            ?.slice(0, 1000) ||
                        null,

                    screen_width:
                        Number.isInteger(
                            metadata?.screen_width
                        )
                            ? metadata.screen_width
                            : null,

                    screen_height:
                        Number.isInteger(
                            metadata?.screen_height
                        )
                            ? metadata.screen_height
                            : null,

                    timezone:
                        metadata?.timezone ||
                        null,

                    metadata: {
                        initial_event:
                            event_name,
                    },
                },
                {
                    onConflict:
                        'user_id,session_id',

                    ignoreDuplicates:
                        true,
                }
            );


        /*
        |--------------------------------------------------------------------------
        | No bloquear analytics_events si falla visitors
        |--------------------------------------------------------------------------
        */

        if (visitorError) {

            console.error(
                'Supabase visitor error:',
                {
                    code:
                        visitorError.code,

                    message:
                        visitorError.message,

                    details:
                        visitorError.details,
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | Registrar evento
        |--------------------------------------------------------------------------
        */

        const {
            error: eventError,
        } = await supabaseAdmin
            .from('analytics_events')
            .insert({
                user_id,

                visitor_id,

                session_id,

                event_name,

                path:
                    path?.slice(0, 500) ||
                    null,

                referrer:
                    referrer
                        ?.slice(0, 1000) ||
                    null,

                product_id:
                    product_id ||
                    null,

                value:
                    numericValue,

                search_query:
                    search_query
                        ?.slice(0, 200) ||
                    null,

                metadata:
                    metadata &&
                    typeof metadata ===
                        'object' &&
                    !Array.isArray(metadata)
                        ? metadata
                        : {},
            });


        /*
        |--------------------------------------------------------------------------
        | Error del evento
        |--------------------------------------------------------------------------
        */

        if (eventError) {

            console.error(
                'Supabase analytics error:',
                {
                    code:
                        eventError.code,

                    message:
                        eventError.message,

                    details:
                        eventError.details,
                }
            );


            return NextResponse.json(
                {
                    error:
                        'No se pudo registrar el evento',

                    code:
                        eventError.code,
                },
                {
                    status: 500,
                }
            );

        }


        return NextResponse.json(
            {
                success: true,
            },
            {
                status: 201,
            }
        );


    } catch (error) {

        console.error(
            'Analytics API error:',
            error
        );


        return NextResponse.json(
            {
                error:
                    'Solicitud inválida',
            },
            {
                status: 400,
            }
        );

    }

}