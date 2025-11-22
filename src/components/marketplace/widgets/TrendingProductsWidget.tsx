import React from 'react';
import { MarketplaceProduct } from '@/types/marketplace';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { useLocale } from 'next-intl';

interface TrendingProductsWidgetProps {
    products: MarketplaceProduct[];
    onViewTrending?: () => void;
}

export default function TrendingProductsWidget({ products, onViewTrending }: TrendingProductsWidgetProps) {
    const locale = useLocale();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                    <TrendingUp size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">Trending Now</h3>
            </div>

            <div className="divide-y divide-gray-50">
                {products.slice(0, 4).map((product) => (
                    <Link
                        key={product.id}
                        href={`/${locale}/product/${product.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors group"
                    >
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-gray-900">
                                    {product.currency} {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                        {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-3 border-t border-gray-100">
                {onViewTrending ? (
                    <button
                        onClick={onViewTrending}
                        className="block w-full py-2 text-center text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        View All Trending
                    </button>
                ) : (
                    <Link
                        href={`/${locale}/marketplace?sort=trending`}
                        className="block w-full py-2 text-center text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        View All Trending
                    </Link>
                )}
            </div>
        </div>
    );
}