'use client';

import React from 'react';
import { BottomNav } from '@/components/seller/BottomNav';
import { SellerHeader } from '@/components/seller/SellerHeader';

export default function SellerDashboardPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar/Bottom Navigation */}
      <BottomNav />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full relative scroll-smooth">
        {/* Header */}
        <SellerHeader />

        {/* Dashboard Content */}
        <div className="px-6 py-8 lg:px-10 max-w-[1400px] mx-auto flex flex-col gap-8 pb-24 lg:pb-8">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Sales */}
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Vendas Totais</p>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined text-[20px]">attach_money</span>
                </div>
              </div>
              <div>
                <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">
                  R$ 12.450,00
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-[16px] text-[#078838]">trending_up</span>
                  <p className="text-[#078838] text-sm font-medium">
                    +12% <span className="text-text-sub-light dark:text-text-sub-dark font-normal text-xs ml-1">vs ontem</span>
                  </p>
                </div>
              </div>
            </div>

            {/* New Orders */}
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Novos Pedidos</p>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-primary dark:text-primary-light">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </div>
              </div>
              <div>
                <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">45</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-[16px] text-[#078838]">trending_up</span>
                  <p className="text-[#078838] text-sm font-medium">
                    +5% <span className="text-text-sub-light dark:text-text-sub-dark font-normal text-xs ml-1">vs ontem</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Average Ticket */}
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Ticket Médio</p>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                </div>
              </div>
              <div>
                <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">
                  R$ 276,00
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-[16px] text-[#078838]">trending_up</span>
                  <p className="text-[#078838] text-sm font-medium">
                    +1.2% <span className="text-text-sub-light dark:text-text-sub-dark font-normal text-xs ml-1">vs média</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stock Alert */}
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium">Alerta de Estoque</p>
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                </div>
              </div>
              <div>
                <p className="text-text-main-light dark:text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">
                  12 itens
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-[16px] text-[#e73908]">trending_down</span>
                  <p className="text-[#e73908] text-sm font-medium">Baixo estoque</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chart and Stock Alert */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Performance Chart */}
            <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-main-light dark:text-text-main-dark text-base font-bold leading-normal">
                    Desempenho de Vendas
                  </h3>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-sm">Últimos 30 dias</p>
                </div>
                <select className="bg-gray-50 dark:bg-gray-800 border-none text-sm rounded-lg px-3 py-1.5 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary outline-none cursor-pointer">
                  <option>Diário</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                </select>
              </div>
              <div className="flex min-h-[220px] flex-1 flex-col justify-end gap-2 py-4 relative group">
                <svg className="overflow-visible" fill="none" height="180" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                      <stop stopColor="#412778" stopOpacity="0.2"></stop>
                      <stop offset="1" stopColor="#412778" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear)"></path>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#412778" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
                <div className="flex justify-between w-full px-2 mt-2">
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">01</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">05</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">10</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">15</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">20</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">25</p>
                  <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-semibold tracking-wider">30</p>
                </div>
              </div>
            </div>

            {/* Critical Stock */}
            <div className="flex flex-col flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark p-0 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-text-main-light dark:text-text-main-dark text-sm font-bold">Estoque Crítico</h3>
                <a className="text-xs font-medium text-primary hover:text-primary-light hover:underline" href="#">Ver tudo</a>
              </div>
              <div className="flex flex-col">
                {[
                  { name: 'Tênis Nike Air Max', sku: '839201', stock: 2, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAarytC__ni41MsEV4rRe3ft-mWuNMLm20TbFOR21TDDmnS3w2phWxHZt3SByh_ytfqlEGMsVP1hQLUyahBpQTYYeWrZDxBbVACewiN9VPFRNmrCwcYPB9OnJA77NnyccgomJrX-xThzpi4en1lf4VGJB7whmnyrLJjxfDJ7Ke91e4ANPsYOQgXAE-wNtfoRQQUIyoONXMDB-JKARHQrYUk721vIsdEZbM2rbiq29LAmP_H-elTnSJ9KXOtJ7OxCnmcBJT0hiEuf-k' },
                  { name: 'Headphone Wireless Sony', sku: '129304', stock: 5, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQmPeUD3g_Pe0dxcUFtdOnhP46hgWwW1ykKaJR2Q4mNZrBj7xliN-bvjqxgNhSNlcOG0Mr2RPUtS_LEopyipJRLyG20Y7Afeb7nzTIvMeMm-_7KJrsVl9wXaTJnBu_u-ALbsW-tIWTvdtNpiFTA2ZOt-9nHK8HO9cqcLAwRCQZ1N7NQDCoE5RjhRXIFc00lHkAFjgHup11HHshuDOfTI5ngdCrOKffd51D3c9KT49WYhQg30oQD66WREF0zsVDeGHZzUwZ4VTCakw' },
                  { name: 'Smartwatch Series 5', sku: '554321', stock: 4, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy5SK36zbdmRXKiQUqctWJ1TEM7Ks3672QCT0pVP4rTqCvwWB3o4aPGu-FF7A7ozPeip0paSg9BBaUYUxIFYM-KW2AsK_hhnx_Kckh4NF-6-LcLaD9XT34ix3ZWjCB9Bc-CbPiDtCRmum43AihSCBHaUtGfA6TNrAcPMxNjWg5xYFeATG6u76_4u4JMMVn3NzNYbLvyIBkezCpyUdKeifljGxsxxUaqyOHgmwrk28ec96RGFhBgGjdu4EyMgaMARJovcAQH4-IqAU' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-700 bg-cover bg-center shrink-0 border border-gray-100 dark:border-gray-600" style={{ backgroundImage: `url(${product.image})` }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">{product.name}</p>
                      <p className="text-xs text-text-sub-light dark:text-text-sub-dark">SKU: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        product.stock <= 2 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {product.stock} restam
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-main-light dark:text-text-main-dark">
                Pedidos Recentes
              </h3>
              <a className="text-sm font-medium text-primary hover:text-primary-light dark:hover:text-primary-light flex items-center gap-1" href="#">
                Ver todos
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark">ID do Pedido</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark">Cliente</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark">Data</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark">Status</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark text-right">Valor Total</th>
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light dark:text-text-sub-dark"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {[
                      { id: '#ORD-7382', customer: 'Ana Silva', date: 'Hoje, 14:30', status: 'Concluído', value: 'R$ 245,90', statusColor: 'green', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZfE4eL1eUGz7fiDGewx1-IY1pz41jUG2AnZOkBFcnsegPkJlvgzqnlhO-unwtJKkHSJNBY5qj6-wkxqDrOA3-4_bNNgS5--Lm3mRCSrBkakkbyvJy0nHeaN8P-psG5jIMxTFdr9zmgh321vkuyRFidFskSret9JlxJME6VmIt-4seZJJCOUDPj-g6LbBXBDkG_H2yp_ysJ-IW-BafqDAgy2JPy_5lYpH0M5cMuzS9dNnxeYYDI9k04yNUhEUfdKTxr7245l1PdAU' },
                      { id: '#ORD-7381', customer: 'Carlos Souza', date: 'Hoje, 11:15', status: 'Pendente', value: 'R$ 1.250,00', statusColor: 'yellow', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFUnHNEyQDAqL-7Qzn4L_WkANqvqmu4g0PxleKeTiaX67oopYb3xg2om-GvmWFfZgiGf9WcR74oGXuFP7aFpvXXx2xSNF57OO-hP3puCaxFckHhugP_Xr-vLyWsyvzC5Urlw-Wa0LVRuQGvk8Q9rMA5aIsKYTe3wNdAXzCuDInuZn9qA1e96u_IjoseIpACcdJtffZhV_B4OAs8pmLNcbKtybWY4zQqHwQKDnsg6MZMYwL1UrQKaoL8JqsZNtMydEvLrjXEgGFTbw' },
                      { id: '#ORD-7380', customer: 'Mariana Costa', date: 'Ontem, 18:45', status: 'Enviado', value: 'R$ 89,90', statusColor: 'blue', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1OjQw7Hl1ZkD8XVijAUbvz-zByphaYLdZNiAPNw9FZ9NfB-9qr0_EDyN9kchQWjTcnnDqYpfrqy041L6arLUU2bchFxVkQmO9Zpj6D0mc15BfVU0-IlDZWNoVDomCVDsdN-yVFGibs48SLxkFp3q9GQRRXesg3ZKIMCU6nM9AvQklVsUo4Lg6a5ihgBns-XfrS5cnaIrCeB9I594-tMUex4CyAhEPTtOgUXRbwvabMCjYGa4cvvlzIu9ZHYpZzIY8XmVMePH8tJ8' },
                      { id: '#ORD-7379', customer: 'Roberto Lima', date: 'Ontem, 09:20', status: 'Concluído', value: 'R$ 412,50', statusColor: 'green', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyilmwI2Lck9BN8KMFG06TQEh9tWJ6R33FENqgmCeXtDSmaskfZQzLzCGH7I0FwsV0RShu0hvC8byYJGvo_tKLh50FEHQJXRgdV1wMihn59c-KfkyataSRZ40EbixI5Kx-CbEOcZptTaKUpJxPGXE97CCVjzZ_uwCwaWtts0oY7uSW0n0ULm3VfmMxS0vzYjr_OKc6Sj5Kg4m5cOJMEALIGs7c6Wi46CbGpCwh3iElQqjijd1-RJzf1730-jASyv6tnd7pbWwu548' },
                    ].map((order, index) => (
                      <tr key={index} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="p-4 text-sm font-medium text-text-main-light dark:text-text-main-dark">{order.id}</td>
                        <td className="p-4 text-sm text-text-main-light dark:text-text-main-dark">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-200 bg-cover bg-center ring-2 ring-white dark:ring-gray-800" style={{ backgroundImage: `url(${order.avatar})` }}></div>
                            <span>{order.customer}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-text-sub-light dark:text-text-sub-dark">{order.date}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                            order.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-medium text-text-main-light dark:text-text-main-dark text-right">{order.value}</td>
                        <td className="p-4 text-right">
                          <button className="text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
