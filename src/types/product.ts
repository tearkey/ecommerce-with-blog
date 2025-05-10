
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  specifications: {
    [key: string]: string;
  };
  isNew?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isNew?: boolean;
  inStock?: boolean;
}
