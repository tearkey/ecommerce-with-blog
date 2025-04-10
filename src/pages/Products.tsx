
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const Products = () => {
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      id: "1",
      name: "MacBook Pro 16-inch",
      description: "Latest model with M1 Pro chip",
      price: 2499.99,
      category: "Laptops & Notebooks",
      image: "/placeholder.svg",
      stock: 10,
      specifications: {
        processor: "Apple M1 Pro",
        memory: "16GB",
        storage: "512GB SSD",
      },
    },
    {
      id: "2",
      name: "Dell XPS 15",
      description: "Premium Windows laptop",
      price: 1999.99,
      category: "Laptops & Notebooks",
      image: "/placeholder.svg",
      stock: 5,
      specifications: {
        processor: "Intel i9-11900H",
        memory: "32GB",
        storage: "1TB SSD",
      },
    },
  ];

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
      </div>
      
      {/* Filters Section */}
      <div className="bg-secondary/10 p-4 rounded-lg mb-8">
        <h2 className="font-semibold mb-4">Filters</h2>
        {/* Filter controls will go here */}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <Link to={`/product/${product.id}`} className="aspect-square relative hover:opacity-90 transition-opacity">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </Link>
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

export default Products;
