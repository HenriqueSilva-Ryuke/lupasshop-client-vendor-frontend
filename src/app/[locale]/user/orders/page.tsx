'use client';

import { useQuery } from '@tanstack/react-query';
import { LIST_ORDERS } from '@/graphql/queries';
import { getApiClient } from '@lupa/api-client';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Package, ChevronRight, Calendar, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SkeletonOrderItem } from '@/components/ui/SkeletonLoaders';
import { EmptyOrders } from '@/components/ui/EmptyStates';
import { Card, CardContent } from '@/components/ui/Card';

export default function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = useLocale();
  
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['LIST_ORDERS'],
    queryFn: async () => {
      const client = getApiClient();
      const res = await client.query<{ listOrders: { orders: any[] } }>({
        query: LIST_ORDERS,
        variables: { limit: 10, offset: 0 },
      });
      return res.data;
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <SkeletonOrderItem key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-destructive">Erro ao carregar pedidos: {(error as Error).message}</div>;

  const orders = data?.listOrders?.orders || [];

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meus Pedidos</h1>
      
      <div className="flex flex-col gap-4">
        {orders.map((order: any) => (
          <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/${locale}/user/orders/${order.id}`}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row border-b last:border-0">
                  {/* Status and basic info */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center border-b sm:border-b-0 sm:border-r bg-muted/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-lg">Pedido #{order.id.substring(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString(locale)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      Status: <span className="font-medium text-foreground">{order.status}</span>
                    </div>
                  </div>
                  
                  {/* Total and Action */}
                  <div className="p-4 sm:p-6 w-full sm:w-48 flex sm:flex-col items-center justify-between sm:justify-center gap-4 bg-muted/5">
                    <div className="text-left sm:text-center">
                      <div className="text-sm text-muted-foreground mb-1">Total</div>
                      <div className="font-bold text-xl">
                        {new Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(order.totalAmount)}
                      </div>
                    </div>
                    <div className="flex items-center text-primary font-medium text-sm group">
                      Ver detalhes
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
