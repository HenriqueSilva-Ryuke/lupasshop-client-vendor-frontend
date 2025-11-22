export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string; // URL or icon name
  image?: string; // URL for visual representation
  count?: number; // Number of items in this category
}
export interface MarketplaceStore {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  rating: number;
  reviewCount: number;
  categories: string[]; // Category slugs
  isPromoted?: boolean;
  isVerified?: boolean;
  tags?: string[];
  location?: string;
}
export interface MarketplaceProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  storeId: string;
  storeName: string;
  storeSlug: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isTrending?: boolean;
  category: string;
}
export interface Widget {
  id: string;
  type: 'categories' | 'promoted-stores' | 'trending-products' | 'banner' | 'filter';
  title?: string;
  data?: any; // Flexible data based on type
  position: 'left' | 'center' | 'right';
  order: number;
}