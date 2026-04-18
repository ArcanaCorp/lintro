import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { SUPABASE } from "./config/config";

export async function proxy (req) {
    
    const res = NextResponse.next();

    const supabase = createServerClient(SUPABASE.URL, SUPABASE.KEY, {
        cookies: {
            get(name) {
                return req.cookies.get(name)?.value;
            },
            set(name, value, options) {
                res.cookies.set(name, value, options);
            },
            remove(name, options) {
                res.cookies.set(name, "", options);
            },
        },
    });

    const { name: { user } } = await supabase.auth.getUser();

    const isAuth = !!user;
    const { pathname } = req.nextUrl;

    const publicRoutes = ["/", "/auth", "/recover", "/legal"];
    const isPublic = publicRoutes.includes(pathname);

    if (!isAuth && !isPublic) return NextResponse.redirect(new URL("/", req.url));

    if (isAuth && pathname === '/') return NextResponse.redirect(new URL("/dashboard", req.url));

    return res;

}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};