'use client';

import { useQuery } from '@apollo/client/react';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { GET_SELLER_DASHBOARD } from '@/graphql/queries';

export default function SellerDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { data, loading } = useQuery(GET_SELLER_DASHBOARD, {
    variables: { days: 30, recentLimit: 5, topLimit: 5 },
    fetchPolicy: 'cache-and-network',
  });

  const stats = data?.getSellerDashboard?.stats;
  const recentOrders = data?.getSellerDashboard?.recentOrders || [];
  const salesByDay = data?.getSellerDashboard?.salesByDay || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value={`AOA ${stats?.totalSales?.toLocaleString() || 0}`}
          trend={`${stats?.totalOrders || 0} pedidos`}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Pedidos"
          value={`${stats?.totalOrders || 0}`}
          trend={`${stats?.activeProducts || 0} ativos`}
          icon={ShoppingBag}
          color="bg-blue-500"
        />
        <StatCard
          title="Produtos Ativos"
          value={`${stats?.activeProducts || 0}`}
          trend={`${stats?.totalProducts || 0} no total`}
          icon={Package}
          color="bg-purple-500"
        />
        <StatCard
          title="Avaliação Média"
          value={`${stats?.averageRating?.toFixed(1) || '0.0'}`}
          trend="baseado em avaliações"
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Vendas nos últimos 30 dias</h3>
          {loading ? (
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              Carregando...
            </div>
          ) : salesByDay.length === 0 ? (
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              Sem dados no período
            </div>
          ) : (
            <div className="space-y-3">
              {salesByDay.slice(-7).map((day: any) => (
                <div key={day.date} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{new Date(day.date).toLocaleDateString()}</span>
                  <span className="font-semibold">AOA {day.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Pedidos Recentes</h3>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-gray-500">Nenhum pedido encontrado</div>
            ) : (
              recentOrders.map((order: any) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="text-green-600 font-bold">AOA {order.totalAmount.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-black text-gray-900">{value}</h3>
        <span className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
          {trend}
        </span>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
}
