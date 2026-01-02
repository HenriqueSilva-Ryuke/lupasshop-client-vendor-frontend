'use client';

import React from 'react';
import SellerLoginForm from '@/components/auth/SellerLoginForm';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function SellerLoginPage() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-row">
      {/* Left Side: Login Form */}
      <div className="flex w-full flex-col justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-20 xl:px-32">
        <div className="mx-auto w-full max-w-[480px]">
          {/* Header / Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-primary">LupaShop</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-10">
            <h1 className="mb-3 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
              Bem-vindo de volta
            </h1>
            <p className="text-base font-normal leading-normal text-gray-500">
              Acesse seu painel para gerenciar suas vendas e estoque.
            </p>
          </div>

          {/* Form */}
          <SellerLoginForm />

          {/* Footer / Register */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Ainda não é parceiro LupaShop?{' '}
              <button
                onClick={() => router.push(`/${locale}/auth/seller-register`)}
                className="font-bold text-primary hover:text-primary-dark hover:underline cursor-pointer"
              >
                Crie sua loja agora
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Brand Visual */}
      <div className="hidden lg:relative lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:bg-gray-100 lg:p-12">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img
            alt="Interior of a modern boutique clothing store with organized shelves"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoSfTglbrr5lOKNQoF-NDtIn6tMzbp3xFJbgzTftoJU7PyPvqxT_mjxNbswvvyOjBlhxXcLme1cG_B30yHoCesnuVXDGgryaaC5xtNQXJuls8fCzwe1D9JK1933izwzpWvHoZIMl-wQardvQEuEI9YJedVVAJfPqFcl4VkJWVSApRwxIl9gW_vjEtxarAglFk2N6RpaLM6n-FaKlg8YYL41VT3qL40E_jtBfW5956wKSSKsYxTYOL2x9P1mck9wGDthlk42BBz1vg"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark/90 to-primary-dark/80 mix-blend-multiply opacity-95"></div>
        </div>

        {/* Content on top of image */}
        <div className="relative z-10 flex max-w-lg flex-col gap-6 text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl text-white">insights</span>
          </div>
          <h2 className="text-4xl font-black leading-tight tracking-tight">
            Potencialize seu e-commerce com a LupaShop
          </h2>
          <p className="text-lg font-medium text-gray-200">
            "A plataforma completa que integra gestão de estoque, vendas e logística em um único lugar. Simples, rápido e seguro."
          </p>

          {/* Stats / Trust Indicators */}
          <div className="mt-8 flex justify-center gap-8 border-t border-white/20 pt-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">15k+</span>
              <span className="text-xs text-gray-300 uppercase tracking-wider">Lojistas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">99.9%</span>
              <span className="text-xs text-gray-300 uppercase tracking-wider">Uptime</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">24/7</span>
              <span className="text-xs text-gray-300 uppercase tracking-wider">Suporte</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
