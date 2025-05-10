
import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wzhdxunnuenmlzypbeih.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: After connecting to Supabase through the Lovable integration,
// you'll need to set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// environment variables in your Supabase project settings.
