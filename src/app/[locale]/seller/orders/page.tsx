'use client';

import { useQuery } from '@apollo/client/react';
import { LIST_ORDERS } from '@/graphql/queries';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-primary100 text-blue-800",
    SHIPPED: "bg-primary100 text-primary800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800"
  };

  // @ts-ignore
  const style = styles[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", style)}>
      {status}
    </span>
  );
}

import { use } from 'react';

export default function SellerOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  // Fetch orders. The backend resolver automatically filters by the seller's store if storeId is omitted
  const { data, loading, error } = useQuery(LIST_ORDERS, {
    variables: { limit: 20, offset: 0 },
    fetchPolicy: 'network-only' // Ensure fresh data
  }) as any;

  if (loading) return <div>Carregando pedidos...</div>;
  if (error) return <div className="text-red-500">Erro ao carregar pedidos: {error.message}</div>;

  const orders = data?.listOrders?.orders || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-500">Gerencie e envie seus pedidos</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase">
                <th className="px-6 py-4 font-semibold">Pedido ID</th>
                <th className="px-6 py-4 font-semibold">Data</th>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nenhum pedido recebido ainda.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="border-b hover:bg-accent50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm">#{order.id.slice(0, 8)}...</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(parseInt(order.createdAt)).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {/* Needs user expansion in query for name, fallback for MVP */}
                      {order.userId ? "Cliente Registrado" : "Convidado"}
                    </td>
                    <td className="px-6 py-4 font-medium">R$ {order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/${locale}/seller/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="bg-white hover:bg-accent50">
                          Detalhes
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
