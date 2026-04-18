import { SUPABASE } from "@/config/config";
import { createBrowserClient } from "@supabase/ssr";

export const db = createBrowserClient(SUPABASE.URL, SUPABASE.KEY);