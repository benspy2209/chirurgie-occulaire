import { createClient } from '@supabase/supabase-js';

// Helper to safely get env vars without crashing if import.meta.env is undefined
const getEnv = (key: string) => {
  const meta = import.meta as any;
  return meta.env?.[key];
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

// Initialize client with fallbacks to prevent runtime crash "URL is required"
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);