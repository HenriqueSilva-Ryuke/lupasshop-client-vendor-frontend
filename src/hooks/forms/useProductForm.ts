'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { CREATE_PRODUCT } from '@/graphql/products';

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().min(0.01, 'Preço deve ser maior que 0'),
  stock: z.number().int().min(0, 'Estoque não pode ser negativo'),
  sku: z.string().min(3, 'SKU deve ter no mínimo 3 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  images: z.array(z.string()).min(1, 'Adicione pelo menos uma imagem'),
  isActive: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface CreateProductResponse {
  createProduct: {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku: string;
    category: string;
    images: string[];
    isActive: boolean;
  };
}

export function useProductForm(onSuccess?: () => void) {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { data: response } = await apolloClient.mutate<CreateProductResponse>({
        mutation: CREATE_PRODUCT,
        variables: {
          input: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            sku: data.sku,
            category: data.category,
            images: data.images,
            isActive: data.isActive,
          },
        },
      });

      if (!response?.createProduct) {
        throw new Error('Falha ao criar produto');
      }

      return response.createProduct;
    },
    onSuccess: () => {
      setError(null);
      onSuccess?.();
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao criar produto';
      setError(errorMessage);
      console.error('Create product error:', err);
    },
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      sku: '',
      category: '',
      images: [],
      isActive: true,
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) => {
    createProductMutation.mutate(data);
  });

  const handleImageUpload = (url: string) => {
    const currentImages = form.getValues('images') || [];
    const newImages = [...currentImages, url];
    setUploadedImages(newImages);
    form.setValue('images', newImages);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    form.setValue('images', newImages);
  };

  return {
    form,
    handleSubmit,
    handleImageUpload,
    removeImage,
    uploadedImages,
    isLoading: createProductMutation.isPending,
    error,
  };
}
