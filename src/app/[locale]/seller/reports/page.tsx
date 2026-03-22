'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { BarChart2, PieChart, TrendingUp, TrendingDown, Calendar, Download, FileDown, ShoppingBag, AlertCircle } from 'lucide-react';
import { GET_SELLER_DASHBOARD } from '@/graphql/queries';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';

const DATE_OPTIONS = [
  { value: '7', label: 'Últimos 7 dias' },
  { value: '14', label: 'Últimos 14 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 3 meses' },
  { value: '180', label: 'Últimos 6 meses' },
  { value: '365', label: 'Este Ano' },
];

function formatAOA(value: number) {
  return `AOA ${value.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? '+' : ''}{value.toFixed(1)}%
    </span>
  );
}

export default function ReportsPage() {
  const { user } = useAuth();
  const { data: store } = useSellerStore(user?.id);
  const [days, setDays] = useState('30');

  const { data, loading, error } = useQuery<any>(GET_SELLER_DASHBOARD, {
    variables: { days: parseInt(days), recentLimit: 10, topLimit: 5 },
    skip: !store?.id,
    fetchPolicy: 'cache-and-network',
  });

  const stats = data?.getSellerDashboard?.stats;
  const recentOrders = data?.getSellerDashboard?.recentOrders ?? [];
  const topProducts = data?.getSellerDashboard?.topProducts ?? [];
  const salesByDay = data?.getSellerDashboard?.salesByDay ?? [];

  const totalRevenue: number = stats?.totalSales ?? 0;
  const totalOrders: number = stats?.totalOrders ?? 0;
  const avgTicket: number = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activeProducts: number = stats?.activeProducts ?? 0;

  // Generate CSV client-side from available data
  const handleDownloadCSV = () => {
    const rows = [
      ['Data', 'Receita (AOA)', 'Nº Pedidos'],
      ...salesByDay.map((d: any) => [d.date, d.revenue.toFixed(2), d.orders ?? '']),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vendas_${days}dias.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadProductsCSV = () => {
    const rows = [
      ['Produto', 'Avaliação', 'Total de Avaliações'],
      ...topProducts.map((p: any) => [p.name, p.rating, p.reviewCount]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `produtos_top_${days}dias.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadOrdersCSV = () => {
    const rows = [
      ['Pedido', 'Data', 'Valor (AOA)', 'Estado'],
      ...recentOrders.map((o: any) => [
        o.id.slice(0, 8),
        new Date(o.createdAt).toLocaleDateString('pt-AO'),
        o.totalAmount,
        o.status,
      ]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos_${days}dias.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-background-light min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Relatórios</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Analise o desempenho da sua loja</p>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={days}
              onChange={e => setDays(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {DATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8">

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error.message}
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Receita Total',
              value: loading ? '—' : formatAOA(totalRevenue),
              icon: <BarChart2 className="w-4 h-4" />,
              iconBg: 'bg-green-50 text-green-600',
            },
            {
              label: 'Pedidos',
              value: loading ? '—' : totalOrders.toLocaleString('pt-AO'),
              icon: <ShoppingBag className="w-4 h-4" />,
              iconBg: 'bg-blue-50 text-blue-600',
            },
            {
              label: 'Ticket Médio',
              value: loading ? '—' : formatAOA(avgTicket),
              icon: <PieChart className="w-4 h-4" />,
              iconBg: 'bg-purple-50 text-purple-600',
            },
            {
              label: 'Produtos Activos',
              value: loading ? '—' : activeProducts.toString(),
              icon: <TrendingUp className="w-4 h-4" />,
              iconBg: 'bg-orange-50 text-orange-600',
            },
          ].map(card => (
            <div key={card.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{card.label}</p>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>{card.icon}</div>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Sales by day bar chart (simple CSS bars) */}
        {salesByDay.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-bold mb-4">Vendas Diárias — últimos {days} dias</h2>
            <div className="flex items-end gap-1 h-32 overflow-x-auto pb-2">
              {salesByDay.map((d: any) => {
                const max = Math.max(...salesByDay.map((x: any) => x.revenue));
                const pct = max > 0 ? (d.revenue / max) * 100 : 0;
                return (
                  <div key={d.date} className="flex flex-col items-center gap-1 flex-1 min-w-[8px] group relative">
                    <div
                      className="w-full bg-primary/80 hover:bg-primary rounded-t transition-all cursor-default"
                      style={{ height: `${Math.max(pct, 2)}%` }}
                    />
                    {/* tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {new Date(d.date).toLocaleDateString('pt-AO', { day: '2-digit', month: '2-digit' })}<br />
                      {formatAOA(d.revenue)}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Passe o cursor sobre as barras para ver o detalhe</p>
          </div>
        )}

        {/* Top products + Recent orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Top products */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-bold mb-4">Produtos com Melhor Avaliação</h2>
            {loading ? (
              <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">A carregar...</div>
            ) : topProducts.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">Sem dados no período</div>
            ) : (
              <div className="space-y-3">
                {topProducts.map((p: any, i: number) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="w-5 text-xs font-bold text-muted-foreground">{i + 1}.</span>
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-8 h-8 rounded-md object-cover border border-border" />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-muted" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.reviewCount} avaliações</p>
                    </div>
                    <span className="text-xs font-bold text-amber-500">★ {p.rating?.toFixed(1) ?? '—'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent orders */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-base font-bold mb-4">Pedidos Recentes</h2>
            {loading ? (
              <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">A carregar...</div>
            ) : recentOrders.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">Sem pedidos no período</div>
            ) : (
              <div className="space-y-2">
                {recentOrders.map((o: any) => (
                  <div key={o.id} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">#{o.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString('pt-AO')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{formatAOA(o.totalAmount)}</p>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        o.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                        o.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                        o.status === 'PAID' ? 'bg-purple-100 text-purple-700' :
                        o.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {o.status === 'DELIVERED' ? 'Entregue' :
                         o.status === 'SHIPPED' ? 'Enviado' :
                         o.status === 'PAID' ? 'Pago' :
                         o.status === 'CANCELLED' ? 'Cancelado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Export centre */}
        <section className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-1">Central de Exportação</h2>
          <p className="text-sm text-muted-foreground mb-6">Exporte os dados do período seleccionado em formato CSV.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: <FileDown className="w-6 h-6" />,
                title: 'Vendas e Faturação',
                desc: 'Receita diária, nº de pedidos e médias do período.',
                onDownload: handleDownloadCSV,
                disabled: salesByDay.length === 0,
              },
              {
                icon: <PieChart className="w-6 h-6" />,
                title: 'Produtos com Melhor Avaliação',
                desc: 'Ranking de produtos por rating e volume de avaliações.',
                onDownload: handleDownloadProductsCSV,
                disabled: topProducts.length === 0,
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: 'Pedidos Recentes',
                desc: 'Histórico de pedidos com data, valor e estado.',
                onDownload: handleDownloadOrdersCSV,
                disabled: recentOrders.length === 0,
              },
            ].map(card => (
              <div key={card.title} className="border border-border rounded-xl p-5 flex flex-col bg-background/50 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">{card.icon}</div>
                <h3 className="font-semibold mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 flex-1">{card.desc}</p>
                <button
                  onClick={card.onDownload}
                  disabled={card.disabled || loading}
                  className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" /> Baixar CSV
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
