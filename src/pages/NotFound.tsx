
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ThemeTemplate from "@/components/ThemeTemplate";
import { HomeIcon, ShoppingBagIcon, PhoneIcon } from "lucide-react";
import { useThemeBuilder } from "@/context/ThemeBuilderContext";

const NotFound = () => {
  const { getTemplateByType } = useThemeBuilder();
  const hasCustomTemplate = getTemplateByType("error_404");

  // If we have a custom template, use it instead of the default one
  if (hasCustomTemplate) {
    return (
      <PageLayout showBreadcrumbs={false}>
        <ThemeTemplate type="error_404" />
      </PageLayout>
    );
  }

  // Default 404 page
  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-muted">404</h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button asChild variant="default" size="lg" className="flex gap-2">
            <Link to="/">
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex gap-2">
            <Link to="/products">
              <ShoppingBagIcon className="w-4 h-4" />
              Browse Products
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="flex gap-2">
            <Link to="/contact">
              <PhoneIcon className="w-4 h-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
