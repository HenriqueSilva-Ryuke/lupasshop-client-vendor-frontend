'use client';

import React from 'react';
import { useOnboardingTour } from '@/hooks/useOnboardingTour';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function OnboardingTour() {
 const locale = useLocale();
 const {
 steps,
 completedSteps,
 completionPercentage,
 skipTour,
 handleStepAction,
 } = useOnboardingTour();

 return (
 <div className="min-h-screen flex flex-col bg-background-light">
 {/* Top Navigation Bar */}
 <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] bg-card px-6 py-4">
 <div className="mx-auto flex max-w-7xl items-center justify-between">
 <Link href={`/${locale}`} className="flex items-center gap-3 cursor-pointer">
 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-card-foreground">
 <span className="material-symbols-outlined text-[20px]">storefront</span>
 </div>
 <h2 className="text-xl font-bold tracking-tight text-primary">LupaShop</h2>
 </Link>
 <div className="flex items-center gap-6">
 <button
 onClick={skipTour}
 className="hidden text-sm font-medium text-[#6b7280] hover:text-primary sm:block transition-colors"
 >
 Pular introdução
 </button>
 <div className="flex items-center gap-3">
 <div className="text-right hidden sm:block">
 <p className="text-sm font-bold text-foreground">Minha Loja</p>
 <p className="text-xs text-[#6b7280]">Bem-vindo!</p>
 </div>
 <div className="h-10 w-10 overflow-hidden rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
 <span className="material-symbols-outlined text-primary text-[20px]">person</span>
 </div>
 </div>
 </div>
 </div>
 </header>

 {/* Main Content */}
 <main className="flex-1 w-full bg-[#f9fafb]">
 <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
 {/* Page Heading */}
 <div className="mb-10 text-center sm:text-left">
 <h1 className="text-3xl font-black text-foreground sm:text-4xl tracking-tight mb-3">
 Bem-vindo à LupaShop!
 </h1>
 <p className="text-lg text-[#4b5563] max-w-2xl">
 Vamos colocar sua loja no ar em poucos minutos. Siga os passos abaixo para começar a vender online.
 </p>
 </div>

 {/* Progress Bar */}
 <div className="mb-12 bg-card p-6 rounded-xl border border-[#e5e7eb] shadow-sm">
 <div className="flex flex-col gap-4">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-base font-bold text-foreground">Progresso da configuração</p>
 <p className="text-sm text-[#6b7280]">
 {completedSteps.length} de {steps.length} tarefas completadas
 </p>
 </div>
 <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
 </div>
 <div className="relative h-3 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
 <div
 className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
 style={{ width: `${completionPercentage}%` }}
 />
 </div>
 </div>
 </div>

 {/* Feature Section / Onboarding Steps */}
 <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
 {steps.map((step) => (
 <div
 key={step.id}
 className={`group relative flex flex-col rounded-xl transition-all overflow-hidden ${
 step.status === 'completed'
 ? 'border border-primary/20 bg-card shadow-sm hover:shadow-md'
 : step.status === 'active'
 ? 'border-2 border-primary bg-card shadow-lg ring-4 ring-primary/10'
 : 'border border-[#e5e7eb] bg-card opacity-80 shadow-sm hover:opacity-100 hover:border-border'
 }`}
 >
 {/* Status Indicator */}
 {step.status === 'completed' && (
 <div className="absolute right-0 top-0 p-3">
 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-primary">
 <span className="material-symbols-outlined text-[16px] font-bold">
 check
 </span>
 </div>
 </div>
 )}

 {step.status === 'active' && (
 <div className="absolute top-3 right-3 animate-pulse">
 <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20">
 Próximo passo
 </span>
 </div>
 )}

 {/* Card Content */}
 <div className="p-6 flex flex-col h-full">
 {/* Icon */}
 <div
 className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300 ${
 step.status === 'completed'
 ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-card-foreground'
 : step.status === 'active'
 ? 'bg-primary text-card-foreground shadow-md'
 : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
 }`}
 >
 <span className="material-symbols-outlined text-[24px]">
 {step.icon}
 </span>
 </div>

 {/* Title */}
 <h3
 className={`mb-2 text-lg font-bold ${
 step.status === 'active'
 ? 'text-primary'
 : 'text-foreground'
 }`}
 >
 {step.title}
 </h3>

 {/* Description */}
 <p className="mb-6 flex-1 text-sm leading-relaxed text-[#6b7280]">
 {step.description}
 </p>

 {/* Action Button */}
 <button
 onClick={() => {
 if (step.status !== 'locked') {
 handleStepAction(step.id, step.action);
 }
 }}
 disabled={step.status === 'locked'}
 className={`inline-flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold transition-all ${
 step.status === 'completed'
 ? 'border border-[#e5e7eb] bg-card text-[#374151] hover:bg-muted hover:text-foreground'
 : step.status === 'active'
 ? 'bg-primary text-card-foreground hover:bg-primary-dark shadow-sm hover:shadow active:scale-95'
 : 'border border-[#e5e7eb] bg-muted text-[#9ca3af] hover:bg-muted hover:text-[#6b7280] cursor-not-allowed'
 }`}
 >
 {step.actionLabel}
 </button>
 </div>

 {/* Bottom Indicator */}
 {step.status === 'completed' && (
 <div className="h-1 w-full text-primary" />
 )}
 </div>
 ))}
 </div>

 {/* Help Section */}
 <div className="rounded-2xl bg-primary-dark overflow-hidden relative">
 <div
 className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center"
 style={{
 backgroundImage:
 'url(https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop)',
 }}
 />
 <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-10 text-center sm:flex-row sm:text-left sm:px-12">
 <div className="flex flex-col gap-2">
 <h3 className="text-2xl font-bold text-card-foreground">
 Precisa de ajuda com a configuração?
 </h3>
 <p className="text-primary-light/80 text-sm sm:text-base">
 Nossa equipe de suporte preparou um guia completo para iniciantes.
 </p>
 </div>
 <button className="flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-muted whitespace-nowrap shadow-lg">
 <span className="material-symbols-outlined text-[20px]">
 help
 </span>
 Acessar Central de Ajuda
 </button>
 </div>
 </div>
 </div>
 </main>

 {/* Footer */}
 <footer className="border-t border-[#e5e7eb] bg-card py-8">
 <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
 <p className="text-sm text-[#6b7280]">
 © 2024 LupaShop Inc. Todos os direitos reservados.
 </p>
 <div className="flex gap-6">
 <a
 className="text-sm text-[#6b7280] hover:text-primary hover:underline transition-colors"
 href="#"
 >
 Termos de Uso
 </a>
 <a
 className="text-sm text-[#6b7280] hover:text-primary hover:underline transition-colors"
 href="#"
 >
 Privacidade
 </a>
 <a
 className="text-sm text-[#6b7280] hover:text-primary hover:underline transition-colors"
 href="#"
 >
 Suporte
 </a>
 </div>
 </div>
 </footer>
 </div>
 );
}
