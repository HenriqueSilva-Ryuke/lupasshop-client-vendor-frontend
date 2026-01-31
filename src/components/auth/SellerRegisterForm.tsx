'use client';

import React from 'react';
import { useSellerRegisterForm } from '@/hooks/forms/useSellerRegisterForm';

export default function SellerRegisterForm() {
  const {
    form,
    onSubmit,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    isLoading,
    error,
  } = useSellerRegisterForm();
  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Full Name Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-text-main text-sm font-medium leading-normal">Nome Completo</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            person
          </span>
          <input
            {...register('fullName')}
            className={`form-input w-full rounded-xl border bg-slate-50 text-text-main placeholder:text-slate-400 focus:border-primary focus:ring-primary h-12 pl-11 pr-4 text-base transition-shadow ${
              errors.fullName ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="Seu nome completo"
            type="text"
            disabled={isLoading}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-text-main text-sm font-medium leading-normal">E-mail Corporativo</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            mail
          </span>
          <input
            {...register('email')}
            className={`form-input w-full rounded-xl border bg-slate-50 text-text-main placeholder:text-slate-400 focus:border-primary focus:ring-primary h-12 pl-11 pr-4 text-base transition-shadow ${
              errors.email ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="seu@loja.com"
            type="email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Password Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main text-sm font-medium leading-normal">Senha</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              lock
            </span>
            <input
              {...register('password')}
              className={`form-input w-full rounded-xl border bg-slate-50 text-text-main placeholder:text-slate-400 focus:border-primary focus:ring-primary h-12 pl-11 pr-10 text-base transition-shadow ${
                errors.password ? 'border-red-500' : 'border-slate-200'
              }`}
              placeholder="******"
              type={showPassword ? 'text' : 'password'}
              disabled={isLoading}
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              type="button"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main text-sm font-medium leading-normal">Confirmar Senha</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              lock_reset
            </span>
            <input
              {...register('confirmPassword')}
              className={`form-input w-full rounded-xl border bg-slate-50 text-text-main placeholder:text-slate-400 focus:border-primary focus:ring-primary h-12 pl-11 pr-10 text-base transition-shadow ${
                errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
              }`}
              placeholder="******"
              type={showConfirmPassword ? 'text' : 'password'}
              disabled={isLoading}
            />
            <button
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              type="button"
              tabIndex={-1}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showConfirmPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Checkbox */}
      <div className="flex items-start gap-3 mt-2">
        <div className="flex h-6 items-center">
          <input
            {...register('terms')}
            className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
            id="terms"
            type="checkbox"
            disabled={isLoading}
          />
        </div>
        <div className="text-sm leading-6">
          <label className="font-normal text-slate-500" htmlFor="terms">
            Concordo com os{' '}
            <a className="font-semibold text-primary hover:text-primary-dark hover:underline" href="#">
              Termos de Uso
            </a>{' '}
            e a{' '}
            <a className="font-semibold text-primary hover:text-primary-dark hover:underline" href="#">
              Política de Privacidade
            </a>{' '}
            da LupaShop.
          </label>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary hover:bg-primary-dark text-card-foreground text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="truncate">{isLoading ? 'Criando loja...' : 'Criar minha loja'}</span>
      </button>
    </form>
  );
}
