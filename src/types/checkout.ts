
export interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  email: string;
  phone: string;
}
