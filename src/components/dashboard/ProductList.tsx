'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Edit, Trash2, MoreVertical, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductList() {
    const t = useTranslations('dashboard.products');

    // Mock Data
    const products = [
        { id: 1, name: 'Wireless Headphones', price: '25,000 AOA', stock: 12, status: 'Active', category: 'Electronics' },
        { id: 2, name: 'Smart Watch', price: '45,000 AOA', stock: 5, status: 'Active', category: 'Electronics' },
        { id: 3, name: 'Running Shoes', price: '15,000 AOA', stock: 0, status: 'Out of Stock', category: 'Sports' },
        { id: 4, name: 'Cotton T-Shirt', price: '5,000 AOA', stock: 50, status: 'Active', category: 'Fashion' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">{t('manage')}</h2>
                <Link
                    href="/dashboard/products/new"
                    className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                    <Plus size={18} />
                    {t('addProduct')}
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('name')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('category')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('price')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('stock')}</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">{t('general')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                            <Edit size={18} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
