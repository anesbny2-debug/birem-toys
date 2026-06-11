// Product Types
export interface Product {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  descriptionAr: string;
  descriptionFr: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  currency: string;
  categoryId: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  views: number;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
  order: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  description?: string;
  descriptionAr?: string;
  descriptionFr?: string;
  descriptionEn?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface CartItem {
  id: string;
  cartId: string;
  product: Product;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  product: Product;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  commentAr?: string;
  commentFr?: string;
  commentEn?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  descriptionAr: string;
  descriptionFr: string;
  descriptionEn: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUses?: number;
  usedCount: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleFr?: string;
  subtitleEn?: string;
  image: string;
  mobileImage?: string;
  link?: string;
  order: number;
  isActive: boolean;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'moderator';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  createdAt: Date;
  updatedAt: Date;
}

export interface PageContent {
  id: string;
  slug: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  contentAr: string;
  contentFr: string;
  contentEn: string;
  seoTitleAr?: string;
  seoTitleFr?: string;
  seoTitleEn?: string;
  seoDescriptionAr?: string;
  seoDescriptionFr?: string;
  seoDescriptionEn?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
