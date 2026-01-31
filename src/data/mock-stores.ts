export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
  categoryId?: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  featuredImage?: string;
  rating?: number;
  productCount?: number;
  categories?: string[]; // category ids
  description?: string;
  location?: string;
}

export const mockCategories: Category[] = [];
export const mockShops: Shop[] = [];
export const mockProducts: Product[] = [];
