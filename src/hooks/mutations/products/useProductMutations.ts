/**
 * Product mutations — re-exported from @lupa/api-client
 */
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@lupa/api-client/hooks';

export { useCreateProduct, useUpdateProduct, useDeleteProduct };

// Legacy aliases
export const useCreateProductMutation = useCreateProduct;
export const useUpdateProductMutation = useUpdateProduct;
export const useDeleteProductMutation = useDeleteProduct;
