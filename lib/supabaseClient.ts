import { createClient } from "@supabase/supabase-js";

// ⚠️ ACCÈS DIRECT ET STATIQUE (OBLIGATOIRE POUR VITE)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Diagnostic clair
console.log("Supabase Config Check:", {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlPrefix: supabaseUrl ? supabaseUrl.slice(0, 15) + "..." : "MISSING",
});

// 🔴 En prod, on NE CONTINUE PAS sans config valide
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "CRITICAL: Supabase environment variables are missing. Check Netlify Environment Variables."
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);