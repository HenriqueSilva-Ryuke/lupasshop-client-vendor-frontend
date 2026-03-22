'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import {
  Package,
  ArrowLeft,
  Truck,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOrder } from '@lupa/api-client/hooks';
import { useOrderReturns, useCreateReturn } from '@lupa/api-client/hooks';
import { useShippingLabelByShipment } from '@lupa/api-client/hooks';

const ORDER_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: 'bg-accent text-accent-foreground' },
  PAID: { label: 'Pago', color: 'bg-primary/10 text-primary' },
  PROCESSING: { label: 'Em Processamento', color: 'bg-primary/10 text-primary' },
  SHIPPED: { label: 'Enviado', color: 'bg-primary/10 text-primary' },
  DELIVERED: { label: 'Entregue', color: 'bg-primary/10 text-primary' },
  CANCELLED: { label: 'Cancelado', color: 'bg-destructive/10 text-destructive' },
  REFUNDED: { label: 'Reembolsado', color: 'bg-muted text-muted-foreground' },
};

const RETURN_REASONS = [
  'Produto com defeito',
  'Produto diferente do anunciado',
  'Produto danificado na entrega',
  'Não quero mais',
  'Tamanho errado',
  'Outro',
];

const RETURN_STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  REQUESTED: { label: 'Solicitado', color: 'bg-accent text-accent-foreground', icon: <Clock className="w-3 h-3" /> },
  APPROVED: { label: 'Aprovado', color: 'bg-primary/10 text-primary', icon: <CheckCircle2 className="w-3 h-3" /> },
  REJECTED: { label: 'Rejeitado', color: 'bg-destructive/10 text-destructive', icon: <XCircle className="w-3 h-3" /> },
  COMPLETED: { label: 'Concluído', color: 'bg-primary/10 text-primary', icon: <CheckCircle2 className="w-3 h-3" /> },
};

