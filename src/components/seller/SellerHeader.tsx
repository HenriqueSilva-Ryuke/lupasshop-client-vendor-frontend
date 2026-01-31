'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function SellerHeader() {
  const router = useRouter();
  const locale = useLocale();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-card/95 bg-card-dark/95 backdrop-blur-md border-b border-border border-border">
      <div className="px-6 py-4 lg:px-10">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em] text-text-main-light text-text-main-dark">
              Painel de Controle
            </h1>
            <p className="text-text-sub-light text-text-sub-dark text-sm lg:text-base font-normal">
              Bem-vindo de volta, Lupa Store. Aqui está o resumo de hoje.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-muted hover:bg-gray-700 text-text-sub-light text-text-sub-dark transition-colors"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive/100 ring-2 ring-white ring-card-dark"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card bg-card-dark rounded-xl shadow-2xl border border-border border-border overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 border-border bg-muted bg-gray-800">
                    <h3 className="text-sm font-bold text-text-main-light text-text-main-dark">Notificações</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-muted hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 border-border">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 bg-green-900/30 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-green-600 text-green-400 text-[20px]">shopping_bag</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-main-light text-text-main-dark">Novo pedido #7382</p>
                          <p className="text-xs text-text-sub-light text-text-sub-dark mt-1">Ana Silva fez um pedido de R$ 245,90</p>
                          <p className="text-xs text-primary mt-1">Há 5 minutos</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-muted hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 border-border">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-100 bg-orange-900/30 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-orange-600 text-orange-400 text-[20px]">warning</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-main-light text-text-main-dark">Estoque baixo</p>
                          <p className="text-xs text-text-sub-light text-text-sub-dark mt-1">Tênis Nike Air Max com apenas 2 unidades</p>
                          <p className="text-xs text-primary mt-1">Há 1 hora</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-muted hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 bg-blue-900/30 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-blue-600 text-blue-400 text-[20px]">local_shipping</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-main-light text-text-main-dark">Pedido enviado</p>
                          <p className="text-xs text-text-sub-light text-text-sub-dark mt-1">Pedido #7380 está a caminho</p>
                          <p className="text-xs text-primary mt-1">Há 3 horas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-100 border-border bg-muted bg-gray-800">
                    <button className="w-full text-center text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Add Product Button */}
            <button
              onClick={() => router.push(`/${locale}/seller/products/new`)}
              className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-card-foreground text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
            >
              <span className="mr-2 material-symbols-outlined text-[18px]">add</span>
              <span className="truncate hidden sm:inline">Adicionar Produto</span>
              <span className="truncate sm:hidden">Novo</span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted hover:bg-gray-700 transition-colors"
              >
                <div
                  className="h-10 w-10 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-gray-200 ring-gray-700"
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9XoTRKQB7OEepJJDpuroW3AHLNjkPKZ9BF4xPPy2G4RzhZWaxpOtAjCsNKy6uoVw86ta_otBSHVqG2jPy1kDSgBV6jmztppioFfvWXCpjYIfb_MkWt7YbWjO0S4p91Zeqc8CecdIT5LyJ8IedsAV8fcJYZ2ih6qK2FlFmLiOHJKulNM7pJq0my_daYlCmvwnPy9OMLXLGPIRPZ4MH4y5zfarpB9-cVGLvwxWD2hFeaH6E3G7w2_xIGknzUnDjQVA1L4Q1TbaaLe8")',
                  }}
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-card bg-card-dark rounded-xl shadow-2xl border border-border border-border overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 border-border bg-muted bg-gray-800">
                    <p className="text-sm font-bold text-text-main-light text-text-main-dark">Loja Exemplo</p>
                    <p className="text-xs text-text-sub-light text-text-sub-dark">admin@lupashop.com.br</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => router.push(`/${locale}/seller/profile`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted hover:bg-gray-700 text-text-main-light text-text-main-dark transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">person</span>
                      <span className="text-sm font-medium">Meu Perfil</span>
                    </button>
                    <button
                      onClick={() => router.push(`/${locale}/seller/settings`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted hover:bg-gray-700 text-text-main-light text-text-main-dark transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      <span className="text-sm font-medium">Configurações</span>
                    </button>
                    <button
                      onClick={() => router.push(`/${locale}/seller/help`)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted hover:bg-gray-700 text-text-main-light text-text-main-dark transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">help</span>
                      <span className="text-sm font-medium">Ajuda</span>
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-100 border-border">
                    <button
                      onClick={() => {
                        localStorage.removeItem('authToken');
                        window.location.href = `/${locale}`;
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 hover:bg-red-900/10 text-destructive text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
