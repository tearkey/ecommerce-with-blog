import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  demoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [connectionChecked, setConnectionChecked] = useState(false);
  const { toast } = useToast();

  // Verify admin status server-side using the user_roles table.
  const checkIsAdmin = async (userId: string | undefined) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data, error } = await (supabase as any).rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      if (error) throw error;
      setIsAdmin(!!data);
    } catch (e) {
      console.error("Failed to verify admin role:", e);
      setIsAdmin(false);
    }
  };

  // Initial check for Supabase configuration
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const isConfigured = await isSupabaseConfigured();
        if (!isConfigured) {
          console.warn("Supabase not properly configured, enabling demo mode");
          setDemoMode(true);
          toast({
            title: "Demo Mode Activated",
            description: "Supabase connection failed. Using demo mode with limited functionality.",
            variant: "warning",
          });
        } else {
          setDemoMode(false);
        }
      } catch (error) {
        console.error("Error checking Supabase:", error);
        setDemoMode(true);
      } finally {
        setConnectionChecked(true);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  // Set up auth state monitoring after checking connection
  useEffect(() => {
    if (!connectionChecked) return;
    
    const initializeAuth = async () => {
      setLoading(true);
      
      if (demoMode) {
        // In demo mode, we just initialize with no user
        setUser(null);
        setLoading(false);
        return;
      }
      
      try {
        // Get session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        
        setUser(currentUser);
        await checkIsAdmin(currentUser?.id);
      } catch (error) {
        console.error("Error initializing auth:", error);
        // If we can't connect to Supabase for auth, enable demo mode
        setDemoMode(true);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
    
    // Set up auth state change listener
    if (!demoMode) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        // Defer the admin check to avoid deadlocks with the auth listener
        setTimeout(() => {
          checkIsAdmin(currentUser?.id);
        }, 0);
      });
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [connectionChecked, demoMode]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Regular Supabase login — no client-side admin bootstrap or hardcoded credentials.
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      await checkIsAdmin(data?.user?.id);

      toast({
        title: "Login Successful",
        description: "You are now logged in",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      if (demoMode) {
        toast({
          title: "Demo Mode",
          description: "User registration is not available in demo mode.",
        });
        return;
      }

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
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      // In demo mode, just clear the user state
      if (demoMode) {
        setUser(null);
        setIsAdmin(false);
        toast({
          title: "Signed out successfully",
        });
        return;
      }

      // Normal Supabase sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      isAdmin,
      demoMode
    }}>
      {children}
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
