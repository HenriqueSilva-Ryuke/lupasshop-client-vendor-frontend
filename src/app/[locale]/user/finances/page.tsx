'use client';

import { useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useQuery } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { GET_USER_FINANCES } from '@/graphql/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface UserFinance {
  id: string;
  userId: string;
  walletBalance: number;
  totalSpent: number;
  totalRefunded: number;
  lastTransactionDate: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT' | 'REFUND';
  amount: number;
  description: string;
  orderId?: string;
  createdAt: string;
}

export default function UserFinancesPage() {
  const locale = useLocale();
  const router = useRouter();
  const { user, isClient } = useClientAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getUserFinances', user?.id],
    queryFn: async () => {
      const result = await apolloClient.query<{ getUserFinances: UserFinance }>({
        query: GET_USER_FINANCES,
      });
      return result.data?.getUserFinances;
    },
    enabled: !!user && isClient,
  });

  useEffect(() => {
    if (isClient && !user) {
      router.push(`/${locale}/auth/login`);
    }
  }, [isClient, user, router, locale]);

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto h-full bg-background-light bg-background-dark">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 overflow-y-auto h-full bg-background-light bg-background-dark">
        <div className="flex items-center justify-center h-full">
          <div className="text-destructive text-red-400">Erro ao carregar finanças</div>
        </div>
      </main>
    );
  }

  const finances: UserFinance = data || {
    id: '',
    userId: user?.id || '',
    walletBalance: 0,
    totalSpent: 0,
    totalRefunded: 0,
    lastTransactionDate: new Date().toISOString(),
    transactions: [],
  };

  const transactions = finances.transactions;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem, ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <main className="flex-1 overflow-y-auto h-full relative scroll-smooth bg-background-light bg-background-dark">
      <header className="sticky top-0 z-20 w-full bg-white/95 bg-card-dark/95 backdrop-blur-md border-b border-gray-200 border-gray-800">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em] text-text-main-light text-text-main-dark">
                Minha Carteira
              </h1>
              <p className="text-text-sub-light text-text-sub-dark text-sm lg:text-base font-normal">
                Acompanhe seu saldo e histórico de transações.
              </p>
            </div>
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
              <span className="mr-2 material-symbols-outlined text-[18px]">file_download</span>
              <span className="truncate">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8 lg:px-10 max-w-[1400px] mx-auto flex flex-col gap-8">
        {/* Balance Card */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-primary bg-primary-dark border border-primary border-primary-dark/50 shadow-lg text-white transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <p className="text-primary-light/80 text-white/70 text-sm font-medium">Saldo em Carteira</p>
              <div className="p-2 bg-white/10 rounded-lg text-white">
                <span className="material-symbols-outlined text-[20px]">wallet</span>
              </div>
            </div>
            <div>
              <p className="tracking-tight text-3xl font-bold leading-tight mt-1">
                {formatCurrency(finances.walletBalance)}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <p className="text-white/80 text-xs">Saldo disponível</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white bg-card-dark border border-gray-200 border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <p className="text-text-sub-light text-text-sub-dark text-sm font-medium">Total Gasto</p>
              <div className="p-2 bg-primary50 bg-primary900/20 rounded-lg text-primary text-blue-400">
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              </div>
            </div>
            <div>
              <p className="text-text-main-light text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">
                {formatCurrency(finances.totalSpent)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                <p className="text-text-sub-light text-text-sub-dark text-xs font-normal">
                  Desde o início da conta
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white bg-card-dark border border-gray-200 border-gray-700 shadow-sm transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <p className="text-text-sub-light text-text-sub-dark text-sm font-medium">Total Reembolsado</p>
              <div className="p-2 bg-green-50 bg-green-900/20 rounded-lg text-primary text-green-400">
                <span className="material-symbols-outlined text-[20px]">undo</span>
              </div>
            </div>
            <div>
              <p className="text-text-main-light text-text-main-dark tracking-tight text-2xl font-bold leading-tight mt-1">
                {formatCurrency(finances.totalRefunded)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="material-symbols-outlined text-[16px] text-primary">arrow_upward</span>
                <p className="text-primary text-sm font-medium">
                  Devolvidos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transactions */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-text-main-light text-text-main-dark">
              Histórico de Transações
            </h3>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-gray-200 border-gray-700 bg-white bg-card-dark shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 bg-gray-800/50 border-b border-gray-100 border-gray-700">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light text-text-sub-dark">
                      Data
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light text-text-sub-dark">
                      Descrição
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light text-text-sub-dark">
                      Tipo
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-sub-light text-text-sub-dark text-right">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="group hover:bg-accent50 hover:bg-accent800 transition-colors"
                    >
                      <td className="p-4 text-sm text-text-sub-light text-text-sub-dark">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="p-4 text-sm font-medium text-text-main-light text-text-main-dark">
                        {transaction.description}
                        {transaction.orderId && (
                          <p className="text-xs text-text-sub-light font-normal">
                            Pedido {transaction.orderId}
                          </p>
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        {transaction.type === 'DEBIT' && (
                          <span className="inline-flex items-center gap-1 text-destructive text-red-400">
                            <span className="material-symbols-outlined text-[16px]">
                              remove_circle
                            </span>
                            Débito
                          </span>
                        )}
                        {transaction.type === 'CREDIT' && (
                          <span className="inline-flex items-center gap-1 text-primary text-green-400">
                            <span className="material-symbols-outlined text-[16px]">
                              add_circle
                            </span>
                            Crédito
                          </span>
                        )}
                        {transaction.type === 'REFUND' && (
                          <span className="inline-flex items-center gap-1 text-primary text-blue-400">
                            <span className="material-symbols-outlined text-[16px]">
                              undo
                            </span>
                            Reembolso
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm font-bold text-right">
                        {transaction.type === 'DEBIT' && (
                          <span className="text-destructive text-red-400">
                            - {formatCurrency(transaction.amount)}
                          </span>
                        )}
                        {transaction.type === 'CREDIT' && (
                          <span className="text-primary text-green-400">
                            + {formatCurrency(transaction.amount)}
                          </span>
                        )}
                        {transaction.type === 'REFUND' && (
                          <span className="text-primary text-blue-400">
                            + {formatCurrency(transaction.amount)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="h-8"></div>
      </div>
    </main>
  );
}
