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

export const mockCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'home', name: 'Home & Living', slug: 'home' },
  { id: 'beauty', name: 'Beauty', slug: 'beauty' },
  { id: 'sports', name: 'Sports', slug: 'sports' },
  { id: 'toys', name: 'Toys & Games', slug: 'toys' },
  { id: 'groceries', name: 'Groceries', slug: 'groceries' },
];

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Tech World',
    slug: 'tech-world',
    logo: '/stores/tech-world-logo.png',
    featuredImage: '/stores/tech-world-hero.jpg',
    rating: 4.6,
    productCount: 540,
    categories: ['electronics'],
    description: 'Latest gadgets and electronics',
    location: 'Luanda'
  },
  {
    id: 'shop-2',
    name: 'Fashion Galaxy',
    slug: 'fashion-galaxy',
    logo: '/stores/fashion-galaxy-logo.png',
    featuredImage: '/stores/fashion-galaxy-hero.jpg',
    rating: 4.4,
    productCount: 250,
    categories: ['fashion'],
    description: 'Trending clothes and accessories',
    location: 'Benguela'
  },
  {
    id: 'shop-3',
    name: 'Casa & Co',
    slug: 'casa-co',
    logo: '/stores/casa-co-logo.png',
    featuredImage: '/stores/casa-co-hero.jpg',
    rating: 4.8,
    productCount: 410,
    categories: ['home'],
    description: 'Home goods and kitchen essentials',
    location: 'Huambo'
  },
  {
    id: 'shop-4',
    name: 'ActiveFit',
    slug: 'activefit',
    logo: '/stores/activefit-logo.png',
    featuredImage: '/stores/activefit-hero.jpg',
    rating: 4.3,
    productCount: 120,
    categories: ['sports'],
    description: 'Sports and fitness equipment',
    location: 'Luanda'
  },
  {
    id: 'shop-5',
    name: 'Pretty Little Things',
    slug: 'pretty-little-things',
    logo: '/stores/plt-logo.png',
    featuredImage: '/stores/plt-hero.jpg',
    rating: 4.1,
    productCount: 88,
    categories: ['beauty', 'fashion'],
    description: 'Beauty essentials & cosmetics',
    location: 'Huíla'
  }
];

export const mockProducts = [
  { id: 'p1', name: 'Wireless Headphones', price: 85.0, categoryId: 'electronics' },
  { id: 'p2', name: 'Running Shoes', price: 65.0, categoryId: 'sports' },
  { id: 'p3', name: 'Coffee Maker', price: 45.0, categoryId: 'home' },
  { id: 'p4', name: 'Moisturizer', price: 25.0, categoryId: 'beauty' },
  { id: 'p5', name: 'Kids Puzzle', price: 18.0, categoryId: 'toys' },
];
