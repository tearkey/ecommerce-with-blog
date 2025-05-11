
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPostBySlug } from "@/lib/blog";

// Map of route paths to their display names
const routeNames: Record<string, string> = {
  "products": "Products",
  "checkout": "Checkout",
  "blog": "Blog",
  "contact": "Contact",
  "returns": "Returns Policy",
  "shipping": "Shipping Information",
  "about": "About Us",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
  "support": "Support",
  "offers": "Special Offers",
  "new-products": "New Products",
  "admin": "Admin Dashboard"
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't render breadcrumbs on homepage
  if (location.pathname === "/") {
    return null;
  }

  // Extract blog post slug if present
  const isBlogPost = pathnames.length === 2 && pathnames[0] === "blog";
  const blogPostSlug = isBlogPost ? pathnames[1] : null;

  // If this is a blog post page, fetch the title
  const { data: blogPost } = useQuery({
    queryKey: ['breadcrumbBlogPost', blogPostSlug],
    queryFn: () => {
      if (!blogPostSlug) return null;
      return getBlogPostBySlug(blogPostSlug);
    },
    enabled: !!blogPostSlug,
  });
  
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="transition-colors hover:text-foreground">
              <HomeIcon className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          // Special handling for blog posts
          if (isLast && blogPost && isBlogPost) {
            return (
              <BreadcrumbItem key={to}>
                <BreadcrumbPage>{blogPost.title}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          
          // Either use the mapped name from routeNames or capitalize the first letter
          const displayName = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
          
          return (
            <BreadcrumbItem key={to}>
              {isLast ? (
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={to} className="transition-colors hover:text-foreground">
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
