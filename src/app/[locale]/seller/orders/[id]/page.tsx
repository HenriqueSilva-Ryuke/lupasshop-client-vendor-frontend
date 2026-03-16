'use client';

import React, { use } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ORDER } from '@/graphql/queries';
import { UPDATE_ORDER_STATUS } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, Package, Check, MapPin, User, Printer } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SellerOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = use(params);
 const router = useRouter();
 const { data, loading, error, refetch } = useQuery<any>(GET_ORDER, {
 variables: { id }
 }) as any;

 const [updateStatus, { loading: updating }] = useMutation<any>(UPDATE_ORDER_STATUS);

 const handleStatusChange = async (newStatus: string) => {
 try {
 await updateStatus({
 variables: {
 id,
 input: { status: newStatus }
 }
 });
 toast.success(`Status atualizado para ${newStatus}`);
 refetch();
 } catch (err) {
 toast.error('Erro ao atualizar status');
 }
 };

 if (loading) return <div>Carregando pedido...</div>;
 if (error) return <div className="text-destructive">Erro: {error.message}</div>;

 const order = data?.getOrder;
 const shippingAddress = order?.shippingAddress || {};

 if (!order) return <div>Pedido não encontrado</div>;

 const steps = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'];
 const currentStepIndex = steps.indexOf(order.status);

 return (
 <div className="max-w-4xl mx-auto space-y-6">
 <div className="flex items-center gap-4 mb-4">
 <Button variant="outline" onClick={() => router.back()} className="p-2">
 <ArrowLeft className="w-5 h-5" />
 </Button>
 <div>
 <h1 className="text-2xl font-bold flex items-center gap-2">
 Pedido #{order.id.slice(0, 8)}
 <span className={cn(
 "text-sm px-2 py-1 rounded-full border",
 order.status === 'PAID' ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted text-muted-foreground"
 )}>
 {order.status}
 </span>
 </h1>
 <p className="text-muted-foreground text-sm">{new Date(order.createdAt).toLocaleString()}</p>
 </div>
 <div className="ml-auto flex gap-2">
 <Button variant="outline" className="gap-2">
 <Printer className="w-4 h-4" />
 Imprimir Pedido
 </Button>
 {order.status === 'PAID' && (
 <Button
 className="gap-2 bg-primary600 hover:bg-primary700 px-4 h-10"
 onClick={() => handleStatusChange('SHIPPED')}
 disabled={updating}
 >
 <Truck className="w-4 h-4" />
 Marcar como Enviado
 </Button>
 )}
 {order.status === 'SHIPPED' && (
 <Button
 className="gap-2 bg-green-600 hover:bg-green-700 px-4 h-10"
 onClick={() => handleStatusChange('DELIVERED')}
 disabled={updating}
 >
 <Check className="w-4 h-4" />
 Confirmar Entrega
 </Button>
 )}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-2 space-y-6">
 {/* Items */}
 <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden">
 <div className="px-6 py-4 border-b font-semibold bg-muted/50">Itens do Pedido</div>
 <div className="divide-y divide-border">
 {order.orderItems.map((item: any) => (
 <div key={item.id} className="p-6 flex gap-4">
 <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden border border-border">
 {item.product.images?.[0] && <img src={item.product.images[0]} className="w-full h-full object-cover" />}
 </div>
 <div className="flex-1">
 <h3 className="font-semibold text-foreground">{item.product.name}</h3>
 <p className="text-sm text-muted-foreground">SKU: {item.product.id.slice(0, 6)}</p>
 </div>
 <div className="text-right">
 <p className="font-medium">AOA {item.priceAtPurchase.toFixed(2)}</p>
 <p className="text-sm text-muted-foreground">x {item.quantity}</p>
 <p className="font-bold mt-1">AOA {(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
 </div>
 </div>
 ))}
 </div>
 <div className="bg-muted/50 px-6 py-4 border-t flex justify-between items-center">
 <span className="font-semibold text-muted-foreground">Total do Pedido</span>
 <span className="text-xl font-bold text-foreground">AOA {order.totalAmount.toFixed(2)}</span>
 </div>
 </div>

 <div className="rounded-xl bg-card shadow-sm border border-border p-6">
 <h3 className="font-semibold mb-6">Histórico do Pedido</h3>
 <div className="relative border-l-2 ml-3 space-y-8 pl-8 pb-2">
 {steps.map((step, index) => {
 const isCompleted = index <= currentStepIndex;
 const isCurrent = index === currentStepIndex;

 return (
 <div key={step} className="relative">
 <div className={cn(
 "absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-card",
 isCompleted ? "border-primary bg-primary text-white" : "border-border"
 )}>
 {isCompleted && <Check className="w-3 h-3" />}
 </div>
 <h4 className={cn("font-medium text-sm", isCompleted ? "text-foreground" : "text-muted-foreground")}>
 {step === 'PENDING' && 'Pedido Realizado'}
 {step === 'PAID' && 'Pagamento Confirmado'}
 {step === 'SHIPPED' && 'Enviado para Transportadora'}
 {step === 'DELIVERED' && 'Entrega Realizada'}
 </h4>
 {isCurrent && <p className="text-xs text-primary mt-1 font-medium">Status Atual</p>}
 </div>
 );
 })}
 </div>
 </div>
 </div>

 <div className="space-y-6">
 <div className="rounded-xl bg-card shadow-sm border border-border p-6">
 <h3 className="font-semibold mb-4 flex items-center gap-2">
 <User className="w-4 h-4 text-muted-foreground" />
 Cliente
 </h3>
 <p className="font-medium">{order.user?.fullName || '—'}</p>
 <p className="text-sm text-muted-foreground">{order.user?.email || '—'}</p>
 {shippingAddress.phone && (
 <p className="text-sm text-muted-foreground">{shippingAddress.phone}</p>
 )}
 </div>

 <div className="rounded-xl bg-card shadow-sm border border-border p-6">
 <h3 className="font-semibold mb-4 flex items-center gap-2">
 <MapPin className="w-4 h-4 text-muted-foreground" />
 Endereço de Entrega
 </h3>
 <p className="text-sm text-muted-foreground">
 {(shippingAddress.street || '—')}{shippingAddress.number ? `, ${shippingAddress.number}` : ''}<br />
 {(shippingAddress.neighborhood ? `${shippingAddress.neighborhood} - ` : '') + (shippingAddress.city || '')}{shippingAddress.state ? `, ${shippingAddress.state}` : ''}<br />
 {shippingAddress.zipCode ? `CEP: ${shippingAddress.zipCode}` : ''}
 </p>
 <div className="mt-4 pt-4 border-t border-border">
 <h4 className="text-xs font-bold uppercase mb-2">Método de Envio</h4>
 <p className="text-sm font-medium">{order.shipment?.carrier?.name || '—'}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
