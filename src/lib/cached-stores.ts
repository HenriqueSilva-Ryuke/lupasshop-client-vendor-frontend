import { mockCategories, mockShops } from '@/data/mock-stores';

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
export async function getShopCategories() {
  return mockCategories;
}

// Cache shops for short TTL; filters are part of the cache key
export async function getShopsList(filters: ShopsFilters = {}): Promise<ShopsResponse> {

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
}

export async function getShopById(id: string) {
  return mockShops.find((s) => s.id === id) ?? null;
}

export async function getShopBySlug(slug: string) {
  return mockShops.find((s) => s.slug === slug) ?? null;
}
