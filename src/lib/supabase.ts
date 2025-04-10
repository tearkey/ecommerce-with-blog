
import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = 'https://wzhdxunnuenmlzypbeih.supabase.co';
const supabaseAnonKey = 'placeholder_key'; // We'll replace this later

// Create a temporary mock client to prevent errors
// This allows the app to run without Supabase connection
const createMockClient = () => {
  return {
    auth: {
      signInWithPassword: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: { session: null }, error: null }),
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ 
        data: { 
          subscription: { 
            unsubscribe: () => {} 
          } 
        } 
      }),
    }
  };
};

// Use mock client for now - cast to unknown first to fix the TypeScript error
export const supabase = createMockClient() as unknown as ReturnType<typeof createClient>;

// To enable real Supabase connection later, replace the above line with:
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
