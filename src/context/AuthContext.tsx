
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean; // Added to check admin status
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials for demo purposes
const ADMIN_EMAIL = "tearkey@admin.com";
const ADMIN_PASSWORD = "tearkey";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Check if current user is admin
        if (currentUser?.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Check if current user is admin
      if (currentUser?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Special case for demo admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // For demo purposes, simulate admin login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          // If the admin account doesn't exist yet in Supabase, create it
          if (error.message.includes("Invalid login credentials")) {
            // Try to create the admin account
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name: "Admin User",
                  role: "admin",
                },
              },
            });
            
            if (signUpError) throw signUpError;
            
            // Try login again
            const { error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            if (retryError) throw retryError;
          } else {
            throw error;
          }
        }
        
        setIsAdmin(true);
        toast({
          title: "Admin Login Successful",
          description: "You are now logged in as an administrator",
        });
        return;
      }

      // Regular user login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
