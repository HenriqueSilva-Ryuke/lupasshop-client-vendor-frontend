'use client';

import { useQuery } from '@apollo/client';
import { SalesLineChart } from '@/components/SalesLineChart'; // Placeholder for chart component
import { GET_STORE_BALANCE } from '@/graphql/queries';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';

export default function SellerDashboardPage() {
  // Mock store ID - in real app would come from context
  const storeId = "store-1";
  const { data, loading } = useQuery(GET_STORE_BALANCE, {
    variables: { storeId },
    // Skip for now as backend mock might fail without seeding
    skip: true
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value="R$ 124.500,00"
          trend="+12.5%"
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Pedidos"
          value="1,245"
          trend="+5.2%"
          icon={ShoppingBag}
          color="bg-blue-500"
        />
        <StatCard
          title="Produtos Ativos"
          value="48"
          trend="0%"
          icon={Package}
          color="bg-purple-500"
        />
        <StatCard
          title="Ticket Médio"
          value="R$ 100,00"
          trend="+2.1%"
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Vendas nos últimos 30 dias</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Pedidos Recentes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium">Pedido #123{i}</p>
                  <p className="text-xs text-gray-500">Hoje, 14:30</p>
                </div>
                <span className="text-green-600 font-bold">+ R$ 150,00</span>
              </div>
            ))}
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
          {trend} vs mês anterior
        </span>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );
}
