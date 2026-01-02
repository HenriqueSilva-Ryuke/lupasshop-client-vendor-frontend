'use client';

import React from 'react';
import { SellerMultiStepRegisterForm } from '@/components/auth/SellerMultiStepRegisterForm';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function SellerRegisterPage() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-100 px-6 lg:px-10 py-4 bg-white z-20">
        <Link href={`/${locale}`} className="flex items-center gap-3 cursor-pointer">
          <div className="size-8 text-primary flex items-center justify-center rounded-lg bg-primary/10">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">LupaShop</h2>
        </Link>
        <div className="flex gap-4 items-center">
          <span className="hidden sm:block text-sm text-slate-500">Já tem uma conta?</span>
          <button
            onClick={() => router.push(`/${locale}/auth/seller-login`)}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-colors"
          >
            <span className="truncate">Entrar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row h-full">
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 xl:p-20 bg-white">
          <div className="w-full max-w-[600px] flex flex-col gap-6">
            {/* Header Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-text-main text-3xl lg:text-4xl font-bold leading-tight mb-2 tracking-tight">
                Crie sua loja em 4 passos
              </h1>
              <p className="text-slate-500 text-base font-normal">
                Complete seu cadastro e comece a vender na LupaShop hoje mesmo.
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white">
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLBIuBiJeGS-8Mskku5FkvQSiur94G7fCxjygPhMaiArQ-iTC29GfRFJGPeGeX0WseHG6FU-4mkU_HmrparIJqgYMbherBjjDDi2p_ae0xwbYQsBe1durnsr4UNCD-lGxXO10RQ8e6f3FmHu42CKWaIDbnWyEqOIyeBltnQV6mOWHemZPJ7Lx0kAki9ooGpPZGLhRt7nEDzoAHCsNN-q0FCEyLxxIxWcRKv4O2atdysstZeGQMJrdAOSsziTZtYXZvjBbLh915Hso"
                />
                <span className="text-sm font-medium text-text-main">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white">
                <img
                  alt="Facebook"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1Rbsz-UMWAETW9kTn2nKoxifGj-cWY1bqwZsQHk3D-dxMGaFwHj1eXLqoarcPKEibK-BqUM5-JBv4PnXOYq6bou2PkG4ZlpMGj8YjN6KfMMQj51PdLSnQ37bo91s-c-QBuuKMy2vD49Z5_eTUQDaVmfu2RFEPdK-L_6NMVsynpWyIoBI-b4VovevTGDZtrcVjVTyQlO6DnaLRc6cQXTI84tEbGl5stZqfGouLKWPWz94VDXqN7YCCvyC6zEcBMUKDJK4CnHbUAc"
                />
                <span className="text-sm font-medium text-text-main">Facebook</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium uppercase tracking-wider">
                Ou complete o cadastro
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Registration Form */}
            <SellerMultiStepRegisterForm />
          </div>
        </div>

        {/* Right Side: Visual Image */}
        <div className="hidden lg:flex flex-1 relative bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 m-6 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-primary-light/40 mix-blend-multiply z-10"></div>
            <img
              alt="Modern retail store with organized products"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoSfTglbrr5lOKNQoF-NDtIn6tMzbp3xFJbgzTftoJU7PyPvqxT_mjxNbswvvyOjBlhxXcLme1cG_B30yHoCesnuVXDGgryaaC5xtNQXJuls8fCzwe1D9JK1933izwzpWvHoZIMl-wQardvQEuEI9YJedVVAJfPqFcl4VkJWVSApRwxIl9gW_vjEtxarAglFk2N6RpaLM6n-FaKlg8YYL41VT3qL40E_jtBfW5956wKSSKsYxTYOL2x9P1mck9wGDthlk42BBz1vg"
            />
            <div className="absolute bottom-0 left-0 p-12 z-20 text-white max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold mb-6">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Plataforma Confiável
              </div>
              <h3 className="text-4xl font-bold mb-4 leading-tight">
                Gerencie seu e-commerce com facilidade.
              </h3>
              <p className="text-lg text-white/90 font-medium">
                Integração com estoque, gestão de vendas, logística e pagamentos tudo em um único painel.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
