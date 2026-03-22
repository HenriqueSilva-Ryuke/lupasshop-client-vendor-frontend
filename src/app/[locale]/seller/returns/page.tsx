'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReturns, useApproveReturn, useRejectReturn } from '@lupa/api-client/hooks';
import { useSellerStore } from '@lupa/api-client/hooks';

const RETURN_STATUS_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  REQUESTED: { label: 'Solicitado', color: 'bg-accent text-accent-foreground', icon: <Clock className="w-3 h-3" /> },
  APPROVED: { label: 'Aprovado', color: 'bg-primary/10 text-primary', icon: <CheckCircle2 className="w-3 h-3" /> },
  REJECTED: { label: 'Rejeitado', color: 'bg-destructive/10 text-destructive', icon: <XCircle className="w-3 h-3" /> },
  COMPLETED: { label: 'Concluído', color: 'bg-primary/15 text-primary', icon: <CheckCircle2 className="w-3 h-3" /> },
};

export default function SellerReturnsPage() {
  const locale = useLocale();
  const { data: store } = useSellerStore();
  const { data: returns = [], isLoading } = useReturns(store?.id ? { storeId: store.id } : undefined);
  const approveReturn = useApproveReturn();
  const rejectReturn = useRejectReturn();

  const [actionModal, setActionModal] = useState<{
    type: 'approve' | 'reject';
    returnId: string;
  } | null>(null);
  const [notes, setNotes] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [actionError, setActionError] = useState('');

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionModal) return;
    setActionError('');

    if (actionModal.type === 'approve') {
      approveReturn.mutate(
        {
          id: actionModal.returnId,
          notes: notes || undefined,
          // @ts-ignore
          refundAmount: refundAmount ? parseFloat(refundAmount) : undefined,
        },
        {
          onSuccess: () => { setActionModal(null); setNotes(''); setRefundAmount(''); },
          onError: () => setActionError('Erro ao aprovar devolução. Tente novamente.'),
        },
      );
    } else {
      rejectReturn.mutate(
        { id: actionModal.returnId, notes },
        {
          onSuccess: () => { setActionModal(null); setNotes(''); },
          onError: () => setActionError('Erro ao rejeitar devolução. Tente novamente.'),
        },
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-primary" />
          Devoluções
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie as solicitações de devolução dos seus clientes.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
              <div className="h-4 w-48 bg-muted rounded mb-3" />
              <div className="h-3 w-32 bg-muted/50 rounded" />
            </div>
          ))}
        </div>
      ) : returns.length === 0 ? (
        <div className="text-center py-20 rounded-xl border border-border bg-card shadow-sm">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground font-medium">Nenhuma solicitação de devolução.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {returns.map((ret: any) => {
            const rs = RETURN_STATUS_LABELS[ret.status] ?? {
              label: ret.status,
              color: 'bg-muted text-muted-foreground',
              icon: null,
            };
            return (
              <div key={ret.id} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="bg-muted/40 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Pedido</p>
                      <Link
                        href={`/${locale}/seller/orders/${ret.orderId}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        #{ret.orderId?.slice(-8).toUpperCase()}
                      </Link>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-0.5">Solicitado em</p>
                      <p className="font-medium">
                        {new Date(parseInt(ret.createdAt)).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    {ret.refundAmount && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Reembolso</p>
                        <p className="font-semibold text-green-600">
                          AOA {Number(ret.refundAmount).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', rs.color)}>
                    {rs.icon}
                    {rs.label}
                  </span>
                </div>

                <div className="px-6 py-5 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Motivo</p>
                    <p className="text-sm font-medium">{ret.reason}</p>
                  </div>
                  {ret.description && (
                    <p className="text-sm text-muted-foreground">{ret.description}</p>
                  )}
                  {ret.notes && (
                    <p className="text-xs text-muted-foreground italic">Nota: {ret.notes}</p>
                  )}

                  {ret.status === 'REQUESTED' && (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => { setActionModal({ type: 'approve', returnId: ret.id }); setNotes(''); setRefundAmount(''); }}
                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Aprovar
                      </button>
                      <button
                        onClick={() => { setActionModal({ type: 'reject', returnId: ret.id }); setNotes(''); }}
                        className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-sm font-semibold hover:bg-destructive/20 transition-colors flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl border border-border bg-card shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">
              {actionModal.type === 'approve' ? 'Aprovar Devolução' : 'Rejeitar Devolução'}
            </h3>
            <form onSubmit={handleSubmitAction} className="space-y-4">
              {actionModal.type === 'approve' && (
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Valor do Reembolso (AOA)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder="Ex: 2500.00"
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  {actionModal.type === 'approve' ? 'Notas (opcional)' : 'Motivo da Rejeição'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  required={actionModal.type === 'reject'}
                  placeholder={
                    actionModal.type === 'approve'
                      ? 'Informações adicionais para o cliente...'
                      : 'Explique o motivo da rejeição...'
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              {actionError && <p className="text-xs text-destructive">{actionError}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setActionModal(null); setActionError(''); }}
                  className="flex-1 border rounded-lg py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={approveReturn.isPending || rejectReturn.isPending}
                  className={cn(
                    'flex-1 rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-colors',
                    actionModal.type === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700',
                  )}
                >
                  {(approveReturn.isPending || rejectReturn.isPending) && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {actionModal.type === 'approve' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
