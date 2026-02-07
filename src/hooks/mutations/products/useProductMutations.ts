/**
 * Product mutations — re-exported from @lupa/api-client
 */
export {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@lupa/api-client/hooks';

// Legacy aliases
export const useCreateProductMutation = useCreateProduct;
export const useUpdateProductMutation = useUpdateProduct;
export const useDeleteProductMutation = useDeleteProduct;
