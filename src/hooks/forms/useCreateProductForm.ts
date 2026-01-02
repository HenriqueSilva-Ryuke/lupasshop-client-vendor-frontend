import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductSchema, CreateProductInput } from '@/lib/validations';
import { useCreateProduct } from '../useProducts';

export const useCreateProductForm = (storeId: string) => {
  const createProduct = useCreateProduct();
  
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      storeId,
      name: '',
      description: '',
      price: 0,
      currency: 'AKZ',
      images: [],
      stockQuantity: 0,
      isNew: false,
      isTrending: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createProduct.mutate(data);
  });

  return {
    form,
    onSubmit,
    isLoading: createProduct.isPending,
    error: createProduct.error,
    isSuccess: createProduct.isSuccess,
  };
};
