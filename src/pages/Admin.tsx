import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Lock, FileText, Package, Users, Settings, Layout, Database } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import SupabaseConfig from "@/components/SupabaseConfig";
import AdminBlogList from "@/components/admin/AdminBlogList";
import BlogEditor from "@/components/admin/BlogEditor";
import ThemeBuilder from "@/components/admin/ThemeBuilder";
import type { BlogPost } from "@/types/blog";

// Keep the Admin component implementation the same, but with a few modifications
const Admin = () => {
  const { user, isAdmin, loading, demoMode } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supabaseAvailable, setSupabaseAvailable] = useState<boolean | null>(null);
  const [adminView, setAdminView] = useState<"list" | "edit" | "new">("list");
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("blog");
  
  // Check Supabase configuration on component mount
  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const isConfigured = await isSupabaseConfigured();
        setSupabaseAvailable(isConfigured);
        
        if (!isConfigured && !demoMode) {
          toast({
            title: "Supabase Connection Failed",
            description: "Unable to connect to Supabase. Please configure your database connection.",
            variant: "destructive"
          });
        }
      } catch (error) {
        setSupabaseAvailable(false);
        console.error("Error checking Supabase configuration:", error);
      }
    };
    
    checkSupabase();
  }, []);

  // Redirect non-admin users away (server-verified via has_role RPC).
  useEffect(() => {
    if (!loading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area",
        variant: "destructive"
      });
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, navigate, toast, loading]);

  // Blog post handling functions
  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setAdminView("edit");
  };
  
  const handleNewPost = () => {
    setSelectedPost(undefined);
    setAdminView("new");
  };
  
  const handleCancel = () => {
    setAdminView("list");
    setSelectedPost(undefined);
  };
  
  const handleSaved = () => {
    toast({
      title: adminView === "edit" ? "Post Updated" : "Post Created",
      description: adminView === "edit" 
        ? "Your blog post has been updated successfully" 
        : "Your blog post has been created successfully",
    });
    setAdminView("list");
    setSelectedPost(undefined);
  };
  
  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }
  
  // If user is not logged in, show dedicated admin login page
  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-primary text-white">
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="mt-1 text-primary-foreground">Sign in to access the admin dashboard</p>
            </div>
            
            <div className="p-6">
              <AdminLoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hard gate: never render admin UI for non-admin users. `isAdmin` is
  // set from the server-side `public.has_role` RPC in AuthContext, so this
  // check cannot be bypassed by client state manipulation — the effect above
  // also redirects them away.
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTitle>Admins only</AlertTitle>
              <AlertDescription>
                Your account does not have the admin role. If you believe this
                is a mistake, contact a workspace administrator.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return to Website</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show Supabase configuration page if connection failed
  if (supabaseAvailable === false && !demoMode) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6" variant="destructive">
              <AlertTitle>Supabase Connection Error</AlertTitle>
              <AlertDescription>
                Unable to connect to Supabase. Please check your Supabase configuration below.
              </AlertDescription>
            </Alert>
            <p className="mb-6">
              To use the full functionality of the admin panel, please configure your Supabase connection.
              You'll need your Supabase URL and anon key from your Supabase project settings.
            </p>
            <SupabaseConfig />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show demo mode warning if in demo mode
  const showDemoWarning = demoMode && !loading;

  // Admin panel content management interface
  if (adminView === "edit" || adminView === "new") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {adminView === "edit" ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          {showDemoWarning && (
            <Alert className="mb-6" variant="warning">
              <AlertTitle>Demo Mode Active</AlertTitle>
              <AlertDescription>
                You are working in demo mode. Changes won't be saved to a real database.
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 font-medium" 
                  onClick={() => setActiveTab("settings")}
                >
                  Configure Supabase
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <BlogEditor 
            post={selectedPost} 
            onCancel={handleCancel} 
            onSave={handleSaved}
          />
        </div>
      </div>
    );
  }

  // Main admin dashboard view
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">View Website</Link>
          </Button>
        </div>

        {showDemoWarning && (
          <Alert className="mb-6" variant="warning">
            <AlertTitle>Demo Mode Active</AlertTitle>
            <AlertDescription>
              You are currently in demo mode because Supabase connection failed. Some features may be limited.
              Go to Settings tab to configure your Supabase connection.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="blog" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Blog
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Users
            </TabsTrigger>
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Layout className="h-4 w-4" /> Theme Builder
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-4">
            <AdminBlogList onEdit={handleEditPost} onNew={handleNewPost} />
          </TabsContent>
          
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Product management functionality will be implemented soon.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    User management functionality will be implemented soon.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="theme">
            <ThemeBuilder />
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <SupabaseConfig />
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Other Settings</h3>
                  <Alert>
                    <AlertDescription>
                      Additional site settings functionality will be implemented soon.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Create a dedicated admin login component that works directly on the admin page
function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, demoMode } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast({
        title: "Login Successful",
        description: demoMode 
          ? "Welcome to the admin dashboard (Demo Mode)" 
          : "Welcome to the admin dashboard",
      });
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="pt-2">
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Log In to Admin"}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <Button variant="link" asChild className="p-0">
          <a href="/">Return to Website</a>
        </Button>
      </div>
    </form>
  );
}

export default Admin;
