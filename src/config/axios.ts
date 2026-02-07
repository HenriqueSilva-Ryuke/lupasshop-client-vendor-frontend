/**
 * @deprecated — Axios has been removed. Use @lupa/api-client instead.
 *
 * All API calls now go through GraphQL via the unified Apollo client.
 * Import hooks from '@lupa/api-client/hooks' for data fetching.
 *
 * This file is kept only for backward compatibility of imports.
 * It exports a minimal stub that will throw errors if used.
 */

const deprecationWarning = () => {
  console.warn(
    '[@lupa/api-client] Axios has been removed. ' +
    'Use hooks from @lupa/api-client/hooks instead of direct API calls.'
  );
};

const apiClient = {
  get: () => { deprecationWarning(); return Promise.reject(new Error('Axios removed')); },
  post: () => { deprecationWarning(); return Promise.reject(new Error('Axios removed')); },
  put: () => { deprecationWarning(); return Promise.reject(new Error('Axios removed')); },
  patch: () => { deprecationWarning(); return Promise.reject(new Error('Axios removed')); },
  delete: () => { deprecationWarning(); return Promise.reject(new Error('Axios removed')); },
} as any;

export default apiClient;