function TrackingSection({ shipment }: { shipment: any }) {
  const { data: label } = useShippingLabelByShipment(shipment?.id);

  if (!shipment) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Informações de envio ainda não disponíveis.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <p className="text-muted-foreground text-xs mb-1">Transportadora</p>
          <p className="font-medium">{shipment.carrier?.name ?? 'N/A'}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Código de Rastreio</p>
          {shipment.trackingNumber ? (
            <p className="font-mono font-bold text-primary">{shipment.trackingNumber}</p>
          ) : (
            <p className="text-muted-foreground">Não disponível</p>
          )}
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Previsão de Entrega</p>
          <p className="font-medium">
            {shipment.estimatedDelivery
              ? new Date(shipment.estimatedDelivery).toLocaleDateString('pt-BR')
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-1">Status do Envio</p>
          <p className="font-medium">{shipment.status ?? 'N/A'}</p>
        </div>
      </div>
      {/* @ts-ignore */}
      {(label as any)?.trackingUrl && (
        <a
          href={(label as any).trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Rastrear pelo site da transportadora
        </a>
      )}
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = params?.id ?? '';
  const locale = useLocale();

  const { data: order, isLoading: orderLoading } = useOrder(orderId);
  const { data: returns = [], isLoading: returnsLoading } = useOrderReturns(orderId);
  const createReturn = useCreateReturn();

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState(RETURN_REASONS[0]);
  const [returnDescription, setReturnDescription] = useState('');
  const [returnError, setReturnError] = useState('');

  const hasOpenReturn = returns.some(
    (r: any) => r.status === 'REQUESTED' || r.status === 'APPROVED',
  );

  const canRequestReturn =
    order?.status === 'DELIVERED' && !hasOpenReturn;

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnError('');
    createReturn.mutate(
      { orderId, reason: returnReason, description: returnDescription } as any,
      {
        onSuccess: () => {
          setShowReturnModal(false);
          setReturnReason(RETURN_REASONS[0]);
          setReturnDescription('');
        },
        onError: () => setReturnError('Erro ao solicitar devolução. Tente novamente.'),
      },
    );
  };

  if (orderLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-7 w-48 bg-muted rounded" />
        <div className="rounded-xl bg-card shadow-sm border border-border p-6 space-y-4">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-16 bg-muted/50 rounded" />
          <div className="h-16 bg-muted/50 rounded" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground font-medium">Pedido não encontrado.</p>
        <Link href={`/${locale}/user/orders`} className="text-primary text-sm hover:underline mt-2 inline-block">
          Voltar para meus pedidos
        </Link>
      </div>
    );
  }

  const statusInfo = ORDER_STATUS_LABELS[order.status] ?? { label: order.status, color: 'bg-muted text-muted-foreground' };

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link
        href={`/${locale}/user/orders`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Meus Pedidos
      </Link>

      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pedido #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {new Date(parseInt(order.createdAt || '0')).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <span className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold', statusInfo.color)}>
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b">
              <h2 className="font-semibold text-sm">
                Itens do Pedido ({order.orderItems?.length ?? 0})
              </h2>
            </div>
            <div className="divide-y">
              {(order.orderItems ?? []).map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted border">
                    {item.product?.images?.[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product?.name ?? ''}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product?.name ?? 'Produto indisponível'}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">Qtd: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm shrink-0">
                    AOA {Number(item.priceAtPurchase).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-sm">Rastreamento de Entrega</h2>
            </div>
            <div className="px-6 py-5">
              <TrackingSection shipment={order.shipment} />
            </div>
          </div>

          {/* Returns */}
          <div className="rounded-xl bg-card shadow-sm border border-border overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-primary" />
                <h2 className="font-semibold text-sm">Devoluções</h2>
              </div>
              {canRequestReturn && (
                <button
                  onClick={() => setShowReturnModal(true)}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Solicitar Devolução
                </button>
              )}
            </div>
            <div className="px-6 py-5">
              {returnsLoading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Carregando...
                </div>
              ) : returns.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {order.status === 'DELIVERED'
                    ? 'Nenhuma devolução solicitada para este pedido.'
                    : 'Devoluções podem ser solicitadas após a entrega.'}
                </p>
              ) : (
                <div className="space-y-3">
                  {returns.map((ret: any) => {
                    const rs = RETURN_STATUS_LABELS[ret.status] ?? { label: ret.status, color: 'bg-muted text-muted-foreground', icon: null };
                    return (
                      <div key={ret.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{ret.reason}</p>
                          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', rs.color)}>
                            {rs.icon}
                            {rs.label}
                          </span>
                        </div>
                        {ret.description && (
                          <p className="text-xs text-muted-foreground">{ret.description}</p>
                        )}
                        {ret.refundAmount && (
                          <p className="text-xs">
                            Reembolso:{' '}
                            <span className="font-semibold text-green-600">AOA {Number(ret.refundAmount).toFixed(2)}</span>
                          </p>
                        )}
                        {ret.notes && (
                          <p className="text-xs text-muted-foreground italic">Nota: {ret.notes}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl bg-card shadow-sm border border-border p-6 space-y-4">
            <h2 className="font-semibold text-sm">Resumo do Pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>AOA {Number(order.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>{order.shipment ? `AOA ${Number(order.shipment.shippingCost ?? 0).toFixed(2)}` : '-'}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>AOA {Number(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {order.store && (
            <div className="rounded-xl bg-card shadow-sm border border-border p-6 space-y-2">
              <h2 className="font-semibold text-sm">Loja</h2>
              <p className="text-sm font-medium">{order.store.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Return Request Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl bg-card border border-border shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">Solicitar Devolução</h3>
            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Motivo</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {RETURN_REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Descrição (opcional)</label>
                <textarea
                  value={returnDescription}
                  onChange={(e) => setReturnDescription(e.target.value)}
                  rows={3}
                  placeholder="Descreva o problema com mais detalhes..."
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              {returnError && (
                <p className="text-xs text-destructive">{returnError}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowReturnModal(false); setReturnError(''); }}
                  className="flex-1 border border-border rounded-lg py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={createReturn.isPending}
                  className="flex-1 bg-primary text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                >
                  {createReturn.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
