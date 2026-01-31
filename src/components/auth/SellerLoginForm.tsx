'use client';

import React from 'react';
import { useSellerLoginForm } from '@/hooks/forms/useSellerLoginForm';

export default function SellerLoginForm() {
 const { form, onSubmit, showPassword, togglePasswordVisibility, isLoading, error } = useSellerLoginForm();
 const { register, formState: { errors } } = form;

 return (
 <form onSubmit={onSubmit} className="flex flex-col gap-6">
 {/* Error Alert */}
 {error && (
 <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
 {error}
 </div>
 )}

 {/* Email Field */}
 <div className="flex flex-col gap-2">
 <label className="text-sm font-semibold text-foreground" htmlFor="email">
 E-mail corporativo
 </label>
 <div className="relative flex items-center">
 <input
 {...register('email')}
 className={`w-full rounded-xl border bg-muted p-4 text-base text-foreground outline-none ring-offset-2 placeholder:text-muted-foreground focus:bg-card focus:ring-2 focus:ring-primary/20 transition-all ${
 errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
 }`}
 id="email"
 placeholder="seuemail@loja.com"
 type="email"
 disabled={isLoading}
 />
 <div className="pointer-events-none absolute right-4 flex text-muted-foreground">
 <span className="material-symbols-outlined">mail</span>
 </div>
 {errors.email && (
 <p className="text-red-500 text-xs mt-1 absolute -bottom-6">{errors.email.message}</p>
 )}
 </div>
 </div>

 {/* Password Field */}
 <div className="flex flex-col gap-2">
 <label className="text-sm font-semibold text-foreground" htmlFor="password">
 Senha
 </label>
 <div className="relative flex items-center">
 <input
 {...register('password')}
 className={`w-full rounded-xl border bg-muted p-4 pr-12 text-base text-foreground outline-none ring-offset-2 placeholder:text-muted-foreground focus:bg-card focus:ring-2 focus:ring-primary/20 transition-all ${
 errors.password ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'
 }`}
 id="password"
 placeholder="••••••••"
 type={showPassword ? 'text' : 'password'}
 disabled={isLoading}
 />
 <button
 onClick={togglePasswordVisibility}
 className="absolute right-4 flex text-muted-foreground hover:text-foreground transition-colors"
 type="button"
 tabIndex={-1}
 >
 <span className="material-symbols-outlined">
 {showPassword ? 'visibility' : 'visibility_off'}
 </span>
 </button>
 {errors.password && (
 <p className="text-red-500 text-xs mt-1 absolute -bottom-6">{errors.password.message}</p>
 )}
 </div>
 </div>

 {/* Forgot Password & Remember Me */}
 <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
 <label className="flex items-center gap-2 cursor-pointer">
 <input
 {...register('rememberMe')}
 className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
 type="checkbox"
 disabled={isLoading}
 />
 <span className="text-sm text-muted-foreground">Lembrar-me</span>
 </label>
 <a className="text-sm font-bold text-primary-light hover:text-primary hover:underline" href="#">
 Esqueci minha senha
 </a>
 </div>

 {/* Submit Button */}
 <button
 type="submit"
 disabled={isLoading}
 className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-card-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isLoading ? 'Acessando...' : 'Acessar Painel'}
 <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
 </button>
 </form>
 );
}
