'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '@/graphql/queries';
import { UPDATE_USER } from '@/graphql/mutations';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

const profileSchema = z.object({
 fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
 email: z.string().email('Email inválido'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

import { use } from 'react';

export default function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
 // const { locale } = use(params);
 const { data, loading } = useQuery<any>(GET_CURRENT_USER) as any;
 const [updateUser, { loading: updating }] = useMutation<any>(UPDATE_USER);

 const {
 register,
 handleSubmit,
 setValue,
 formState: { errors },
 } = useForm<ProfileFormValues>({
 resolver: zodResolver(profileSchema),
 });

 useEffect(() => {
 if (data?.me) {
 setValue('fullName', data.me.fullName);
 setValue('email', data.me.email);
 }
 }, [data, setValue]);

 const onSubmit = async (values: ProfileFormValues) => {
 try {
 await updateUser({
 variables: {
 id: data.me.id,
 input: {
 fullName: values.fullName,
 // Email updates usually require verification, but for MVP we might allow it or just block it
 email: values.email
 },
 },
 });
 toast.success('Perfil atualizado com sucesso!');
 } catch (error) {
 console.error(error);
 toast.error('Erro ao atualizar perfil');
 }
 };

 if (loading) return <div>Carregando...</div>;

 return (
 <div className="bg-white rounded-xl shadow-sm border p-6">
 <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
 <div>
 <label className="block text-sm font-medium mb-1">Nome Completo</label>
 <input
 {...register('fullName')}
 className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
 />
 {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Email</label>
 <input
 {...register('email')}
 disabled // Often email is immutable without re-verification
 className="w-full rounded-lg border bg-gray-50 px-3 py-2 cursor-not-allowed"
 />
 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
 </div>

 <Button type="submit" disabled={updating} className="w-full bg-primary text-white">
 {updating ? 'Salvando...' : 'Salvar Alterações'}
 </Button>
 </form>
 </div>
 );
}
