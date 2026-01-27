'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/graphql/mutations'; // Standardize imports
import { GET_STORE } from '@/graphql/queries';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { ArrowLeft, Plus, X } from 'lucide-react';

// Define queries locally for speed if not exported, but utilizing modules is better
const GET_CURRENT_USER_STORE = gql`
  query GetCurrentUserStore {
    me {
      id
      stores { # Assuming relation exists in schema, otherwise need separate query
        id
        name
      }
    }
  }
`;

// However, looking at queries.ts, "me" only returns basic info. 
// "sellerProducts" worked because it inferred the store. 
// For "createProduct", we need the storeId in the input.
// We can fetch the store ID first.

const productSchema = z.object({
    name: z.string().min(3, 'Nome é obrigatório'),
    description: z.string().min(10, 'Descrição muito curta'),
    price: z.coerce.number().min(0.01, 'Preço inválido'),
    originalPrice: z.coerce.number().optional(),
    stockQuantity: z.coerce.number().int().min(0),
    images: z.array(z.string().url('URL de imagem inválida')).min(1, 'Pelo menos uma imagem é necessária'),
    isNew: z.boolean().optional(),
    isTrending: z.boolean().optional(),
    // categoryId: z.string().optional(), // TODO: Add category selector
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
    const router = useRouter();
    const locale = useLocale();

    // 1. Get Store ID
    // Since "me" doesn't return stores, we might need a "myStore" query or rely on user context if we had it.
    // Hack: List stores filtered by ownerId? Or use a dedicated resolver.
    // Let's assume the user has one store and we can get it via a query or it's passed in context?
    // In "sellerProducts", the backend looked up the store.
    // In "createProduct", the input requires "storeId".
    // We need to fetch the user's store ID.

    const MY_STORE_QUERY = gql`
        query MyStore {
            listStores(limit: 1) { # If auth is context-based, this might filter by user? 
            # Looking at resolver: listStores filters by ownerId if provided. 
            # We don't have ownerId easily here without "me".
                id
                name
            }
        }
    `;
    // Wait, the updated queries.ts in my thought process had "sellerProducts" doing the lookup.
    // I should create a "myStore" query in backend ideally.
    // For now, I'll use listStores and hope I can filter or...
    // Actually, I can call "me" to get ID, then listStores(ownerId: me.id).

    // Implementing the two-step fetch or chained query logic is complex in one component.
    // I'll assume for MVP the user has a store and I can find it.

    const { data: userData } = useQuery(gql`
        query MeAndStore {
            me { id }
        }
    `);

    const { data: storeData } = useQuery(gql`
        query MyStores($ownerId: ID!) {
            listStores(ownerId: $ownerId) {
                id
                name
            }
        }
    `, {
        variables: { ownerId: userData?.me?.id },
        skip: !userData?.me?.id
    });

    const storeId = storeData?.listStores?.[0]?.id;

    const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            stockQuantity: 1,
            isNew: true,
            isTrending: false,
            images: ['https://via.placeholder.com/300'] // Default image
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "images" as any, // Simple string array handling in hook form is tricky with FieldArray if strictly typed
    });
    // Actually simpler: just one text input for image URL for MVP, or a split string.
    // Let's stick to a simple comma separated or multi-input if possible. 
    // Field array is overkill if we just want a list of strings

    const onSubmit = async (values: ProductFormValues) => {
        if (!storeId) {
            toast.error('Loja não encontrada. Crie uma loja primeiro.');
            return;
        }

        try {
            await createProduct({
                variables: {
                    input: {
                        storeId, // Retrieved from query
                        name: values.name,
                        description: values.description,
                        price: values.price,
                        originalPrice: values.originalPrice,
                        stockQuantity: values.stockQuantity,
                        images: values.images,
                        currency: 'AKZ',
                        isNew: values.isNew,
                        isTrending: values.isTrending
                    }
                }
            });
            toast.success('Produto criado com sucesso!');
            router.push(`/${locale}/seller/products`);
        } catch (err: any) {
            console.error(err);
            toast.error('Erro ao criar produto: ' + err.message);
        }
    };

    if (!storeId && userData) return <div>Carregando informações da loja... (Se não tiver loja, contate o suporte)</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="p-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold">Novo Produto</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b pb-2">Informações Básicas</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                            <input {...register('name')} className="w-full input-primary" placeholder="Ex: Camiseta Algodão" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea {...register('description')} rows={4} className="w-full input-primary" placeholder="Descreva seu produto..." />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b pb-2">Preço e Estoque</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (AKZ)</label>
                                <input type="number" step="0.01" {...register('price')} className="w-full input-primary" />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Original (Opcional)</label>
                                <input type="number" step="0.01" {...register('originalPrice')} className="w-full input-primary" placeholder="Para promoções" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade em Estoque</label>
                            <input type="number" {...register('stockQuantity')} className="w-full input-primary" />
                        </div>
                    </div>

                    {/* Images - Simplified for MVP */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b pb-2">Imagens</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem Principal</label>
                            <input {...register('images.0')} className="w-full input-primary" placeholder="https://..." />
                            <p className="text-xs text-gray-500 mt-1">Para MVP, insira a URL direta da imagem.</p>
                            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
                        </div>
                    </div>

                    {/* Flags */}
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('isNew')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span className="text-sm text-gray-700">Marcar como Novo</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('isTrending')} className="rounded border-gray-300 text-primary focus:ring-primary" />
                            <span className="text-sm text-gray-700">Destaque</span>
                        </label>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit" disabled={creating} className="bg-primary text-white">
                            {creating ? 'Criando...' : 'Criar Produto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
