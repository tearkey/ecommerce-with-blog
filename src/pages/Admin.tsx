
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Lock className="h-5 w-5" /> Admin Login
              </h1>
              <p className="mt-1 text-primary-foreground">Please sign in to access the admin panel</p>
            </div>
            
            <div className="p-6 space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="space-y-1">
                  <p>For demo purposes:</p>
                  <p className="font-medium">Email: <span className="font-mono">tearkey@admin.com</span></p>
                  <p className="font-medium">Password: <span className="font-mono">tearkey</span></p>
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col gap-4">
                <AuthDialog />
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">or</span>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/">Return to Website</Link>
                </Button>
              </div>
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

export default Admin;
