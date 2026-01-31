'use client';

import React, { use } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '@/graphql/mutations';
import { GET_STORE } from '@/graphql/queries';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import { ArrowLeft, Plus, X } from 'lucide-react';

const productSchema = z.object({
    name: z.string().min(3, 'Nome é obrigatório'),
    description: z.string().min(10, 'Descrição muito curta'),
    price: z.coerce.number().min(0.01, 'Preço inválido'),
    originalPrice: z.coerce.number().optional(),
    stockQuantity: z.coerce.number().int().min(0),
    images: z.array(z.string().url('URL de imagem inválida')).min(1, 'Pelo menos uma imagem é necessária'),
    isNew: z.boolean().optional(),
    isTrending: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage({ params }: { params: Promise<any> }) {
    const router = useRouter();
    const locale = useLocale();

    // In Next.js 15+, params are a promise
    // const resolvedParams = use(params); 

    const { data: userData } = useQuery(gql`
        query MeAndStore {
            me { id }
        }
    `) as any;

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
    }) as any;

    const storeId = storeData?.listStores?.[0]?.id;

    const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT) as any;

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            stockQuantity: 1,
            isNew: true,
            isTrending: false,
            images: ['https://via.placeholder.com/300']
        }
    });

    const onSubmit = async (values: any) => {
        if (!storeId) {
            toast.error('Loja não encontrada. Crie uma loja primeiro.');
            return;
        }

        try {
            await createProduct({
                variables: {
                    input: {
                        storeId,
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

    if (!storeId && userData) return <div>Carregando informações da loja...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" onClick={() => router.back()} className="p-2">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold">Novo Produto</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold border-b pb-2">Informações Básicas</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome do Produto</label>
                            <input {...register('name')} className="w-full input-primary border rounded-lg p-2" placeholder="Ex: Camiseta Algodão" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{(errors.name as any).message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea {...register('description')} rows={4} className="w-full border rounded-lg p-2" placeholder="Descreva seu produto..." />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{(errors.description as any).message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold border-b pb-2">Preço e Estoque</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Preço (AKZ)</label>
                                <input type="number" step="0.01" {...register('price')} className="w-full border rounded-lg p-2" />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{(errors.price as any).message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Preço Original</label>
                                <input type="number" step="0.01" {...register('originalPrice')} className="w-full border rounded-lg p-2" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Quantidade</label>
                            <input type="number" {...register('stockQuantity')} className="w-full border rounded-lg p-2" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold border-b pb-2">Imagens</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL da Imagem Principal</label>
                            <input {...register('images.0')} className="w-full border rounded-lg p-2" placeholder="https://..." />
                            {errors.images && <p className="text-red-500 text-xs mt-1">{(errors.images as any).message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('isNew')} />
                            <span className="text-sm">Novo</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register('isTrending')} />
                            <span className="text-sm">Destaque</span>
                        </label>
                    </div>

                    <div className="pt-4 border-t flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit" disabled={creating} className="bg-primary px-4 py-2 rounded-lg">
                            {creating ? 'Criando...' : 'Criar Produto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
