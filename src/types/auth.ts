
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at: string;
  updated_at: string;
}

// Order-related types for the backend
export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: ShippingAddress;
  payment_details?: PaymentDetails;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone?: string;
}

export interface PaymentDetails {
  method: 'credit_card' | 'paypal' | 'other';
  last_four?: string;
  transaction_id?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  created_at: string;
}

