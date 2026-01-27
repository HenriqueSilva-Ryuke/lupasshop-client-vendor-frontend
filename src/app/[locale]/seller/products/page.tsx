'use client';

import React, { useState } from 'react';
import { BottomNav } from '@/components/seller/BottomNav';
import { SellerHeader } from '@/components/seller/SellerHeader';
import { ProductDrawer } from '@/components/seller/ProductDrawer';

export default function SellerProductsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mock data - will be replaced with real API data
  const products = [
    {
      id: '1',
      name: 'Tênis Urban Comfort',
      seller: 'LupaShoes',
      sku: 'SKU-8923',
      category: 'Calçados',
      price: 299.90,
      stock: 85,
      stockPercentage: 85,
      status: 'Ativo',
      statusColor: 'green',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZP1cqPffOPJJXr5Z62qYXtOFUZwxhMuPEVMU5rOiFburn2UiUPDXyxJoOlUQngjfCgmLInSqDYigvO6QRm8O3ffjnRq1KBtDKuien_Hr0IEGztHr_dYu8Fjl46MNeXqrTYmpUoSLTW0oE3jhw2voklqjnJKEAgHMjfogrgKl2R3kfQWmBZwBvldg1OzQgRwgYYb33Rq0QlfwZ5LdTNzHe5Zn5FEZN28RzSm0AvAHtJ_IHOnb5PNn6-_L1PecLpoy7ceOu73FvW_0'
    },
    {
      id: '2',
      name: 'Relógio Minimalista Silver',
      seller: 'TimeCenter',
      sku: 'SKU-1209',
      category: 'Acessórios',
      price: 549.00,
      stock: 4,
      stockPercentage: 15,
      status: 'Baixo Estq.',
      statusColor: 'yellow',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwVFl-98oyoDgVKpZhl9RO-0b4-L4kyE5nkSlcKEiXtFLoANm4cE6I-Jmzq78Rj8HLQNdupgtSeF49HYYJM76tnSnNQvHfsXO5xjYa8iCB1yt16nNAvpFYFKzwExWud4Bzt2mm0n6dy3eVDN9kkJuoLTYgkES3O7N7J61A-FM0VveZpJDhdbQzkZ-8pkrCkFbZTOBuP3_4AyVZmJh74D4ZJi3qeJaGq_8vMQoiJVWogO3eT5gZ57NtvrkgHyW5jKLwYvSgMLU9dD0'
    },
    {
      id: '3',
      name: 'Fone Wireless Pro',
      seller: 'AudioTech',
      sku: 'SKU-5541',
      category: 'Eletrônicos',
      price: 899.00,
      stock: 0,
      stockPercentage: 0,
      status: 'Esgotado',
      statusColor: 'gray',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA11NO153FkVtfURGBt0MjEIH77mvIFFsJXRwY3Ew5z6ZRC144lIXe5FVnv4jjis5fg4YOMjv733VXdQb844TTcAeij7P4XZyzhzIDFBkpr_Q_G4Mequx0Uu-OutzicVageFeqr0a76Dzx4U3ZN3Mkc2fjDyVYyhnX5lAUbP4n38V-0Lh-zZK32OHhTCw2mUguq4tWt2dPc4YEDBIsbAybHgqhrPI97FCMWLRhS97F-61OFZoEwzckBfOwWjJXkkq6KR48Izy19yco'
    },
    {
      id: '4',
      name: 'Mochila Adventure',
      seller: 'OutdoorLife',
      sku: 'SKU-3321',
      category: 'Acessórios',
      price: 189.90,
      stock: 42,
      stockPercentage: 60,
      status: 'Ativo',
      statusColor: 'green',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz0HXafarSrznqu7YyaLCPGmp6at4myZ3lJnAn1jprhr_OP6et7ar0S3_WmUhBanKBl59L9KsRhWvVdNKYuctX8NpBRckh4ikDKFFkAF12BH7qMDOgM8icjvTa62FTYKF2ZalamVcbnsGlJ6Ntwg3wZuNkZU3DMe2-bazVm8yM7xk8EQbaadvVxvSzw3rjx6yN-fuSFv7lq_5WFBo9-soI_7RqoGmcYUgqVZa50n6277wHQFs1N7hiTXvKzgB1KVV7GxGcUZV9brA'
    },
    {
      id: '5',
      name: 'Smart Speaker Echo',
      seller: 'TechHome',
      sku: 'SKU-7712',
      category: 'Casa',
      price: 349.90,
      stock: 120,
      stockPercentage: 95,
      status: 'Inativo',
      statusColor: 'red',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB1AcTppODZ4osokbKgzSMV2bZO7KzinQkcrrAZi8VV4e3rWbmWzu7qsDWF6Kg1BBd7TlSDgFv7H2nph3NFTUZeT8gFAY4xiQK3Pv-RLYbVVEisyvufbKA5pfi86aWJTWsEao8VvwpblnsiWmWOAZiNVT3kgYrd3KFgzyohRmPetGJ3S4-mWcSf7xVtW7S17PT7Ti8QzXstxibCpEmE4SHKEO52HsCVK1ORFbckkAMSw5j_MTjYkeR6XvEr9ua7vOjo5FHJ-q79xI'
    }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light bg-background-dark">
      {/* Sidebar/Bottom Navigation */}
      <BottomNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 border-slate-800 bg-white bg-slate-900 px-6 py-3 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-600 text-slate-200">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>storefront</span>
              </div>
              <h2 className="text-foreground text-white text-lg font-bold leading-tight hidden sm:block">
                Minha Loja: TechZone
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400" style={{ fontSize: '20px' }}>
                search
              </span>
              <input
                className="h-10 pl-10 pr-4 bg-slate-50 bg-slate-800 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/50 text-slate-700 text-slate-200 placeholder-slate-400"
                placeholder="Buscar..."
                type="text"
              />
            </div>
            <div className="h-6 w-px bg-slate-200 bg-slate-700 mx-1"></div>
            <div className="flex gap-2">
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-100 hover:bg-slate-800 text-slate-600 text-slate-300 relative transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white border-slate-900"></span>
              </button>
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-100 hover:bg-slate-800 text-slate-600 text-slate-300 transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>help</span>
              </button>
            </div>
            <div className="flex items-center gap-3 pl-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-primary/20 ring-slate-800"
                style={{
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjN6n_k_D89jZp93VVriHmC6nvQq8x4lcq3BuuxXYGa1mCBLdhnoAR7vqYT074vrUK86K_Rv9SnpfKS-dja2JVjFAuzc7-Hi8HAprkofD8wAjE-LYAKqzmLiqmHsJIrLcQcw42Mv6870WBJXx5aMIz_wxQ3cJa230MP0eRmUP_Px7RMhwDi-TJ3AQZ15VrPgOzjdON_hFsu7tUlShLLKATdv70nEMHbbsx2O3yQNcYkVc4cLDVv-cVMp9EQwKVlWzbS5q6JGxYVJA")',
                }}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 lg:pb-8">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
            {/* Breadcrumb and Title */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-slate-500 text-slate-400">
                <a className="hover:text-primary transition-colors" href="#">Home</a>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <a className="hover:text-primary transition-colors" href="#">Loja</a>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-foreground text-white font-medium">Produtos</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div>
                  <h1 className="text-3xl font-black text-foreground text-white tracking-tight">
                    Gestão de Produtos
                  </h1>
                  <p className="text-slate-500 text-slate-400 mt-1">
                    Gerencie o inventário e catálogo da sua loja na LupaShop.
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                  Adicionar Produto
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white bg-slate-900 rounded-xl p-5 border border-slate-200 border-slate-800 shadow-sm flex items-start justify-between group hover:border-primary/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-slate-400 text-sm font-medium">Total de Produtos</span>
                  <span className="text-2xl font-bold text-foreground text-white">1,240</span>
                </div>
                <div className="bg-primary/10 bg-primary-dark/40 text-primary text-primary-light p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>inventory</span>
                </div>
              </div>
              <div className="bg-white bg-slate-900 rounded-xl p-5 border border-slate-200 border-slate-800 shadow-sm flex items-start justify-between group hover:border-yellow-500/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-slate-400 text-sm font-medium">Estoque Baixo</span>
                  <span className="text-2xl font-bold text-foreground text-white">15</span>
                </div>
                <div className="bg-yellow-50 bg-yellow-900/20 text-yellow-600 text-yellow-400 p-2 rounded-lg group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>warning</span>
                </div>
              </div>
              <div className="bg-white bg-slate-900 rounded-xl p-5 border border-slate-200 border-slate-800 shadow-sm flex items-start justify-between group hover:border-green-500/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-slate-400 text-sm font-medium">Itens Ativos</span>
                  <span className="text-2xl font-bold text-foreground text-white">1,100</span>
                </div>
                <div className="bg-green-50 bg-green-900/20 text-green-600 text-green-400 p-2 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>check_circle</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white bg-slate-900 p-4 rounded-xl border border-slate-200 border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 bg-slate-800 border border-slate-200 border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground text-white transition-shadow"
                  placeholder="Buscar por nome, SKU..."
                  type="text"
                />
              </div>
              <div className="flex w-full md:w-auto gap-3 overflow-x-auto pb-1 md:pb-0">
                <div className="relative min-w-[140px]">
                  <select className="w-full appearance-none bg-slate-50 bg-slate-800 border border-slate-200 border-slate-700 text-slate-700 text-slate-300 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                    <option>Todas Categorias</option>
                    <option>Eletrônicos</option>
                    <option>Vestuário</option>
                    <option>Casa</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-sm">expand_more</span>
                </div>
                <div className="relative min-w-[120px]">
                  <select className="w-full appearance-none bg-slate-50 bg-slate-800 border border-slate-200 border-slate-700 text-slate-700 text-slate-300 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                    <option>Status: Todos</option>
                    <option>Ativo</option>
                    <option>Inativo</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-sm">expand_more</span>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 bg-slate-800 text-slate-700 text-slate-300 rounded-lg hover:bg-slate-200 hover:bg-slate-700 transition-colors text-sm font-medium whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Mais Filtros
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white bg-slate-900 rounded-xl border border-slate-200 border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 bg-slate-800/50 border-b border-slate-200 border-slate-800 text-xs uppercase tracking-wide text-slate-500 text-slate-400 font-semibold">
                      <th className="p-4 w-12 text-center">
                        <input className="rounded border-slate-300 text-primary focus:ring-primary size-4 bg-white bg-slate-800 border-slate-600" type="checkbox" />
                      </th>
                      <th className="p-4 min-w-[300px]">Produto</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Categoria</th>
                      <th className="p-4">Preço</th>
                      <th className="p-4">Estoque</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 divide-slate-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-primary/5 hover:bg-slate-800/50 transition-colors group">
                        <td className="p-4 text-center">
                          <input className="rounded border-slate-300 text-primary focus:ring-primary size-4 bg-white bg-slate-800 border-slate-600" type="checkbox" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="size-12 rounded-lg bg-cover bg-center border border-slate-200 border-slate-700 shrink-0" style={{ backgroundImage: `url(${product.image})` }}></div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground text-white">{product.name}</span>
                              <span className="text-xs text-slate-500 text-slate-400">Vendido por {product.seller}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-slate-600 text-slate-400 font-mono">{product.sku}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 bg-slate-800 text-slate-800 text-slate-200 border border-slate-200 border-slate-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-foreground text-white">R$ {product.price.toFixed(2)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-200 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  product.stockPercentage === 0 ? 'bg-red-500' : product.stockPercentage < 30 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${product.stockPercentage}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${
                              product.stock === 0 ? 'text-red-600 text-red-400' :
                              product.stock < 10 ? 'text-yellow-600 text-yellow-400' :
                              'text-slate-600 text-slate-400'
                            }`}>
                              {product.stock} un
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            product.statusColor === 'green' ? 'bg-green-50 bg-green-900/30 text-green-700 text-green-400 border-green-200 border-green-800' :
                            product.statusColor === 'yellow' ? 'bg-yellow-50 bg-yellow-900/30 text-yellow-700 text-yellow-400 border-yellow-200 border-yellow-800' :
                            product.statusColor === 'red' ? 'bg-red-50 bg-red-900/30 text-red-700 text-red-400 border-red-200 border-red-800' :
                            'bg-slate-100 bg-slate-800 text-slate-500 text-slate-400 border-slate-200 border-slate-700'
                          }`}>
                            <span className={`size-1.5 rounded-full ${
                              product.statusColor === 'green' ? 'bg-green-500' :
                              product.statusColor === 'yellow' ? 'bg-yellow-500' :
                              product.statusColor === 'red' ? 'bg-red-500' :
                              'bg-slate-400'
                            }`}></span>
                            {product.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 hover:bg-slate-800 rounded-lg transition-colors" title="Editar">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:bg-red-900/20 rounded-lg transition-colors" title="Excluir">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:text-white hover:bg-slate-100 hover:bg-slate-800 rounded-lg transition-colors">
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-slate-200 border-slate-800 bg-slate-50 bg-slate-900">
                <span className="text-sm text-slate-500 text-slate-400">
                  Mostrando <span className="font-medium text-foreground text-white">1-5</span> de{' '}
                  <span className="font-medium text-foreground text-white">1,240</span> produtos
                </span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 rounded border border-slate-200 border-slate-700 text-slate-500 text-slate-400 hover:bg-white hover:bg-slate-800 disabled:opacity-50 text-sm">
                    Anterior
                  </button>
                  <button className="px-3 py-1 rounded bg-primary text-white border border-primary text-sm">1</button>
                  <button className="px-3 py-1 rounded border border-slate-200 border-slate-700 text-slate-500 text-slate-400 hover:bg-white hover:bg-slate-800 text-sm">
                    2
                  </button>
                  <button className="px-3 py-1 rounded border border-slate-200 border-slate-700 text-slate-500 text-slate-400 hover:bg-white hover:bg-slate-800 text-sm">
                    3
                  </button>
                  <span className="px-2 py-1 text-slate-400">...</span>
                  <button className="px-3 py-1 rounded border border-slate-200 border-slate-700 text-slate-500 text-slate-400 hover:bg-white hover:bg-slate-800 text-sm">
                    12
                  </button>
                  <button className="px-3 py-1 rounded border border-slate-200 border-slate-700 text-slate-500 text-slate-400 hover:bg-white hover:bg-slate-800 text-sm">
                    Próximo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Product Drawer */}
      <ProductDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => {
          // Refresh products list
          console.log('Product created successfully');
        }}
      />
    </div>
  );
}
