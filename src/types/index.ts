/**
 * Core Product Types
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  // discount is calculated automatically based on price and originalPrice
  images: ProductImage[];
  video?: string;
  category: Category;
  subcategory?: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  rating: number;
  reviewCount: number;
  specifications: ProductSpecification[];
  materials: string[];
  features: ProductFeature[];
  cleaningInstructions: string;
  warranty?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFeature {
  icon: string;
  label: string;
  value: string | boolean;
}

/**
 * Category Types
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  order: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productIds: string[];
  tags: string[];
}

/**
 * Cart Types
 */
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

/**
 * Review Types
 */
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

/**
 * Order Types
 */
export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  trackingCode?: string;
  discretePackaging: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'whatsapp' | 'pix' | 'credit_card' | 'debit_card';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Filter Types
 */
export interface ProductFilters {
  categories?: string[];
  priceMin?: number;
  priceMax?: number;
  materials?: string[];
  waterproof?: boolean;
  intensity?: IntensityLevel[];
  recommendedFor?: string[];
  rating?: number;
  inStock?: boolean;
}

export type IntensityLevel = 'low' | 'medium' | 'high';
export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';

/**
 * Search Types
 */
export interface SearchSuggestion {
  type: 'product' | 'category' | 'collection';
  id: string;
  name: string;
  image?: string;
  url: string;
}

/**
 * User Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
  createdAt: string;
}

/**
 * FAQ Types
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

/**
 * Shipping Types
 */
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrier: string;
  company?: {
    id: number;
    name: string;
    picture: string;
  };
}

export interface ShippingCalculation {
  zipCode: string;
  options: ShippingOption[];
}

/**
 * Melhor Envio Types
 */
export interface MelhorEnvioProduct {
  id: string;
  width: number;  // cm
  height: number; // cm
  length: number; // cm
  weight: number; // kg
  insurance_value: number;
  quantity: number;
}

export interface MelhorEnvioShippingRequest {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  products: MelhorEnvioProduct[];
}

export interface MelhorEnvioShippingResponse {
  id: number;
  name: string;
  price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  company: {
    id: number;
    name: string;
    picture: string;
  };
  error?: string;
}

/**
 * CEP/Correios Types
 */
export interface CEPData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

/**
 * Blog Types
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: BlogAuthor;
  category: BlogCategory;
  tags: string[];
  readTime: number; // em minutos
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}
