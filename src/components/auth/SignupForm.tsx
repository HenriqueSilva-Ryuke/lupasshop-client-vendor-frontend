'use client';

import { useSignupForm } from '@/hooks/forms/useSignupForm';
import Link from 'next/link';

export function SignupForm() {
 const { form, onSubmit, isLoading, error } = useSignupForm();
 const { register, formState: { errors } } = form;

 return (
 <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
 <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
  <form onSubmit={onSubmit} className="space-y-4">
 <div>
 <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
 Nome Completo
 </label>
 <input
 id="fullName"
 type="text"
 {...register('fullName')}
 className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="Seu nome completo"
 />
 {errors.fullName && (
 <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>
 )}
 </div>

 <div>
 <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
 Email
 </label>
 <input
 id="email"
 type="email"
 {...register('email')}
 className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="seu@email.com"
 />
 {errors.email && (
 <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
 )}
 </div>

 <div>
 <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
 Senha
 </label>
 <input
 id="password"
 type="password"
 {...register('password')}
 className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
 placeholder="••••••••"
 />
 {errors.password && (
 <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
 )}
 </div>

 <div>
 <label htmlFor="role" className="block text-sm font-medium text-foreground mb-1">
 Tipo de Conta
 </label>
 <select
 id="role"
 {...register('role')}
 className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
 >
 <option value="BUYER">Comprador</option>
 <option value="SELLER">Vendedor</option>
 </select>
 {errors.role && (
 <p className="mt-1 text-sm text-destructive">{errors.role.message}</p>
 )}
 </div>

 {error && (
 <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
 <p className="text-sm text-red-800">
 {typeof error === 'string' ? error : 'Erro ao criar conta'}
 </p>
 </div>
 )}

 <button
 type="submit"
 disabled={isLoading}
 className="w-full py-2 px-4 bg-primary600 hover:bg-primary700 text-black font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isLoading ? 'Criando conta...' : 'Criar Conta'}
 </button>
 </form>

 <div className="mt-6 text-center">
 <p className="text-sm text-muted-foreground">
 Já tem uma conta?{' '}
 <Link href="/auth/login" className="text-primary hover:text-blue-700 font-medium">
 Faça login
 </Link>
 </p>
 </div>
 </div>
 );
}
