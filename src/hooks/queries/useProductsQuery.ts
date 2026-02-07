/**
 * Product hooks — re-exported from @lupa/api-client
 */
import { useProducts, useProduct, useSellerProducts } from '@lupa/api-client/hooks';

export { useProducts, useProduct, useSellerProducts };

// Legacy aliases
export const useProductsQuery = useProducts;
export const useProductDetailsQuery = useProduct;
export const useProductsStatisticsQuery = useProducts;
export const useProductVariantsQuery = useProduct;
