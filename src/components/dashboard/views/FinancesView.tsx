'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES, GET_STORE_BALANCE, LIST_PAYOUTS } from '@/graphql/queries';

export default function FinancesView() {
 const t = useTranslations('dashboard.finances');

 const { data: userData } = useQuery<any>(GET_CURRENT_USER);
 const ownerId = userData?.me?.id;

 const { data: storesData } = useQuery<any>(LIST_STORES, {
 variables: { ownerId },
 skip: !ownerId,
 });

 const storeId = storesData?.listStores?.[0]?.id;

 const { data: balanceData, loading: balanceLoading } = useQuery<any>(GET_STORE_BALANCE, {
 variables: { storeId },
 skip: !storeId,
 fetchPolicy: 'cache-and-network',
 });

 const { data: payoutsData, loading: payoutsLoading } = useQuery<any>(LIST_PAYOUTS, {
 variables: { storeId },
 skip: !storeId,
 fetchPolicy: 'cache-and-network',
 });

 const balance = balanceData?.getStoreBalance;
 const payouts = payoutsData?.listPayouts || [];

 return (
 <div className="space-y-8">
 <div>
 <h1 className="text-2xl font-bold text-foreground">{t('manage')}</h1>
 <p className="text-muted-foreground">Track your earnings and payouts</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="bg-card p-6 rounded-2xl border">
 <p className="text-sm text-muted-foreground">Saldo atual</p>
 <p className="text-2xl font-bold text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(balance?.currentBalance || 0)}
 </p>
 </div>
 <div className="bg-card p-6 rounded-2xl border">
 <p className="text-sm text-muted-foreground">Pendente</p>
 <p className="text-2xl font-bold text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(balance?.pendingPayout || 0)}
 </p>
 </div>
 <div className="bg-card p-6 rounded-2xl border">
 <p className="text-sm text-muted-foreground">Último pagamento</p>
 <p className="text-sm text-foreground">
 {balance?.lastPayoutDate ? new Date(balance.lastPayoutDate).toLocaleDateString() : '—'}
 </p>
 </div>
 </div>

 <div className="bg-card rounded-2xl border overflow-hidden">
 <div className="px-6 py-4 border-b">
 <h3 className="font-semibold">Pagamentos</h3>
 </div>
 {(balanceLoading || payoutsLoading) ? (
 <div className="p-6 text-center text-muted-foreground">Carregando...</div>
 ) : payouts.length === 0 ? (
 <div className="p-6 text-center text-muted-foreground">Nenhum pagamento encontrado</div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-muted border-b">
 <tr>
 <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">ID</th>
 <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Valor</th>
 <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
 <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Data</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {payouts.map((payout: any) => (
 <tr key={payout.id} className="hover:bg-muted">
 <td className="px-6 py-4 text-sm text-foreground">#{payout.id.slice(0, 8)}</td>
 <td className="px-6 py-4 text-sm text-foreground">
 {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(payout.amount)}
 </td>
 <td className="px-6 py-4 text-sm text-foreground">{payout.status}</td>
 <td className="px-6 py-4 text-sm text-foreground">
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
