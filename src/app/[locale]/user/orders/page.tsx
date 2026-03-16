'use client';

import { useQuery } from '@apollo/client/react';
import { LIST_ORDERS } from '@/graphql/queries';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Package, ChevronRight, Calendar, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SkeletonOrderItem } from '@/components/ui/SkeletonLoaders';
import { EmptyOrders } from '@/components/ui/EmptyStates';
import { Card, CardContent } from '@/components/ui/Card';
import { use } from 'react';

export default function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = use(params);
 // We assume the user ID is extracted from the token context in the backend resolver
 const { data, loading, error } = useQuery<any>(LIST_ORDERS, {
 variables: { limit: 10, offset: 0 },
 }) as any;

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
 
 if (error) return <div className="p-8 text-center text-destructive">Erro ao carregar pedidos: {error.message}</div>;

 const orders = data?.listOrders?.orders || [];

 if (orders.length === 0) {
 return <EmptyOrders />;
 }

 return (
 <div className="space-y-6">
 <h1 className="text-2xl font-bold">Meus Pedidos</h1>

 <div className="flex flex-col gap-4">
 {orders.map((order: any) => (
 <Card key={order.id} className="overflow-hidden">
 <div className="bg-muted/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-border">
 <div className="flex items-center gap-4 text-sm">
 <div>
 <p className="text-muted-foreground mb-1">Data do Pedido</p>
 <p className="font-semibold flex items-center gap-1">
 <Calendar className="w-3 h-3 text-muted-foreground" />
 {new Date(parseInt(order.createdAt)).toLocaleDateString()}
 </p>
 </div>
 <div className="h-8 w-px bg-border" />
 <div>
 <p className="text-muted-foreground mb-1">Total</p>
 <p className="font-semibold">AOA {order.totalAmount.toFixed(2)}</p>
 </div>
 <div className="h-8 w-px bg-border" />
 <div>
 <p className="text-muted-foreground mb-1">Status</p>
 <span className={cn(
 "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
 order.status === 'PAID' ? "bg-primary/15 text-primary" :
 order.status === 'PENDING' ? "bg-accent text-accent-foreground" :
 "bg-muted text-muted-foreground"
 )}>
 {order.status}
 </span>
 </div>
 </div>

 <Link
 href={`/${locale}/user/orders/${order.id}`}
 className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
 >
 Ver Detalhes
 <ChevronRight className="w-4 h-4" />
 </Link>
 </div>

 <CardContent className="p-6">
 <div className="flex flex-col gap-4">
 {order.orderItems.map((item: any) => (
 <div key={item.id} className="flex gap-4 items-center">
 <div className="w-16 h-16 rounded-md shrink-0 overflow-hidden">
 {/* Placeholder image logic if needed */}
 {item.product?.images?.[0] && (
 <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
 )}
 </div>
 <div className="flex-1">
 <p className="font-medium text-sm text-foreground">{item.product?.name || 'Produto indisponível'}</p>
 <p className="text-muted-foreground text-xs">Qtd: {item.quantity}</p>
 </div>
 <span className="font-semibold text-sm">AOA {item.priceAtPurchase.toFixed(2)}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 );
}
