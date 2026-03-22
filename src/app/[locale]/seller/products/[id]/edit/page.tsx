'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GET_PRODUCT } from 'lupa-api-client/graphql/queries';
import { UPDATE_PRODUCT } from 'lupa-api-client/graphql/mutations';
import { getApiClient } from 'lupa-api-client';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { ArrowLeft } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório'),
  description: z.string().min(10, 'Descrição muito curta'),
  price: z.coerce.number().min(0.01, 'Preço inválido'),
  originalPrice: z.coerce.number().optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0),
  images: z.array(z.string().url('URL de imagem inválida')).min(1, 'Pelo menos uma imagem é necessária'),
  isNew: z.boolean().optional(),
  isTrending: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? '';
  const router = useRouter();
  const locale = useLocale();
  const queryClient = useQueryClient();

  const { data: productData, isLoading } = useQuery({
    queryKey: ['GET_PRODUCT', id],
    queryFn: async () => {
      const client = getApiClient();
      const res = await client.query<{ getProduct: any }>({
        query: GET_PRODUCT,
        variables: { id },
        fetchPolicy: 'network-only',
      });
      return res.data?.getProduct;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      stockQuantity: 1,
      isNew: true,
      isTrending: false,
      images: [''],
    },
  });

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        stockQuantity: productData.stockQuantity ?? 1,
        images: productData.images?.length ? productData.images : [''],
        isNew: productData.isNew || false,
        isTrending: productData.isTrending || false,
      });
    }
  }, [productData, reset]);

  const updateProductMutation = useMutation({
    mutationFn: async (input: any) => {
      const client = getApiClient();
      const res = await client.mutate({
        mutation: UPDATE_PRODUCT,
        variables: { id, input },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET_PRODUCT', id] });
      queryClient.invalidateQueries({ queryKey: ['SELLER_PRODUCTS'] });
      toast.success('Produto atualizado com sucesso!');
      router.push(`/${locale}/seller/products`);
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('Erro ao atualizar produto: ' + err.message);
    }
  });

  const onSubmit = async (values: ProductFormValues) => {
    updateProductMutation.mutate({
      name: values.name,
      description: values.description,
      price: values.price,
      originalPrice: values.originalPrice || null,
      stockQuantity: values.stockQuantity,
      images: values.images,
      isNew: values.isNew,
      isTrending: values.isTrending,
    });
  };

  const isUpdating = updateProductMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!productData) {
    return <div className="p-8 text-center text-red-500">Produto não encontrado.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" onClick={() => router.back()} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Editar Produto</h1>
      </div>

      <div className="rounded-xl bg-card shadow-sm border border-border p-6">
        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Informações Básicas</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Produto</label>
              <input {...register('name')} className="w-full input-primary border border-border rounded-lg p-2 bg-card text-foreground" placeholder="Ex: Camiseta Algodão" />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea {...register('description')} rows={4} className="w-full border border-border rounded-lg p-2 bg-card text-foreground" placeholder="Descreva seu produto..." />
              {errors.description && <p className="text-destructive text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Preço e Estoque</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Preço (AOA)</label>
                <input type="number" step="0.01" {...register('price')} className="w-full border border-border rounded-lg p-2 bg-card text-foreground" />
                {errors.price && <p className="text-destructive text-xs mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preço Original</label>
                <input type="number" step="0.01" {...register('originalPrice')} className="w-full border border-border rounded-lg p-2 bg-card text-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantidade</label>
              <input type="number" {...register('stockQuantity')} className="w-full border border-border rounded-lg p-2 bg-card text-foreground" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2">Imagens</h3>
            <div>
              <label className="block text-sm font-medium mb-1">URL da Imagem Principal</label>
              <input {...register('images.0')} className="w-full border border-border rounded-lg p-2 bg-card text-foreground" placeholder="https://..." />
              {errors.images && <p className="text-destructive text-xs mt-1">{errors.images.message}</p>}
            </div>
          </div>

          <div className="flex gap-6">
            <Controller
              name="isNew"
              control={control}
              render={({ field }) => (
                <Toggle
                  label="Novo"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="isTrending"
              control={control}
              render={({ field }) => (
                <Toggle
                  label="Destaque"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="pt-4 border-t flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={isUpdating} className="bg-primary px-4 py-2 rounded-lg text-primary-foreground">
              {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
