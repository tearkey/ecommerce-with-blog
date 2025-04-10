
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartSheet } from "@/components/CartSheet";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { type Product } from "@/types/product";

// Sample products data - in a real app, this would come from an API or context
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product with the matching ID
  const product = products.find((p) => p.id === id);
  
  // If product not found, show a message and return to products
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Breadcrumbs />
        <CartSheet />
      </div>
      
      <Button variant="outline" size="sm" asChild className="mb-6">
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-secondary/10 rounded-lg flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain" 
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">{product.category}</Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm text-muted-foreground">4.8 (120 reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold my-2">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <p className="mb-2 font-medium">Quantity</p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              Buy Now
            </Button>
          </div>
          
          <div>
            <p className="text-sm">
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="mt-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="specifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
              <CardDescription>Detailed product specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <dt className="text-sm font-medium text-muted-foreground capitalize">{key}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Specifications may vary by configuration and region.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="features" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>What makes this product special</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5">
                <li>Feature 1: Exceptional performance with the latest technologies</li>
                <li>Feature 2: Premium build quality and materials</li>
                <li>Feature 3: Optimized for professional workflows</li>
                <li>Feature 4: Industry-leading battery life</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>See what others are saying about this product</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Reviews will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
