'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export default function FinancesView() {
  const t = useTranslations('dashboard');
  const [transactions] = React.useState<Transaction[]>([
    { id: '1', description: 'Venda - Produto A', amount: 450.50, type: 'income', date: '2024-11-03' },
    { id: '2', description: 'Comissão', amount: 45.05, type: 'expense', date: '2024-11-03' },
    { id: '3', description: 'Venda - Produto B', amount: 1250, type: 'income', date: '2024-11-02' },
  ]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('nav.finances')}</h1>
        <p className="text-gray-600 mt-1">{t('finances.manage')}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-sm text-green-700 font-medium">{t('finances.income')}</p>
          <p className="text-2xl font-bold text-green-900 mt-2">AOA {totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-sm text-red-700 font-medium">{t('finances.expenses')}</p>
          <p className="text-2xl font-bold text-red-900 mt-2">AOA {totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-sm text-blue-700 font-medium">{t('finances.balance')}</p>
          <p className="text-2xl font-bold text-blue-900 mt-2">AOA {balance.toFixed(2)}</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('finances.transactions')}</h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <span className={`material-icons text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.type === 'income' ? '+' : '-'}AOA {tx.amount.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
