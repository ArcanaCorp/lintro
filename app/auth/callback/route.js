import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SUPABASE } from '@/config/config'

export async function GET(request) {
    
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const cookieStore = cookies()

        const supabase = createServerClient(SUPABASE.URL, SUPABASE.KEY, {
            cookies: {
            get: (name) => cookieStore.get(name)?.value,
            set: (name, value, options) => {
                cookieStore.set({ name, value, ...options })
            },
            remove: (name, options) => {
                cookieStore.set({ name, value: '', ...options })
            },
            },
        })

        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(origin)
}