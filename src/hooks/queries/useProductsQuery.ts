/**
 * Product hooks — re-exported from @lupa/api-client
 */
export {
  useProducts,
  useProduct,
  useSellerProducts,
} from '@lupa/api-client/hooks';

// Legacy aliases
export const useProductsQuery = useProducts;
export const useProductDetailsQuery = useProduct;
export const useProductsStatisticsQuery = useProducts;
export const useProductVariantsQuery = useProduct;
