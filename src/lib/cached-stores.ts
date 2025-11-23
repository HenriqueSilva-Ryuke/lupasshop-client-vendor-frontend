import { mockCategories, mockShops } from '@/data/mock-stores';
import { unstable_cache } from 'next/cache';

export interface ShopsFilters {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: 'relevance' | 'rating' | 'newest' | 'popular' | 'price_low' | 'price_high';
  minPrice?: number;
  maxPrice?: number;
}

export interface ShopsResponse {
  data: typeof mockShops;
  total: number;
  page: number;
  limit: number;
}

// Cache categories with long TTL
export const getShopCategories = unstable_cache(async () => mockCategories, ['stores-categories'], { revalidate: 3600 });

// Cache shops for short TTL; filters are part of the cache key
export const getShopsList = (filters: ShopsFilters = {}) => unstable_cache(async (): Promise<ShopsResponse> => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const q = (filters.q || '').toLowerCase().trim();

  // Filter
  let filtered = mockShops.filter((s) => {
    if (filters.category) {
      if (!s.categories || !s.categories.includes(filters.category)) return false;
    }
    if (q) {
      const matchName = s.name.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    // TODO: minPrice/maxPrice - would need product prices
    return true;
  });

  // Sorting
  switch (filters.sort) {
    case 'rating':
      filtered = filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case 'newest':
      // Mock: keep as is
      break;
    case 'price_low':
      // Mock sorting not implemented without product prices
      break;
    case 'price_high':
      break;
    default:
      break;
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const pageData = filtered.slice(start, start + limit);

  return {
    data: pageData,
    total,
    page,
    limit,
  };
}, ['stores', JSON.stringify(filters)], { revalidate: 60 })();

export const getShopById = (id: string) => unstable_cache(async () => mockShops.find((s) => s.id === id) ?? null, ['stores', id], { revalidate: 3600 })();

export const getShopBySlug = (slug: string) => unstable_cache(async () => mockShops.find((s) => s.slug === slug) ?? null, ['stores', slug], { revalidate: 3600 })();
