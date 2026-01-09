import { createClient } from "@supabase/supabase-js";

// SAFELY ACCESS ENV VARS
// We check if import.meta.env exists before accessing properties to avoid runtime crashes
// in environments where it's undefined. We must keep the full 'import.meta.env.VITE_...'
// string for Vite's build-time replacement to work.

// @ts-ignore
const supabaseUrl = import.meta.env ? import.meta.env.VITE_SUPABASE_URL : '';
// @ts-ignore
const supabaseAnonKey = import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : '';

// Diagnostic logging
try {
  console.log("Supabase Config Check:", {
    // @ts-ignore
    hasEnv: typeof import.meta.env !== 'undefined',
    hasUrl: !!supabaseUrl,
    urlPrefix: supabaseUrl ? supabaseUrl.slice(0, 15) + "..." : "MISSING",
  });
} catch (e) {
  // Ignore logging errors
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("CRITICAL: Supabase environment variables are missing. Functionality will be limited.");
}

// Create client with fallback to prevent immediate crash.
// If config is missing, this will allow the app to load but API calls will fail gracefully.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);