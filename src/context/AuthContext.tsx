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

// Admin credentials for demo purposes
const ADMIN_EMAIL = "tearkey@admin.com";
const ADMIN_PASSWORD = "tearkey";

// Demo user object for when Supabase is not available
const DEMO_ADMIN_USER = {
  id: "demo-admin-id",
  email: ADMIN_EMAIL,
  user_metadata: {
    name: "Admin User",
    role: "admin"
  },
  app_metadata: {
    role: "admin"
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [connectionChecked, setConnectionChecked] = useState(false);
  const { toast } = useToast();

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
        
        // Check if current user is admin
        if (currentUser?.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
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
        
        // Check if current user is admin
        if (currentUser?.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
      
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [connectionChecked, demoMode]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Special case for demo admin login when Supabase is not available
      if (demoMode && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Use demo admin user
        setUser(DEMO_ADMIN_USER as unknown as User);
        setIsAdmin(true);
        toast({
          title: "Demo Admin Login Successful",
          description: "You are now logged in as an administrator in demo mode",
        });
        setLoading(false);
        return;
      }
      
      // Regular Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // If admin credentials are used but the account doesn't exist in Supabase
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD && error.message.includes("Invalid login credentials")) {
          try {
            // Create the admin account
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  name: "Admin User",
                  role: "admin",
                }
              }
            });
            
            if (signUpError) throw signUpError;
            
            // Try login again
            const { error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password
            });
            
            if (retryError) throw retryError;
          } catch (createError) {
            console.error("Failed to create admin account:", createError);
            // Fall back to demo mode for admin
            setDemoMode(true);
            setUser(DEMO_ADMIN_USER as unknown as User);
            setIsAdmin(true);
            toast({
              title: "Demo Admin Login",
              description: "Logged in as admin in demo mode since Supabase account creation failed.",
            });
            return;
          }
        } else {
          // Handle other login errors
          throw error;
        }
      }
      
      // Check if user is admin
      if (data?.user?.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      }
      
      toast({
        title: "Login Successful",
        description: isAdmin ? "You are logged in as an administrator" : "You are now logged in",
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
