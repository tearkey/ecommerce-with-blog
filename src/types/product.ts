
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
  is_new?: boolean;
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

export interface ProductCategory {
  name: string;
  description: string;
  image?: string;
  slug: string;
}

