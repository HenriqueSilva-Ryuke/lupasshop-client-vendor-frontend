import React from 'react';
import { MarketplaceProduct } from '@/types/marketplace';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
    product: MarketplaceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const t = useTranslations('marketplace');

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group bg-card rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 block h-full flex flex-col"
        >
            {/* Product Image */}
            <div className="relative h-48 w-full bg-muted overflow-hidden">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                        <span className="px-2 py-1 bg-primary500 text-black text-xs font-bold rounded-lg shadow-sm">
                            NEW
                        </span>
                    )}
                    {product.isTrending && (
                        <span className="px-2 py-1 bg-rose-500 text-black text-xs font-bold rounded-lg shadow-sm">
                            HOT
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {t(`categories.${product.category}`)}
                    </span>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                        {product.name}
                    </h3>
                </div>

                {/* Store Info */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-muted relative overflow-hidden">
                        {/* Placeholder for store logo if we had it in product type, using generic icon for now or just text */}
                        <div className="absolute inset-0 bg-gray-200" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium truncate">
                        {product.storeName}
                    </span>
                </div>

                {/* Price & Rating */}
                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">
                                {product.currency} {product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                    {product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        {product.rating && (
                            <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span className="text-xs font-bold text-foreground">{product.rating}</span>
                                <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                            </div>
                        )}
                    </div>

                    <button className="p-2 rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-black transition-colors">
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
