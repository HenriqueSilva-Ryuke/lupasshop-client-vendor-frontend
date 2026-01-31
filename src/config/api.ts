// Backend API Configuration
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
export const API_BASE_URL = `${BACKEND_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  // Users
  USERS: {
    PROFILE: '/users/profile',
    ACTIVITY: '/users/activity',
    SEARCH: '/users/search',
    STATS: '/users/stats',
    LIST: '/users',
    ADDRESSES: '/users/addresses',
    ADDRESSES_BY_ID: (id: string) => `/users/addresses/${id}`
  },
  // Shops
  SHOPS: {
    CREATE: '/shops',
    LIST: '/shops',
    SEARCH: '/shops/search',
    BY_ID: (id: string) => `/shops/${id}`,
    MY: '/shops/my',
    STATISTICS: (id: string) => `/shops/${id}/statistics`,
    SETTINGS: (id: string) => `/shops/${id}/settings`,
    UPDATE: (id: string) => `/shops/${id}`,
    DELETE: (id: string) => `/shops/${id}`
  },
  // Products
  PRODUCTS: {
    CREATE: '/products',
    LIST: '/products',
    SEARCH: '/products/search',
    BY_ID: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    STATISTICS: '/products/statistics',
    ANALYTICS: '/products/analytics',
    VARIANTS: {
      LIST: (productId: string) => `/products/${productId}/variants`,
      CREATE: (productId: string) => `/products/${productId}/variants`,
      BY_ID: (productId: string, variantId: string) => `/products/${productId}/variants/${variantId}`,
      UPDATE: (productId: string, variantId: string) => `/products/${productId}/variants/${variantId}`,
      DELETE: (productId: string, variantId: string) => `/products/${productId}/variants/${variantId}`,
      STOCK: (productId: string, variantId: string) => `/products/${productId}/variants/${variantId}/stock`
    },
    TAGS: {
      LIST: (productId: string) => `/products/${productId}/tags`,
      CREATE: '/products/tags',
      ADD: (productId: string) => `/products/${productId}/tags`,
      REMOVE: (productId: string, tagId: string) => `/products/${productId}/tags/${tagId}`,
      UPDATE: (tagId: string) => `/products/tags/${tagId}`,
      DELETE: (tagId: string) => `/products/tags/${tagId}`
    },
    CATEGORIES: {
      LIST: '/products/categories',
      CREATE: '/products/categories',
      UPDATE: (id: string) => `/products/categories/${id}`,
      DELETE: (id: string) => `/products/categories/${id}`
    },
    REVIEWS: {
      LIST: (productId: string) => `/products/${productId}/reviews`,
      STATISTICS: '/products/reviews/statistics',
      MODERATION: (productId: string, reviewId: string) => `/products/${productId}/reviews/${reviewId}/moderation`,
      BULK_MODERATION: '/products/reviews/bulk-moderation'
    },
    ACTIVITY: (productId: string) => `/products/${productId}/activity`,
    INVENTORY: {
      ALERTS: '/products/inventory/alerts',
      REPORT: '/products/inventory/report',
      BULK_STOCK: '/products/inventory/bulk-stock'
    }
  },
  // Reviews
  REVIEWS: {
    CREATE: '/reviews',
    BY_ID: (id: string) => `/reviews/${id}`,
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    BY_PRODUCT: (productId: string) => `/reviews/products/${productId}`,
    PRODUCT_STATS: (productId: string) => `/reviews/products/${productId}/stats`,
    BY_SHOP: (shopId: string) => `/reviews/shops/${shopId}`,
    MY_REVIEWS: '/reviews/my-reviews',
    MODERATE: (id: string) => `/reviews/${id}/moderate`
  },
  // Payments
  PAYMENTS: {
    CREATE: '/payments',
    LIST: '/payments',
    BY_ID: (id: string) => `/payments/${id}`,
    UPDATE: (id: string) => `/payments/${id}`,
    PROCESS: '/payments/process',
    REFUND: (id: string) => `/payments/${id}/refund`,
    STATS: '/payments/stats/summary'
  },
  // Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
    UPDATE: (id: string) => `/orders/${id}`,
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    ADD_ITEM: (id: string) => `/orders/${id}/items`,
    UPDATE_ITEM: (id: string, itemId: string) => `/orders/${id}/items/${itemId}`,
    DELETE_ITEM: (id: string, itemId: string) => `/orders/${id}/items/${itemId}`,
    STATS: '/orders/stats/summary'
  },
  // Finances
  FINANCES: {
    PAYMENTS: {
      CREATE: '/finances/payments',
      LIST: '/finances/payments',
      BY_ID: (id: string) => `/finances/payments/${id}`,
      UPDATE: (id: string) => `/finances/payments/${id}`
    },
    TRANSACTIONS: {
      CREATE: '/finances/transactions',
      LIST: '/finances/transactions',
      BY_ID: (id: string) => `/finances/transactions/${id}`,
      UPDATE: (id: string) => `/finances/transactions/${id}`
    },
    STATS: '/finances/stats'
  },
  // Integrations
  INTEGRATIONS: {
    CREATE: '/integrations',
    LIST: '/integrations',
    BY_ID: (id: string) => `/integrations/${id}`,
    UPDATE: (id: string) => `/integrations/${id}`,
    DELETE: (id: string) => `/integrations/${id}`,
    CONNECT: (id: string) => `/integrations/${id}/connect`,
    DISCONNECT: (id: string) => `/integrations/${id}/disconnect`,
    TEST: (id: string) => `/integrations/${id}/test`
  }
} as const;

// Cache keys for TanStack Query
export const QUERY_KEYS = {
  USERS: {
    PROFILE: ['users', 'profile'],
    ACTIVITY: ['users', 'activity'],
    SEARCH: (q: string) => ['users', 'search', q],
    STATS: ['users', 'stats'],
    LIST: (page?: number, limit?: number) => ['users', 'list', page, limit],
    ADDRESSES: ['users', 'addresses'],
    ADDRESS: (id: string) => ['users', 'address', id]
  },
  SHOPS: {
    LIST: (page?: number, limit?: number) => ['shops', 'list', page, limit],
    SEARCH: (q: string, category?: string) => ['shops', 'search', q, category],
    DETAIL: (id: string) => ['shops', 'detail', id],
    MY: ['shops', 'my'],
    STATISTICS: (id: string) => ['shops', 'statistics', id],
    SETTINGS: (id: string) => ['shops', 'settings', id]
  },
  PRODUCTS: {
    LIST: (page?: number, limit?: number) => ['products', 'list', page, limit],
    SEARCH: (q?: string, category?: string, minPrice?: number, maxPrice?: number) => [
      'products',
      'search',
      q,
      category,
      minPrice,
      maxPrice
    ],
    DETAIL: (id: string) => ['products', 'detail', id],
    STATISTICS: ['products', 'statistics'],
    ANALYTICS: ['products', 'analytics'],
    VARIANTS: (productId: string) => ['products', 'variants', productId],
    VARIANT: (productId: string, variantId: string) => ['products', 'variant', productId, variantId],
    TAGS: (productId: string) => ['products', 'tags', productId],
    ALL_TAGS: ['products', 'all-tags'],
    CATEGORIES: ['products', 'categories'],
    REVIEWS: (productId: string) => ['products', 'reviews', productId],
    REVIEW_STATS: (productId: string) => ['products', 'review-stats', productId],
    ACTIVITY: (productId: string) => ['products', 'activity', productId],
    INVENTORY_ALERTS: ['products', 'inventory-alerts'],
    INVENTORY_REPORT: ['products', 'inventory-report']
  },
  REVIEWS: {
    LIST: (productId?: string, shopId?: string) => ['reviews', 'list', productId, shopId],
    DETAIL: (id: string) => ['reviews', 'detail', id],
    MY: ['reviews', 'my'],
    PRODUCT_STATS: (productId: string) => ['reviews', 'product-stats', productId]
  },
  PAYMENTS: {
    LIST: (page?: number, limit?: number, status?: string) => ['payments', 'list', page, limit, status],
    DETAIL: (id: string) => ['payments', 'detail', id],
    STATS: ['payments', 'stats']
  },
  ORDERS: {
    LIST: (page?: number, limit?: number, status?: string) => ['orders', 'list', page, limit, status],
    DETAIL: (id: string) => ['orders', 'detail', id],
    STATS: ['orders', 'stats']
  },
  FINANCES: {
    PAYMENTS: (page?: number, limit?: number) => ['finances', 'payments', page, limit],
    PAYMENT: (id: string) => ['finances', 'payment', id],
    TRANSACTIONS: (page?: number, limit?: number) => ['finances', 'transactions', page, limit],
    TRANSACTION: (id: string) => ['finances', 'transaction', id],
    STATS: ['finances', 'stats']
  },
  INTEGRATIONS: {
    LIST: ['integrations', 'list'],
    DETAIL: (id: string) => ['integrations', 'detail', id]
  }
} as const;
