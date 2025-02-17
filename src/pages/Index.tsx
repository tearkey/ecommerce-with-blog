import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Laptop, 
  Monitor, 
  Cpu, 
  Mouse, 
  Keyboard, 
  HardDrive, 
  ShoppingCart, 
  Search,
  Menu
} from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = () => {
    toast({
      title: "Search",
      description: "Search functionality coming soon!",
    });
  };

  const categories = [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Laptops & Notebooks",
      description: "Latest laptops from top brands",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Desktop PCs & Monitors",
      description: "Complete desktop solutions",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Components",
      description: "CPUs, GPUs, Motherboards & more",
    },
    {
      icon: <Mouse className="w-6 h-6" />,
      title: "Peripherals",
      description: "Mice, keyboards & accessories",
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "Storage",
      description: "HDDs, SSDs & external drives",
    },
    {
      icon: <Keyboard className="w-6 h-6" />,
      title: "Gaming Gear",
      description: "Gaming peripherals & accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">TechStore</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your One-Stop Tech Shop
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover the latest in computer technology with our wide range of products
              and unbeatable prices.
            </p>
            <Button size="lg" className="mt-8">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/products')}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Products Section Placeholder */}
      <div className="container mx-auto px-4 py-16 bg-secondary/10">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="text-center text-muted-foreground">
          Featured products section coming soon!
        </div>
      </div>

      {/* Footer */}
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
                <li>Contact Us</li>
                <li>Returns</li>
                <li>Shipping Info</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Special Offers</li>
                <li>New Products</li>
                <li>Support Center</li>
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
        </div>
      </footer>
    </div>
  );
};

export default Index;
