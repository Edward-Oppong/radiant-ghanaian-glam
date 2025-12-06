// Database types that map Supabase data to app types
import { Tables } from '@/integrations/supabase/types';

export type DbProduct = Tables<'products'>;
export type DbCategory = Tables<'categories'>;

// Transform database product to app Product format
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'length';
  value: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Transform database product to app product
export function transformDbProduct(dbProduct: DbProduct, categorySlug?: string): Product {
  const variants = dbProduct.variants as unknown as ProductVariant[] | null;
  
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    category: categorySlug || '',
    price: Number(dbProduct.price),
    originalPrice: dbProduct.original_price ? Number(dbProduct.original_price) : undefined,
    description: dbProduct.description || '',
    images: dbProduct.images || ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
    variants: variants || undefined,
    rating: Number(dbProduct.rating) || 0,
    reviewCount: dbProduct.review_count || 0,
    inStock: (dbProduct.stock ?? 0) > 0,
    featured: dbProduct.is_featured ?? false,
    bestseller: dbProduct.is_bestseller ?? false,
  };
}

// Transform database category to app category
export function transformDbCategory(dbCategory: DbCategory, productCount: number = 0): Category {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    slug: dbCategory.slug,
    description: dbCategory.description || '',
    image: dbCategory.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    productCount,
  };
}
