import React from 'react';
import { Category } from '@/types/marketplace';
import * as Icons from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CategoryWidgetProps {
    categories: Category[];
    selectedCategory?: string;
    onSelectCategory: (slug: string) => void;
}

export default function CategoryWidget({ categories, selectedCategory, onSelectCategory }: CategoryWidgetProps) {
    const t = useTranslations('marketplace');

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{t('categories.label')}</h3>
            </div>
            <div className="p-2">
                {categories.map((category) => {
                    const Icon = (Icons as any)[category.icon || 'Circle'] || Icons.Circle;
                    const isSelected = selectedCategory === category.slug;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.slug)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${isSelected
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-primary text-black' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm'
                                    }`}>
                                    <Icon size={18} />
                                </div>
                                <span className="font-medium text-sm">{t(`categories.${category.slug}`)}</span>
                            </div>
                            {category.count !== undefined && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${isSelected ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {category.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}