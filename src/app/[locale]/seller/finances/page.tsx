'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { apolloClient } from '@/lib/graphql-client';
import { UPDATE_STORE } from '@/graphql/mutations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toggle } from '@/components/ui/Toggle';
import { Save } from 'lucide-react';

export default function FinancesPage() {
  const { user } = useAuth();
  const { data: store, isLoading } = useSellerStore(user?.id);
  const queryClient = useQueryClient();

  const [pixKey, setPixKey] = useState('');
  const [acceptsCreditCard, setAcceptsCreditCard] = useState(true);
  const [acceptsBoleto, setAcceptsBoleto] = useState(false);

  useEffect(() => {
    if (store) {
      setPixKey(store.pixKey || '');
      setAcceptsCreditCard(store.acceptsCreditCard ?? true);
      setAcceptsBoleto(store.acceptsBoleto ?? false);
    }
  }, [store]);

  const updateMutation = useMutation({
    mutationFn: async (input: any) => {
      if (!store?.id) throw new Error('Store ID missing');
      return apolloClient.mutate({
        mutation: UPDATE_STORE,
        variables: { id: store.id, input },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerStore', user?.id] });
      alert('Configurações financeiras salvas!');
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      pixKey,
      acceptsCreditCard,
      acceptsBoleto,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-background-light min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em]">
                Finanças e Pagamentos
              </h1>
              <p className="text-sm lg:text-base font-normal text-muted-foreground">
                Gerencie seus recebimentos e métodos de pagamento
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Salvando...' : <Save className="w-4 h-4" />}
              {updateMutation.isPending ? '' : 'Salvar Alterações'}
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1000px] mx-auto space-y-8">
        
        {/* Reports overview in Finance */}
        <section className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Receita Total
                    </p>
                    <p className="text-2xl font-bold text-foreground">AOA 12.540,00</p>
                    <p className="text-xs text-muted-foreground mt-1">Este mês</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Pendente de Saque
                    </p>
                    <p className="text-2xl font-bold text-foreground">AOA 3.200,50</p>
                    <p className="text-xs text-muted-foreground mt-1">Próximo saque em 3 dias</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Transações
                    </p>
                    <p className="text-2xl font-bold text-foreground">247</p>
                    <p className="text-xs text-muted-foreground mt-1">Histórico completo</p>
                  </div>
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-semibold mb-3">Ações</h3>
              <div className="flex gap-3 flex-wrap">
                <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
                  <span className="inline-block mr-2">💳</span> Configurar Cartão
                </button>
                <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
                  <span className="inline-block mr-2">🏦</span> Conta Bancária
                </button>
                <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
                  <span className="inline-block mr-2">📊</span> Ver Extrato
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Métodos de Pagamento Oferecidos</h2>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary transition-colors">
              <div className="h-10 w-10 rounded bg-green-50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">pix</span>
              </div>
              <div className="flex-1 border-b border-transparent pb-1">
                <h3 className="font-medium text-foreground">PIX</h3>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="Chave PIX (CNPJ, email, telefone)"
                  className="w-full mt-2 px-3 py-2 border border-border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className={`border rounded-lg p-4 flex items-center gap-4 transition-colors cursor-pointer group relative ${acceptsCreditCard ? 'border-primary bg-primary/5' : 'border-border'}`}>
              <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">credit_score</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Cartão de Crédito</h3>
                <p className="text-xs text-muted-foreground mt-1">Visa, Mastercard, Elo (via Gateway)</p>
              </div>
              <Toggle
                checked={acceptsCreditCard}
                onChange={(e) => setAcceptsCreditCard(e.currentTarget.checked)}
              />
            </div>

            <div className={`border rounded-lg p-4 flex items-center gap-4 transition-colors cursor-pointer ${acceptsBoleto ? 'border-primary bg-primary/5' : 'border-border opacity-80'}`}>
              <div className="h-10 w-10 rounded flex items-center justify-center text-muted-foreground flex-shrink-0">
                <span className="material-symbols-outlined">receipt</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Boleto Bancário</h3>
                <p className="text-xs text-muted-foreground mt-1">{acceptsBoleto ? 'Ativo' : 'Desativado'}</p>
              </div>
              <Toggle
                checked={acceptsBoleto}
                onChange={(e) => setAcceptsBoleto(e.currentTarget.checked)}
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
