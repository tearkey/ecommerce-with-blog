import { createClient } from '@supabase/supabase-js';

// Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client (typed loosely; the strongly-typed client lives in
// src/integrations/supabase/client.ts and should be preferred for new code).
export const supabase = createClient<any>(
  supabaseUrl || 'https://your-project.supabase.co',
  supabaseAnonKey || 'your-anon-key'
);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = async (): Promise<boolean> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing.');
    return false;
  }

  try {
    // Try a simple health check query
    const { error } = await supabase.from('products').select('count');
    
    // If we get an auth error, the keys might be wrong but Supabase is reachable
    if (error && (error.message.includes('JWT') || error.message.includes('auth'))) {
      console.warn('Supabase keys might be incorrect, but service is reachable');
      return true;
    }
    
    // If we get other errors, check if they're related to connection
    if (error && (error.message.includes('fetch') || error.message.includes('network'))) {
      console.error('Supabase connection error:', error.message);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error checking Supabase configuration:', err);
    return false;
  }
};

// Helper functions for common Supabase operations
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: Partial<{ 
  name: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

// Products related helpers
export const getProducts = async (filters: { 
  category?: string;
  isNew?: boolean;
  searchQuery?: string;
} = {}) => {
  let query = supabase.from('products').select('*');
  
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters.isNew) {
    query = query.eq('is_new', true);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Handle search query filtering client-side if provided
  // (Supabase doesn't have full-text search in the free tier)
  if (filters.searchQuery && data) {
    const searchLower = filters.searchQuery.toLowerCase();
    return data.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.description.toLowerCase().includes(searchLower)
    );
  }
  
  return data;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};
