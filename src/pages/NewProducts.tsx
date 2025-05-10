
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingCart, SortAsc, SortDesc } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const NewProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Fetch new products from Supabase
  const { data: fetchedProducts = [], isLoading, error } = useQuery({
    queryKey: ['new-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_new', true);
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Fallback products if no data is fetched from Supabase
  const newProducts: Product[] = [
    {
      id: "101",
      name: "ROG Strix Gaming Laptop",
      description: "Latest gaming laptop with RTX 4080 and premium cooling",
      price: 2799.99,
      category: "Laptops & Notebooks",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      stock: 7,
      specifications: {
        processor: "Intel Core i9-13900H",
        memory: "32GB DDR5",
        storage: "2TB NVMe SSD",
        display: "17.3\" 240Hz QHD"
      },
      is_new: true
    },
    {
      id: "102",
      name: "Ultrawide Curved Monitor",
      description: "49-inch super ultrawide curved gaming monitor",
      price: 1299.99,
      category: "Monitors",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      stock: 12,
      specifications: {
        resolution: "5120x1440",
        refreshRate: "240Hz",
        responseTime: "1ms",
        panel: "Mini-LED"
      },
      is_new: true
    },
    {
      id: "103",
      name: "Wireless Mechanical Keyboard",
      description: "Low-latency gaming mechanical keyboard with customizable RGB",
      price: 149.99,
      category: "Peripherals",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      stock: 25,
      specifications: {
        switches: "Optical Mechanical",
        connectivity: "2.4GHz / Bluetooth 5.0",
        battery: "Up to 80 hours",
        features: "Hot-swappable switches"
      },
      is_new: true
    },
    {
      id: "104",
      name: "Compact Gaming PC",
      description: "Small form factor gaming PC with RTX 4070",
      price: 1899.99,
      category: "Desktop PCs",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      stock: 5,
      specifications: {
        processor: "AMD Ryzen 9 7900X",
        graphics: "NVIDIA RTX 4070",
        memory: "32GB DDR5",
        storage: "1TB NVMe SSD"
      },
      is_new: true
    }
  ];

  // Use fetched products if available, otherwise use the fallback products
  const displayProducts = fetchedProducts.length > 0 ? fetchedProducts : newProducts;

  // Get all categories from products
  const categories = [...new Set(displayProducts.map(p => p.category))];

  // Filter by price range
  const filteredProducts = displayProducts.filter(product => {
    if (priceRange === "all") return true;
    if (priceRange === "under500" && product.price < 500) return true;
    if (priceRange === "500to1000" && product.price >= 500 && product.price <= 1000) return true;
    if (priceRange === "1000to2000" && product.price > 1000 && product.price <= 2000) return true;
    if (priceRange === "over2000" && product.price > 2000) return true;
    return false;
  });

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">New Arrivals</h1>
      </div>
      
      <div className="mb-8 p-4 bg-primary/5 rounded-lg">
        <p className="text-lg">
          Check out our latest tech products that just hit the shelves. Be the first to get your hands on cutting-edge technology!
        </p>
      </div>
      
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="bg-secondary/10 p-4 rounded-lg flex-grow">
          <h2 className="font-semibold mb-4">Price Range</h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={priceRange === "all" ? "default" : "outline"}
              onClick={() => setPriceRange("all")}
              className="text-sm"
            >
              All Prices
            </Button>
            <Button 
              variant={priceRange === "under500" ? "default" : "outline"}
              onClick={() => setPriceRange("under500")}
              className="text-sm"
            >
              Under $500
            </Button>
            <Button 
              variant={priceRange === "500to1000" ? "default" : "outline"}
              onClick={() => setPriceRange("500to1000")}
              className="text-sm"
            >
              $500 - $1000
            </Button>
            <Button 
              variant={priceRange === "1000to2000" ? "default" : "outline"}
              onClick={() => setPriceRange("1000to2000")}
              className="text-sm"
            >
              $1000 - $2000
            </Button>
            <Button 
              variant={priceRange === "over2000" ? "default" : "outline"}
              onClick={() => setPriceRange("over2000")}
              className="text-sm"
            >
              Over $2000
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="h-full"
          >
            {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </Button>
          <span className="text-sm whitespace-nowrap">
            Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </span>
        </div>
      </div>
      
      {/* Loading and Error states */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <p>Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8">
          <p>Error loading products. Please try again later.</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <div className="relative">
              <Link to={`/product/${product.id}`} className="aspect-square relative hover:opacity-90 transition-opacity block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </Link>
              <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-muted-foreground">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    asChild
                  >
                    <Link to={`/product/${product.id}`}>View Details</Link>
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedProducts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default NewProducts;
