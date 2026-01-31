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

export interface ShopItem {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  featuredImage?: string;
  rating?: number;
  productCount?: number;
  categories?: string[];
  description?: string;
}

export interface ShopsResponse {
  data: ShopItem[];
  total: number;
  page: number;
  limit: number;
}

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ||
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  'http://localhost:4000/graphql';

async function fetchGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message || 'GraphQL error');
  }
  return json.data as T;
}

export const getShopCategories = unstable_cache(async () => {
  const data = await fetchGraphQL<{ listCategories: Array<{ id: string; name: string; slug: string; icon?: string; productsCount: number }> }>(
    `query ListCategories($type: CategoryType) {
      listCategories(type: $type) {
        id
        name
        slug
        icon
        productsCount
      }
    }`,
    { type: 'STORE' }
  );

  return data.listCategories || [];
}, ['stores-categories'], { revalidate: 3600 });

export const getShopsList = (filters: ShopsFilters = {}) => unstable_cache(async (): Promise<ShopsResponse> => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const offset = (page - 1) * limit;

  let categoryId: string | undefined;
  if (filters.category) {
    const categories = await getShopCategories();
    categoryId = categories.find((c: any) => c.slug === filters.category)?.id;
  }

  const data = await fetchGraphQL<{
    listStores: Array<any>;
    countStores: number;
  }>(
    `query ListStores($categoryId: ID, $search: String, $limit: Int, $offset: Int) {
      listStores(categoryId: $categoryId, search: $search, limit: $limit, offset: $offset) {
        id
        name
        slug
        description
        logoUrl
        coverImageUrl
        bannerUrl
        location
        rating
        reviewCount
        category { slug }
        stats { totalProducts }
      }
      countStores(categoryId: $categoryId, search: $search)
    }`,
    {
      categoryId,
      search: filters.q,
      limit,
      offset,
    }
  );

  const shops: ShopItem[] = (data.listStores || []).map((store: any) => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    logo: store.logoUrl || undefined,
    featuredImage: store.coverImageUrl || store.bannerUrl || undefined,
    rating: store.rating || 0,
    productCount: store.stats?.totalProducts || 0,
    categories: store.category?.slug ? [store.category.slug] : [],
    description: store.description || undefined,
  }));

  return {
    data: shops,
    total: data.countStores || 0,
    page,
    limit,
  };
}, ['stores', JSON.stringify(filters)], { revalidate: 60 })();

export const getShopById = (id: string) => unstable_cache(async () => {
  const data = await fetchGraphQL<{ getStore: any }>(
    `query GetStore($id: ID!) {
      getStore(id: $id) {
        id
        name
        slug
        description
        logoUrl
        coverImageUrl
        bannerUrl
        location
        rating
        reviewCount
        category { slug }
        stats { totalProducts }
      }
    }`,
    { id }
  );

  const store = data.getStore;
  if (!store) return null;

  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    logo: store.logoUrl || undefined,
    featuredImage: store.coverImageUrl || store.bannerUrl || undefined,
    rating: store.rating || 0,
    productCount: store.stats?.totalProducts || 0,
    categories: store.category?.slug ? [store.category.slug] : [],
    description: store.description || undefined,
  } as ShopItem;
}, ['stores', id], { revalidate: 3600 })();

export const getShopBySlug = (slug: string) => unstable_cache(async () => {
  const data = await fetchGraphQL<{ getStoreBySlug: any }>(
    `query GetStoreBySlug($slug: String!) {
      getStoreBySlug(slug: $slug) {
        id
        name
        slug
        description
        logoUrl
        coverImageUrl
        bannerUrl
        location
        rating
        reviewCount
        category { slug }
        stats { totalProducts }
      }
    }`,
    { slug }
  );

  const store = data.getStoreBySlug;
  if (!store) return null;

  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    logo: store.logoUrl || undefined,
    featuredImage: store.coverImageUrl || store.bannerUrl || undefined,
    rating: store.rating || 0,
    productCount: store.stats?.totalProducts || 0,
    categories: store.category?.slug ? [store.category.slug] : [],
    description: store.description || undefined,
  } as ShopItem;
}, ['stores', slug], { revalidate: 3600 })();
