'use client';

import React from 'react';
import { useLoginForm } from '@/hooks/forms/useLoginForm';

export default function LoginForm() {
  const { form, onSubmit, showPassword, togglePasswordVisibility, isLoading, error } = useLoginForm();
  const { register, formState: { errors } } = form;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Email Input */}
      <label className="flex flex-col w-full">
        <p className="text-text-main text-sm font-semibold leading-normal pb-2">E-mail ou Usuário</p>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#617989]">
            mail
          </span>
          <input
            {...register('email')}
            className={`form-input flex w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/20 border bg-card focus:border-primary h-12 pl-12 pr-4 text-base font-normal placeholder:text-[#9aaebc] transition-all ${
              errors.email ? 'border-red-500' : 'border-[#dbe1e6]'
            }`}
            placeholder="exemplo@email.com"
            type="text"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </label>

      {/* Password Input */}
      <label className="flex flex-col w-full">
        <div className="flex justify-between items-center pb-2">
          <p className="text-text-main text-sm font-semibold leading-normal">Senha</p>
        </div>
        <div className="relative flex w-full items-center">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#617989]">
            lock
          </span>
          <input
            {...register('password')}
            className={`form-input flex w-full rounded-lg text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/20 border bg-card focus:border-primary h-12 pl-12 pr-12 text-base font-normal placeholder:text-[#9aaebc] transition-all ${
              errors.password ? 'border-red-500' : 'border-[#dbe1e6]'
            }`}
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            disabled={isLoading}
          />
          <button
            onClick={togglePasswordVisibility}
            type="button"
            className="absolute right-0 h-full px-4 text-[#617989] hover:text-primary transition-colors flex items-center justify-center focus:outline-none"
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
      </label>

      {/* Options Row */}
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center cursor-pointer group">
          <div className="relative flex items-center">
            <input
              {...register('rememberMe')}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#dbe1e6] checked:border-primary checked:bg-primary transition-all"
              type="checkbox"
              disabled={isLoading}
            />
            <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-card-foreground text-[16px] opacity-0 peer-checked:opacity-100 pointer-events-none font-bold">
              check
            </span>
          </div>
          <span className="ml-2 text-sm text-[#617989] group-hover:text-text-main transition-colors">
            Lembrar-me
          </span>
        </label>
        <a
          className="text-sm font-semibold text-primary hover:text-primary-dark hover:underline transition-colors"
          href="#"
        >
          Esqueci minha senha
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all text-card-foreground text-base font-bold shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
