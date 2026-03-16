'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthProtection } from '@/hooks/useAuthProtection';
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
PENDING: "bg-accent text-accent-foreground",
  PAID: "bg-primary/10 text-primary",
  SHIPPED: "bg-primary/15 text-primary",
  DELIVERED: "bg-primary/10 text-primary",
  CANCELLED: "bg-destructive/10 text-destructive"
  };

  // @ts-ignore
  const style = styles[status] || "bg-muted text-muted-foreground";

 return (
 <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", style)}>
 {status}
 </span>
 );
}

import { use } from 'react';

export default function SellerOrdersPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = use(params);
 const router = useRouter();
 const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection(['SELLER', 'ADMIN']);
 // Fetch orders. The backend resolver automatically filters by the seller's store if storeId is omitted
 const { data, loading, error } = useQuery<any>(LIST_ORDERS, {
 variables: { limit: 20, offset: 0 },
 fetchPolicy: 'network-only',// Ensure fresh data
 skip: !isAuthorized
 }) as any;

 // Redirect to login if not authorized
 useEffect(() => {
 if (!isAuthLoading && !isAuthorized) {
 router.replace(`/${locale}/auth/login`);
 }
 }, [isAuthLoading, isAuthorized, router, locale]);

if (loading) return <div className="text-muted-foreground">Carregando pedidos...</div>;
  if (error) return <div className="text-destructive">Erro ao carregar pedidos: {error.message}</div>;

 const orders = data?.listOrders?.orders || [];

 return (
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <div>
 <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
 <p className="text-muted-foreground">Gerencie e envie seus pedidos</p>
 </div>
 </div>

 <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-muted/50 border-b text-xs uppercase">
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
 <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
 Nenhum pedido recebido ainda.
 </td>
 </tr>
 ) : (
 orders.map((order: any) => (
 <tr key={order.id} className="border-b hover:bg-accent50/50 transition-colors">
 <td className="px-6 py-4 font-mono text-sm">#{order.id.slice(0, 8)}...</td>
 <td className="px-6 py-4 text-sm text-muted-foreground">
 {new Date(parseInt(order.createdAt)).toLocaleDateString()}
 </td>
 <td className="px-6 py-4 text-sm">
 {/* Needs user expansion in query for name, fallback for MVP */}
 {order.userId ? "Cliente Registrado" : "Convidado"}
 </td>
 <td className="px-6 py-4 font-medium">AOA {order.totalAmount.toFixed(2)}</td>
 <td className="px-6 py-4">
 <StatusBadge status={order.status} />
 </td>
 <td className="px-6 py-4 text-right">
 <Link href={`/${locale}/seller/orders/${order.id}`}>
 <Button variant="outline" size="sm" className="bg-card hover:bg-muted/50">
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
