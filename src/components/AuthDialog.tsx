import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import type { AuthFormData } from "@/types/auth";
import { z } from "zod";
import { Loader2, UserCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation, useNavigate } from "react-router-dom";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

export function AuthDialog({ isFullPage = false }: { isFullPage?: boolean }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(isFullPage);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user, signOut } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Detect if we're coming from admin page
  useEffect(() => {
    // Store the path we should redirect to after login
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
    
    // If we're on the admin page directly, set redirect to /admin
    if (location.pathname === '/admin' && !redirect) {
      setRedirectPath('/admin');
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
    // Clear login error when typing
    if (loginError) {
      setLoginError(null);
    }
  };

  const validateForm = () => {
    try {
      if (isRegister) {
        registerSchema.parse(formData);
      } else {
        loginSchema.parse(formData);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      if (isRegister) {
        await signUp(formData.email, formData.password, formData.name || "");
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signIn(formData.email, formData.password);
        toast({
          title: "Login Successful",
          description: "Welcome back to TechStore!",
        });
        
        // Handle redirection to admin if needed
        if (redirectPath) {
          navigate(redirectPath);
        }
      }
      
      // Only close dialog if not in full page mode
      if (!isFullPage) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setLoginError(error instanceof Error ? error.message : "Failed to authenticate. Try using the demo credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    // If user is logged in and in full page mode, redirect to admin
    if (isFullPage) {
      useEffect(() => {
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          navigate('/admin');
        }
      }, []);
      
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2">
        <span className="hidden md:inline text-sm text-muted-foreground">
          Welcome back!
        </span>
        <Button variant="outline" onClick={() => signOut()} className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  // Full page login form
  if (isFullPage) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-primary text-white">
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="mt-1 text-primary-foreground">Sign in to access the admin panel</p>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password}</p>
                  )}
                </div>

                {loginError && (
                  <Alert className="bg-destructive/10 text-destructive">
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}

                <div className="pt-2">
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="link" asChild className="p-0">
                    <a href="/">Return to Website</a>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular dialog version for non-fullpage
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {isRegister ? "Create Account" : "Sign In"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {loginError ? (
              <Alert className="mt-2 bg-destructive/10 text-destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            ) : null}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isRegister && (
            <div className="space-y-2">
              <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className={errors.password ? "text-destructive" : ""}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4 pt-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRegister ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                isRegister ? "Create Account" : "Sign In"
              )}
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrors({});
                setLoginError(null);
              }}
              disabled={loading}
            >
              {isRegister
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
