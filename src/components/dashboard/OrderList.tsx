'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Eye, MoreVertical } from 'lucide-react';

export default function OrderList() {
    const t = useTranslations('dashboard.orders');

    // Mock Data
    const orders = [
        { id: '#ORD-001', customer: 'João Silva', date: '2023-10-25', amount: '25,000 AOA', status: 'Delivered' },
        { id: '#ORD-002', customer: 'Maria Santos', date: '2023-10-24', amount: '45,000 AOA', status: 'Processing' },
        { id: '#ORD-003', customer: 'Pedro Costa', date: '2023-10-24', amount: '15,000 AOA', status: 'Pending' },
        { id: '#ORD-004', customer: 'Ana Oliveira', date: '2023-10-23', amount: '5,000 AOA', status: 'Cancelled' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-amber-100 text-amber-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">{t('manage')}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('orderNumber')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('customer')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('date')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('amount')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('status')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-primary">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
