'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { BottomNav } from '@/components/seller/BottomNav';
import { useSellerOrders } from '@/hooks/useSellerOrders';
import { useClientAuth } from '@/hooks/useClientAuth';

const statusConfig = {
  PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800 bg-yellow-900/40 text-yellow-300 border border-yellow-200 border-yellow-800' },
  PAID: { label: 'Pago', color: 'bg-green-100 text-green-800 bg-green-900/40 text-green-300 border border-green-200 border-green-800' },
  SHIPPED: { label: 'Enviado', color: 'bg-purple-50 text-purple-700 bg-purple-900/40 text-purple-300 border border-purple-200 border-purple-800' },
  DELIVERED: { label: 'Entregue', color: 'bg-green-100 text-green-800 bg-green-900/40 text-green-300 border border-green-200 border-green-800' },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800 bg-red-900/40 text-red-300 border border-red-200 border-red-800' },
};

const shippingStatusConfig = {
  'Pronto p/ Envio': { label: 'Pronto p/ Envio', color: 'bg-primary/10 text-primary-dark text-primary-light border border-primary/20 border-primary/30' },
  'Aguardando': { label: 'Aguardando', color: 'bg-gray-100 text-gray-800 bg-gray-700 text-gray-300 border border-gray-200 border-gray-600' },
  'Enviado': { label: 'Enviado', color: 'bg-green-50 text-green-700 bg-green-900/40 text-green-300 border border-green-200 border-green-800' },
  'Cancelado': { label: 'Cancelado', color: 'bg-gray-100 text-gray-800 bg-gray-700 text-gray-300 border border-gray-200 border-gray-600' },
};

