
import { createClient } from '@supabase/supabase-js';

// Temporary null client to prevent URL construction errors
export const supabase = {
  auth: {
    signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
    signUp: async () => ({ error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: new Error('Supabase not configured') }),
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ 
      data: { 
        subscription: { 
          unsubscribe: () => {} 
        } 
      } 
    }),
  }
} as any;

// TODO: Uncomment and configure once Supabase is set up
// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
