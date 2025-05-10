
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

const Products = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<string | null>(null);
  
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
  });

  // Placeholder products while database is being set up
  const placeholderProducts: Product[] = [
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

  const displayProducts = products.length > 0 ? products : placeholderProducts;
  
  const categories = [...new Set(placeholderProducts.map(p => p.category))];

  return (
    <PageLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
      </div>
      
      {/* Filters Section */}
      <div className="bg-secondary/10 p-4 rounded-lg mb-8">
        <h2 className="font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={category === null ? "default" : "outline"}
            onClick={() => setCategory(null)}
            className="text-sm"
          >
            All
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat} 
              variant={category === cat ? "default" : "outline"}
              onClick={() => setCategory(cat)}
              className="text-sm"
            >
              {cat}
            </Button>
          ))}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <Card key={product.id} className="flex flex-col h-full overflow-hidden">
            <Link to={`/product/${product.id}`} className="aspect-square relative hover:opacity-90 transition-opacity">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full rounded-t-lg"
              />
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-muted-foreground">
                    {product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    asChild
                  >
                    <Link to={`/product/${product.id}`}>Details</Link>
                  </Button>
                  <Button
                    onClick={() => addToCart(product)}
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
    </PageLayout>
  );
};

export default Products;
