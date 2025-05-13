
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search,
  Menu,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/CartSheet";
import { AuthDialog } from "@/components/AuthDialog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

interface SearchFormValues {
  query: string;
}

const PageLayout = ({ children, showBreadcrumbs = true }: PageLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearching, setIsSearching] = useState(false);
  const { user, isAdmin } = useAuth();

  // Don't show breadcrumbs on blog post pages since they have custom breadcrumbs
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/';
  const shouldShowBreadcrumbs = showBreadcrumbs && !isBlogPost;

  const form = useForm<SearchFormValues>({
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    if (!data.query.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to products page with search query
    navigate(`/products?search=${encodeURIComponent(data.query)}`);
    form.reset();
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
              <Link to="/" className="text-2xl font-bold">TechStore</Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                    <FormField
                      control={form.control}
                      name="query"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <input
                              type="text"
                              placeholder="Search products..."
                              className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      type="submit"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </div>
              <Link to="/products">
                <Button variant="outline">Products</Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline">Blog</Button>
              </Link>
              
              {/* Admin link - only show if user is admin */}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              
              {/* If not logged in and on the admin page, we show a special login button */}
              {!user && location.pathname === "/admin" ? (
                <Link to="/admin">
                  <Button>Admin Login</Button>
                </Link>
              ) : (
                <>
                  <CartSheet />
                  <AuthDialog />
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {shouldShowBreadcrumbs && <Breadcrumbs />}
          {children}
        </div>
      </main>

      <footer className="bg-secondary border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-muted-foreground">Your trusted source for computer hardware and accessories.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link to="/returns" className="hover:underline">Returns</Link></li>
                <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/offers" className="hover:underline">Special Offers</Link></li>
                <li><Link to="/new-products" className="hover:underline">New Products</Link></li>
                <li><Link to="/support" className="hover:underline">Support</Link></li>
                <li><Link to="/admin" className="hover:underline">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-muted-foreground mb-4">Subscribe to receive updates and special offers!</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} TechStore. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Service</Link>
              <Link to="/about" className="hover:underline">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
