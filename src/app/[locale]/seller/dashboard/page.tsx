'use client';

import { useQuery } from '@apollo/client/react';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { GET_SELLER_DASHBOARD } from '@/graphql/queries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Visão Geral</h1>
        <p className="text-muted-foreground">Bem-vindo de volta! Aqui está o resumo da sua loja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Total"
          value={`AOA ${stats?.totalSales?.toLocaleString() || 0}`}
          trend={`${stats?.totalOrders || 0} pedidos`}
          icon={DollarSign}
        />
        <StatCard
          title="Pedidos"
          value={`${stats?.totalOrders || 0}`}
          trend={`${stats?.activeProducts || 0} ativos`}
          icon={ShoppingBag}
        />
        <StatCard
          title="Produtos Ativos"
          value={`${stats?.activeProducts || 0}`}
          trend={`${stats?.totalProducts || 0} no total`}
          icon={Package}
        />
        <StatCard
          title="Avaliação Média"
          value={`${stats?.averageRating?.toFixed(1) || '0.0'}`}
          trend="baseado em avaliações"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas nos últimos 30 dias</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Carregando...
              </div>
            ) : salesByDay.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Sem dados no período
              </div>
            ) : (
              <div className="space-y-3">
                {salesByDay.slice(-7).map((day: any) => (
                  <div key={day.date} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{new Date(day.date).toLocaleDateString()}</span>
                    <span className="font-semibold text-foreground">AOA {day.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <div className="text-muted-foreground text-center py-8">Nenhum pedido encontrado</div>
              ) : (
                recentOrders.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">Pedido #{order.id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="text-primary font-bold">AOA {order.totalAmount.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-black text-foreground">{value}</h3>
          <span className="text-xs font-semibold text-primary/80 flex items-center gap-1 mt-1">
            {trend}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
      </div>
    </div>
  );
}