export default function OrdersPage() {
  const locale = useLocale();
  const { user } = useClientAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  const { data: orders = [], isLoading } = useSellerOrders({
    limit: 10,
    offset: (currentPage - 1) * 10,
    status: selectedStatus || undefined,
  });

  const mockOrders = [
    {
      id: '#ORD-3254',
      customer: 'Fernanda Oliveira',
      email: 'fernanda.o@email.com',
      date: 'Hoje, 14:30',
      paymentStatus: 'PAID',
      shippingStatus: 'Pronto p/ Envio',
      total: 'R$ 245,90',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_oIIb63SYHjelVgsVIi3HFQmkMWYHRoO52Ry5QsbZ85BY9cgeX7Lt2-bQbe41pm5GDU5LIlEAW_mqQdoxcLqgoPMhZRJXU6FGrvRH7pHiDtIZG1htqkJUCqw5vypT-fh2fujZVwwVUdYmhNQXNl8i0nHx40X9KQioAMXSacV-iSELav1MrGTxC04DLmLLU95fjP6w5Zmk99unBPdUEaj6uRKtsV0YVLJRj8UJi48-CoxXRC41H-bl57zQpfMNQ7v-KcVoDQcPXLE',
    },
    {
      id: '#ORD-3253',
      customer: 'João Silva',
      email: 'joao.silva@email.com',
      date: 'Hoje, 12:15',
      paymentStatus: 'PENDING',
      shippingStatus: 'Aguardando',
      total: 'R$ 89,00',
      avatar: null,
      initials: 'JS',
    },
    {
      id: '#ORD-3252',
      customer: 'Carlos Mendes',
      email: 'carlos.m@email.com',
      date: 'Ontem, 16:45',
      paymentStatus: 'PAID',
      shippingStatus: 'Enviado',
      total: 'R$ 1.250,00',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLR3CaA2p4TVRUuWfqXebajU2_R1qOvMeIn5FP4cU4pHFumZtnE5dLe26rv1oTEbM5tEhxD78rtte2ojvVsTBft8Y3-4qU6y_4JNAIk8-qLzMWYEaO9uG-v_zKFZbVY59MzB3jgFY7t6zVnY-tD26s9Vgc3JQ8_9tpWucnZXy8CCYyH4sOaE_outSWu4SDel6DS0kGLf8ZFParXOOl-hj81z7AV97ePNQQ_nF4PAkUpecvDjbE1j0xbyoUVGB01gegOjZ1fAhp6F4',
    },
    {
      id: '#ORD-3251',
      customer: 'Ana Maria',
      email: 'ana.m@email.com',
      date: 'Ontem, 09:10',
      paymentStatus: 'CANCELLED',
      shippingStatus: 'Cancelado',
      total: 'R$ 45,00',
      avatar: null,
      initials: 'AM',
      cancelled: true,
    },
    {
      id: '#ORD-3250',
      customer: 'Roberto Dias',
      email: 'beto.dias@email.com',
      date: '10 Out, 18:20',
      paymentStatus: 'PAID',
      shippingStatus: 'Pronto p/ Envio',
      total: 'R$ 310,50',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-GcECw1tWSagt0_ppCsmspa5tZE4O8eX5-JyL2T1tSwM4VzbXwEx9uSJ3c2Au-78qRbmIXfCkIWQQNDd1jWB1VIH9g5XcRNaMxQOWxHpDmJwm1QOtgXwqOXOamm5TK9Iy68VrlFQbCGWfpvnlILacvs6pjgnQa9P-KwaBWPFR31nrJdgW4Xmo-BPPEDF03G0AnX7T_Ln1s0aMpp3MSSOcGvvAn4O6umyDDGKe0DfXUDyTAmIEdnQjE_tOHt-L5bf0dxWXRdGxD9o',
    },
  ];

  return (
    <div className="flex h-screen bg-background-subtle bg-background-dark overflow-hidden">
      <BottomNav />

      <main className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="px-6 py-4 border-b border-gray-200 border-gray-700 bg-white bg-surface-dark sticky top-0 z-10">
          <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 text-sm">
              <a href={`/${locale}/seller/dashboard`} className="text-gray-500 text-gray-400 hover:text-primary transition-colors">Home</a>
              <span className="text-gray-500 text-gray-600">/</span>
              <span className="text-foreground text-white font-medium">Pedidos</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground text-white">Gestão de Pedidos</h1>
                <p className="text-gray-500 text-gray-400 mt-1">Gerencie, processe e envie seus pedidos com eficiência.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white bg-surface-dark border border-gray-300 border-gray-700 rounded-lg text-sm font-medium text-foreground text-white hover:bg-gray-50 hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                  Exportar CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Novo Pedido
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total de Pedidos', value: '1,254', icon: 'shopping_bag', trend: '+12%', trendText: 'vs. mês anterior', color: 'text-primary bg-primary/10' },
              { label: 'Pendentes', value: '24', icon: 'schedule', trend: '', trendText: 'Requerem atenção imediata', color: 'text-yellow-600 bg-yellow-100 bg-yellow-900/30 text-yellow-400' },
              { label: 'Prontos p/ Envio', value: '18', icon: 'local_shipping', trend: '', trendText: 'Gerar etiquetas em lote', color: 'text-primary-light bg-primary/10 bg-primary/20', isCTA: true },
              { label: 'Receita (Hoje)', value: 'R$ 4.350,00', icon: 'payments', trend: '+5.4%', trendText: 'vs. ontem', color: 'text-green-600 bg-green-100 bg-green-900/30 text-green-400' },
            ].map((card) => (
              <div key={card.label} className="bg-white bg-surface-dark rounded-xl p-5 border border-gray-200 border-gray-700 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-500 text-gray-400 text-sm font-medium">{card.label}</p>
                  <span className={`material-symbols-outlined ${card.color} p-1.5 rounded-lg text-[20px]`}>{card.icon}</span>
                </div>
                <p className="text-2xl font-bold text-foreground text-white">{card.value}</p>
                <div className="flex items-center gap-1 mt-1 text-sm">
                  {card.trend && <span className="text-green-600 text-green-400 font-medium flex items-center"><span className="material-symbols-outlined text-[16px]">trending_up</span>{card.trend}</span>}
                  <span className={card.isCTA ? 'text-primary-light text-primary-light font-medium hover:underline cursor-pointer' : 'text-gray-500 text-gray-500'}>{card.trendText}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Table */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-white bg-surface-dark p-4 rounded-xl border border-gray-200 border-gray-700 shadow-sm">
            <div className="relative w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border-none bg-gray-100 bg-background-dark text-white rounded-lg text-sm placeholder-gray-500 focus:ring-2 focus:ring-primary/50"
                placeholder="Buscar por ID, cliente ou e-mail..."
                type="text"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative group">
                <button 
                  className="flex items-center gap-2 px-3 py-2.5 bg-gray-100 bg-background-dark rounded-lg text-sm text-foreground text-white font-medium hover:bg-gray-200 hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedStatus(selectedStatus ? '' : 'PENDING')}
                >
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  Status: {selectedStatus || 'Todos'}
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-2.5 bg-gray-100 bg-background-dark rounded-lg text-sm text-foreground text-white font-medium hover:bg-gray-200 hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                Últimos 30 dias
              </button>
              <div className="hidden sm:flex bg-gray-100 bg-background-dark rounded-lg p-1 ml-auto lg:ml-0">
                <button className="p-1.5 rounded bg-white bg-surface-dark shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[20px]">view_list</span>
                </button>
                <button className="p-1.5 rounded text-gray-500 hover:text-gray-700 text-gray-400 hover:text-white">
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white bg-surface-dark border border-gray-200 border-gray-700 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 bg-gray-800 text-gray-500 text-gray-400 border-b border-gray-200 border-gray-700">
                  <tr>
                    <th className="p-4 w-4">
                      <input type="checkbox" className="w-4 h-4 text-primary" />
                    </th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">ID Pedido</th>
                    <th className="px-4 py-3 font-semibold">Cliente</th>
                    <th className="px-4 py-3 font-semibold">Data</th>
                    <th className="px-4 py-3 font-semibold">Status Pagamento</th>
                    <th className="px-4 py-3 font-semibold">Status Envio</th>
                    <th className="px-4 py-3 font-semibold text-right">Total</th>
                    <th className="px-4 py-3 font-semibold text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 divide-gray-700">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className={`bg-white bg-surface-dark hover:bg-gray-50 hover:bg-white/5 transition-colors group ${order.cancelled ? 'opacity-75' : ''}`}>
                      <td className="p-4 w-4">
                        <input type="checkbox" className="w-4 h-4 text-primary" />
                      </td>
                      <td className={`px-4 py-3 font-medium cursor-pointer hover:underline ${order.cancelled ? 'text-gray-500 line-through' : 'text-primary'}`}>{order.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {order.avatar ? (
                            <img src={order.avatar} alt={order.customer} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${{
                              'JS': 'bg-purple-100 bg-purple-900/40 text-purple-600 text-purple-300',
                              'AM': 'bg-pink-100 bg-pink-900/40 text-pink-600 text-pink-300',
                            }[order.initials!] || 'bg-gray-200'}`}>
                              {order.initials}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-foreground text-gray-200 font-medium">{order.customer}</span>
                            <span className="text-xs text-gray-500">{order.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-gray-400 whitespace-nowrap">{order.date}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${statusConfig[order.paymentStatus as keyof typeof statusConfig]?.color || ''}`}>
                          {statusConfig[order.paymentStatus as keyof typeof statusConfig]?.label || order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${shippingStatusConfig[order.shippingStatus as keyof typeof shippingStatusConfig]?.color || ''}`}>
                          {order.shippingStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-foreground text-white">{order.total}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 hover:bg-gray-700 text-gray-500 text-gray-400 transition-colors" title="Visualizar Detalhes">
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </button>
                          {order.shippingStatus === 'Pronto p/ Envio' ? (
                            <button className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors" title="Imprimir Etiqueta">
                              <span className="material-symbols-outlined text-[20px]">print</span>
                            </button>
                          ) : (
                            <button disabled className="p-1.5 rounded-lg hover:bg-gray-100 hover:bg-gray-700 text-gray-400 cursor-not-allowed transition-colors" title="Atualizar Status">
                              <span className="material-symbols-outlined text-[20px]">edit_note</span>
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 hover:bg-gray-700 text-gray-500 text-gray-400 transition-colors">
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
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200 border-gray-700 bg-white bg-surface-dark gap-4">
              <span className="text-sm text-gray-500 text-gray-400 text-center sm:text-left">
                Mostrando <span className="font-semibold text-foreground text-white">1-10</span> de <span className="font-semibold text-foreground text-white">1,254</span> pedidos
              </span>
              <div className="inline-flex gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-white bg-surface-dark border border-gray-300 border-gray-700 rounded-lg hover:bg-gray-100 hover:bg-gray-800 text-gray-400 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px] mr-2">arrow_back</span>
                  Anterior
                </button>
                <button 
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-white bg-surface-dark border border-gray-300 border-gray-700 rounded-lg hover:bg-gray-100 hover:bg-gray-800 text-white"
                >
                  Próxima
                  <span className="material-symbols-outlined text-[16px] ml-2">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-sm text-gray-500 text-gray-400 border-t border-gray-200 border-gray-700">
          © 2025 LupaShop. Todos os direitos reservados.
        </footer>
      </main>
    </div>
  );
}
