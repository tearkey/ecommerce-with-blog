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
  isAdmin: boolean;
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
  const { toast } = useToast();

  useEffect(() => {
    // Check if we can connect to Supabase
    const checkSupabase = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        // Check if current user is admin
        if (currentUser?.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
        setDemoMode(false);
      } catch (error) {
        console.log("Supabase connection failed, enabling demo mode");
        setDemoMode(true);
      } finally {
        setLoading(false);
      }
    };

    checkSupabase();

    // Listen for changes on auth state if not in demo mode
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (demoMode) return;
      
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
  }, [demoMode]);

  const signIn = async (email: string, password: string) => {
    try {
      // Special case for demo admin login when Supabase is not available
      if (demoMode && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Use demo admin user
        setUser(DEMO_ADMIN_USER as unknown as User);
        setIsAdmin(true);
        toast({
          title: "Demo Admin Login Successful",
          description: "You are now logged in as an administrator in demo mode",
        });
        return;
      }
      
      // If not in demo mode or not the demo admin, try normal Supabase login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        try {
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
              
              if (retryError) {
                // If we still can't login, switch to demo mode
                setDemoMode(true);
                setUser(DEMO_ADMIN_USER as unknown as User);
                setIsAdmin(true);
                toast({
                  title: "Demo Admin Login Successful",
                  description: "You are now logged in as an administrator in demo mode",
                });
                return;
              }
            } else {
              // Handle other errors - if Supabase can't connect, use demo mode
              setDemoMode(true);
              if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                setUser(DEMO_ADMIN_USER as unknown as User);
                setIsAdmin(true);
                toast({
                  title: "Demo Admin Login Successful",
                  description: "You are now logged in as an administrator in demo mode",
                });
              } else {
                throw error;
              }
              return;
            }
          }
          
          setIsAdmin(true);
          toast({
            title: "Admin Login Successful",
            description: "You are now logged in as an administrator",
          });
        } catch (error) {
          // If there's an error with Supabase, fall back to demo mode
          console.error("Sign in error with Supabase, using demo mode:", error);
          setDemoMode(true);
          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setUser(DEMO_ADMIN_USER as unknown as User);
            setIsAdmin(true);
            toast({
              title: "Demo Admin Login Successful",
              description: "You are now logged in as an administrator in demo mode",
            });
          } else {
            throw error;
          }
        }
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
    }
  };

  const signOut = async () => {
    try {
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
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
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
