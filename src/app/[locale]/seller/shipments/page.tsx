'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Truck,
  Package,
  Printer,
  Tag,
  Loader2,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSellerOrders } from '@lupa/api-client/hooks';
import { useShippingLabelByShipment, useGenerateShippingLabel, usePrintShippingLabel } from '@lupa/api-client/hooks';

const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  PROCESSING: 'Em Processamento',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
};

function ShipmentRow({ order }: { order: any }) {
  const locale = useLocale();
  const shipment = order.shipment;
  const { data: label, isLoading: labelLoading } = useShippingLabelByShipment(shipment?.id);
  const generateLabel = useGenerateShippingLabel();
  const printLabel = usePrintShippingLabel();

  const statusLabel = ORDER_STATUS_LABELS[order.status] ?? order.status;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Pedido</p>
            <Link
              href={`/${locale}/seller/orders/${order.id}`}
              className="font-semibold text-primary hover:underline"
            >
              #{order.id.slice(-8).toUpperCase()}
            </Link>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Data</p>
            <p className="font-medium">
              {new Date(parseInt(order.createdAt)).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Total</p>
            <p className="font-medium">AOA {Number(order.totalAmount).toFixed(2)}</p>
          </div>
        </div>
        <span className={cn(
          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
          order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
          order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-700' :
          order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
          'bg-gray-100 text-gray-700',
        )}>
          {statusLabel}
        </span>
      </div>

      <div className="px-6 py-5 space-y-4">
        {/* Shipment info */}
        {shipment ? (
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Transportadora</p>
              <p className="font-medium">{shipment.carrier?.name ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Rastreio</p>
              <p className="font-mono font-bold text-primary">{shipment.trackingNumber ?? '—'}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Custo Frete</p>
              <p className="font-medium">AOA {Number(shipment.shippingCost ?? 0).toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Nenhuma informação de envio registrada para este pedido.</p>
        )}

        {/* Label actions */}
        {shipment && (
          <div className="flex flex-wrap gap-3 pt-1">
            {labelLoading ? (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Verificando etiqueta...
              </span>
            ) : label ? (
              <>
                <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Etiqueta gerada
                  {label.printedAt && ` • Impressa em ${new Date(label.printedAt).toLocaleDateString('pt-BR')}`}
                </div>
                {label.labelUrl && (
                  <a
                    href={label.labelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Ver Etiqueta
                  </a>
                )}
                {!label.printedAt && (
                  <button
                    onClick={() => printLabel.mutate(label.id)}
                    disabled={printLabel.isPending}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-semibold hover:bg-primary/20 disabled:opacity-50 transition-colors"
                  >
                    {printLabel.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Printer className="w-3.5 h-3.5" />
                    )}
                    Marcar como Impresso
                  </button>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Etiqueta não gerada
                </span>
                <button
                  onClick={() => generateLabel.mutate({ shipmentId: shipment.id })}
                  disabled={generateLabel.isPending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {generateLabel.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Tag className="w-3.5 h-3.5" />
                  )}
                  Gerar Etiqueta
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SellerShipmentsPage() {
  const { data, isLoading } = useSellerOrders({ limit: 50 });
  const orders = data?.orders ?? [];

  // Only show orders that have a shipment or are eligible for shipping (PAID/PROCESSING)
  const relevantOrders = orders.filter(
    (o: any) => o.shipment || ['PAID', 'PROCESSING', 'SHIPPED'].includes(o.status),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="w-6 h-6 text-primary" />
          Envios e Etiquetas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gerencie os envios dos pedidos e imprima etiquetas de frete.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-6 animate-pulse">
              <div className="h-4 w-48 bg-gray-200 rounded mb-3" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : relevantOrders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">Nenhum pedido com envio disponível.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {relevantOrders.map((order: any) => (
            <ShipmentRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
