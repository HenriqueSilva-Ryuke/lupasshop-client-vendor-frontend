'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { Save, AlertCircle, Loader2, Wallet, Clock, ReceiptText, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';
import { GET_STORE_BALANCE, LIST_PAYOUTS } from '@/graphql/queries';
import { UPDATE_STORE } from '@/graphql/mutations';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { Toggle } from '@/components/ui/Toggle';
import { toast } from 'sonner';

function formatAOA(v: number) {
  return `AOA ${v.toLocaleString('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const PAYOUT_STATUS_LABEL: Record<string, { label: string; color: string }> = {
  PENDING:   { label: 'Pendente',   color: 'bg-orange-100 text-orange-700' },
  PROCESSED: { label: 'Processado', color: 'bg-green-100 text-green-700'  },
  FAILED:    { label: 'Falhado',    color: 'bg-red-100 text-red-700'      },
};

export default function FinancesPage() {
  const { user } = useAuth();
  const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);

  // Payment method state — adapted for Angola
  const [multicaixaKey, setMulticaixaKey] = useState('');      // Multicaixa Express (phone)
  const [ibanNumber, setIbanNumber] = useState('');            // IBAN bancário angolano
  const [acceptsCreditCard, setAcceptsCreditCard] = useState(true);
  const [acceptsCash, setAcceptsCash] = useState(false);       // Dinheiro na entrega

  useEffect(() => {
    if (store) {
      // pixKey field reused for Multicaixa Express number
      setMulticaixaKey(store.pixKey || '');
      setIbanNumber(store.location || ''); // reuse location field for IBAN until schema updated
      setAcceptsCreditCard(store.acceptsCreditCard ?? true);
      setAcceptsCash(store.acceptsBoleto ?? false);
    }
  }, [store]);

  // Balance
  const { data: balanceData, loading: balanceLoading } = useQuery<any>(GET_STORE_BALANCE, {
    variables: { storeId: store?.id },
    skip: !store?.id,
    fetchPolicy: 'cache-and-network',
  });

  // Payouts history
  const { data: payoutsData, loading: payoutsLoading } = useQuery<any>(LIST_PAYOUTS, {
    variables: { storeId: store?.id },
    skip: !store?.id,
    fetchPolicy: 'cache-and-network',
  });

  const balance = balanceData?.getStoreBalance;
  const payouts = payoutsData?.listPayouts ?? [];

  const [updateStore, { loading: saving }] = useMutation(UPDATE_STORE, {
    onCompleted: () => toast.success('Configurações financeiras guardadas'),
    onError: (err) => toast.error(err.message),
  });

  const handleSave = () => {
    if (!store?.id) return;
    updateStore({
      variables: {
        id: store.id,
        input: {
          pixKey: multicaixaKey,
          acceptsCreditCard,
          acceptsBoleto: acceptsCash,
        },
      },
    });
  };

  if (storeLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-background-light min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Finanças e Pagamentos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Gerencie os seus recebimentos e métodos de pagamento</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !store?.id}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'A guardar...' : 'Guardar Alterações'}
          </button>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1000px] mx-auto space-y-8">

        {/* Balance overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Saldo Disponível</p>
              <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              {balanceLoading ? '—' : formatAOA(balance?.currentBalance ?? 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Após comissões da plataforma</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Pendente de Pagamento</p>
              <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              {balanceLoading ? '—' : formatAOA(balance?.pendingPayout ?? 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {balance?.lastPayoutDate
                ? `Último pagamento: ${new Date(balance.lastPayoutDate).toLocaleDateString('pt-AO')}`
                : 'Nenhum pagamento anterior'}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Transferências</p>
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <ReceiptText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{payoutsLoading ? '—' : payouts.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total de transferências registadas</p>
          </div>
        </div>

        {/* Payment methods — Angola */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Métodos de Pagamento
          </h2>

          <div className="bg-card border border-border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Multicaixa Express */}
            <div className="border border-border rounded-xl p-4 space-y-3 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#2e7d32]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Multicaixa Express</p>
                  <p className="text-xs text-muted-foreground">Pagamento via referência ou número de telefone</p>
                </div>
              </div>
              <input
                type="tel"
                value={multicaixaKey}
                onChange={e => setMulticaixaKey(e.target.value)}
                placeholder="9XX XXX XXX (número associado)"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Transferência bancária (IBAN AO) */}
            <div className="border border-border rounded-xl p-4 space-y-3 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e3f2fd] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#1565c0]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Transferência Bancária</p>
                  <p className="text-xs text-muted-foreground">IBAN angolano (AO06 ...)</p>
                </div>
              </div>
              <input
                type="text"
                value={ibanNumber}
                onChange={e => setIbanNumber(e.target.value)}
                placeholder="AO06 0040 0000 XXXX XXXX XXXX X"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Cartão de débito/crédito */}
            <div className={`border rounded-xl p-4 flex items-center gap-4 transition-colors ${acceptsCreditCard ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Cartão Débito / Crédito</p>
                <p className="text-xs text-muted-foreground mt-0.5">Visa, Mastercard (via terminal POS ou gateway)</p>
              </div>
              <Toggle checked={acceptsCreditCard} onChange={e => setAcceptsCreditCard(e.currentTarget.checked)} />
            </div>

            {/* Dinheiro na entrega */}
            <div className={`border rounded-xl p-4 flex items-center gap-4 transition-colors ${acceptsCash ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Dinheiro na Entrega</p>
                <p className="text-xs text-muted-foreground mt-0.5">O cliente paga em Kwanzas ao receber a encomenda</p>
              </div>
              <Toggle checked={acceptsCash} onChange={e => setAcceptsCash(e.currentTarget.checked)} />
            </div>

          </div>
        </section>

        {/* Payouts history */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ReceiptText className="w-5 h-5 text-primary" />
            Histórico de Transferências
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {payoutsLoading ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> A carregar...
              </div>
            ) : payouts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                <AlertCircle className="w-8 h-8 opacity-30" />
                <p className="text-sm">Nenhuma transferência registada</p>
              </div>
            ) : (
              <>
                <div className="px-4 py-2 grid grid-cols-[1fr_auto_auto] gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                  <span>Data</span>
                  <span className="text-right">Valor</span>
                  <span className="text-right">Estado</span>
                </div>
                <div className="divide-y divide-border">
                  {payouts.map((p: any) => {
                    const st = PAYOUT_STATUS_LABEL[p.status] ?? { label: p.status, color: 'bg-muted text-muted-foreground' };
                    return (
                      <div key={p.id} className="px-4 py-3 grid grid-cols-[1fr_auto_auto] gap-4 items-center hover:bg-muted/20 transition-colors">
                        <div>
                          <p className="text-sm font-medium">{new Date(p.payoutDate).toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                          <p className="text-xs text-muted-foreground">#{p.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <span className="text-sm font-bold text-right">{formatAOA(p.amount)}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${st.color}`}>{st.label}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
