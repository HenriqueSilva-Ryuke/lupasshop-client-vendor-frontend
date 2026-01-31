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
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b flex items-center gap-2">
                <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                    <TrendingUp size={18} />
                </div>
                <h3 className="font-semibold text-foreground">Trending Now</h3>
            </div>

            <div className="divide-y divide-gray-50">
                {products.slice(0, 4).map((product) => (
                    <Link
                        key={product.id}
                        href={`/${locale}/product/${product.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-muted transition-colors group"
                    >
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-foreground">
                                    {product.currency} {product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-xs text-muted-foreground line-through">
                                        {product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-3 border-t">
                {onViewTrending ? (
                    <button
                        onClick={onViewTrending}
                        className="block w-full py-2 text-center text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    >
                        View All Trending
                    </button>
                ) : (
                    <Link
                        href={`/${locale}/marketplace?sort=trending`}
                        className="block w-full py-2 text-center text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    >
                        View All Trending
                    </Link>
                )}
            </div>
        </div>
    );
}