import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SupabaseConfig from "@/components/SupabaseConfig";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const Index = () => {
  // Check if Supabase is properly configured
  const { data: supabaseConfigured } = useQuery({
    queryKey: ['supabase-check'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('products').select('id').limit(1);
        if (error && error.message.includes('Invalid API')) {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    },
  });

  const featuredCategories = [
    {
      name: "Laptops & Notebooks",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      description: "Powerful laptops for work and gaming"
    },
    {
      name: "Desktop PCs",
      image: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      description: "High-performance desktop computers"
    },
    {
      name: "Monitors",
      image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      description: "Stunning displays for productivity and gaming"
    },
    {
      name: "Peripherals",
      image: "https://images.unsplash.com/photo-1625723443741-e974ce5cdb41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
      description: "Keyboards, mice, and other accessories"
    },
  ];

  return (
    <PageLayout showBreadcrumbs={false}>
      {/* Show Supabase Config Component if not configured */}
      {supabaseConfigured === false && <SupabaseConfig />}
      
      {/* Hero Section */}
      <section className="relative pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg -z-10" />
        <div className="container mx-auto py-16 px-4 sm:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                The Ultimate Tech Store
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Discover cutting-edge technology with our extensive selection of computers, components, and accessories.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">Shop All Products</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/new-products">View Latest Arrivals</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Featured Tech" 
                className="rounded-lg shadow-lg max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop By Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-12 bg-secondary/10 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take advantage of our limited-time promotions and discounts on selected products.
          </p>
          <Button size="lg" asChild>
            <Link to="/offers">View All Offers</Link>
          </Button>
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Button variant="outline" asChild>
              <Link to="/new-products">View All New Products</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically fetch from the API but we're keeping it simple */}
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="ROG Strix Gaming Laptop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">ROG Strix Gaming Laptop</h3>
                <p className="font-bold text-lg mb-2">$2,799.99</p>
                <Button className="w-full" asChild>
                  <Link to="/product/101">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Ultrawide Curved Monitor"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ultrawide Curved Monitor</h3>
                <p className="font-bold text-lg mb-2">$1,299.99</p>
                <Button className="w-full" asChild>
                  <Link to="/product/102">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-12 bg-primary/5 rounded-lg mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our customer support team is available to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/support">Visit Support Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
