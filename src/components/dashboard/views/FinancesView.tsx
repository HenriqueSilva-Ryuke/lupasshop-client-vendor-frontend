'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES, GET_STORE_BALANCE, LIST_PAYOUTS } from '@/graphql/queries';

export default function FinancesView() {
  const t = useTranslations('dashboard.finances');

  const { data: userData } = useQuery(GET_CURRENT_USER);
  const ownerId = userData?.me?.id;

  const { data: storesData } = useQuery(LIST_STORES, {
    variables: { ownerId },
    skip: !ownerId,
  });

  const storeId = storesData?.listStores?.[0]?.id;

  const { data: balanceData, loading: balanceLoading } = useQuery(GET_STORE_BALANCE, {
    variables: { storeId },
    skip: !storeId,
    fetchPolicy: 'cache-and-network',
  });

  const { data: payoutsData, loading: payoutsLoading } = useQuery(LIST_PAYOUTS, {
    variables: { storeId },
    skip: !storeId,
    fetchPolicy: 'cache-and-network',
  });

  const balance = balanceData?.getStoreBalance;
  const payouts = payoutsData?.listPayouts || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('manage')}</h1>
        <p className="text-gray-500">Track your earnings and payouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-500">Saldo atual</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(balance?.currentBalance || 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-500">Pendente</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(balance?.pendingPayout || 0)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <p className="text-sm text-gray-500">Último pagamento</p>
          <p className="text-sm text-gray-900">
            {balance?.lastPayoutDate ? new Date(balance.lastPayoutDate).toLocaleDateString() : '—'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold">Pagamentos</h3>
        </div>
        {(balanceLoading || payoutsLoading) ? (
          <div className="p-6 text-center text-gray-500">Carregando...</div>
        ) : payouts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum pagamento encontrado</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payouts.map((payout: any) => (
                  <tr key={payout.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">#{payout.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(payout.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payout.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(payout.payoutDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
