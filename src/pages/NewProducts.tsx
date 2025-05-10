
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

const NewProducts = () => {
  const { addToCart } = useCart();

  const newProducts: Product[] = [
    {
      id: "101",
      name: "ROG Strix Gaming Laptop",
      description: "Latest gaming laptop with RTX 4080 and premium cooling",
      price: 2799.99,
      category: "Laptops & Notebooks",
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newProducts.map((product) => (
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
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
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
                    onClick={() => addToCart(product)}
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
    </PageLayout>
  );
};

export default NewProducts;
