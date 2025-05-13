
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Lock, FileText, Package, Users, Settings, Layout } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import SupabaseConfig from "@/components/SupabaseConfig";
import AdminBlogList from "@/components/admin/AdminBlogList";
import BlogEditor from "@/components/admin/BlogEditor";
import ThemeBuilder from "@/components/admin/ThemeBuilder";
import type { BlogPost } from "@/types/blog";
import { AuthDialog } from "@/components/AuthDialog";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [supabaseAvailable, setSupabaseAvailable] = useState<boolean | null>(null);
  const [adminView, setAdminView] = useState<"list" | "edit" | "new">("list");
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("blog");
  
  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const isConfigured = await isSupabaseConfigured();
        setSupabaseAvailable(isConfigured);
      } catch (error) {
        setSupabaseAvailable(false);
        console.error("Error checking Supabase configuration:", error);
      }
    };
    
    checkSupabase();
  }, []);

  // Redirect non-admin users away
  useEffect(() => {
    if (user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isAdmin, navigate, toast]);

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
  
  // If user is not logged in, show dedicated admin login page
  if (!user) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-primary text-white">
              <h1 className="text-2xl font-bold">WordPress-Style Admin Login</h1>
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
  
  if (supabaseAvailable === false) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Admin Panel Configuration Required</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertTitle>Supabase Not Configured</AlertTitle>
              <AlertDescription>
                The admin panel requires a proper Supabase connection to manage content.
                Please configure your Supabase settings below.
              </AlertDescription>
            </Alert>
            <SupabaseConfig />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel content management interface
  if (adminView === "edit" || adminView === "new") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {adminView === "edit" ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <BlogEditor 
            post={selectedPost} 
            onCancel={handleCancel} 
            onSave={handleSaved}
          />
        </div>
      </div>
    );
  }

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
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Site settings functionality will be implemented soon.
                  </AlertDescription>
                </Alert>
                <div className="mt-6">
                  <SupabaseConfig />
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
  const [email, setEmail] = useState("tearkey@admin.com");
  const [password, setPassword] = useState("tearkey");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await signIn(email, password);
      // After successful login, the page will re-render with admin dashboard
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Login error:", err);
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
      
      <div className="text-center mt-4 text-sm text-muted-foreground">
        <p>Demo credentials are pre-filled for you.</p>
        <p>Email: tearkey@admin.com</p>
        <p>Password: tearkey</p>
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
