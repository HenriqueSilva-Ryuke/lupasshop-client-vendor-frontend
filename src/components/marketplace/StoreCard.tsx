import React from 'react';
import { MarketplaceStore } from '@/types/marketplace';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, BadgeCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface StoreCardProps {
    store: MarketplaceStore;
}

export default function StoreCard({ store }: StoreCardProps) {
    const t = useTranslations('marketplace');

    return (
        <Link
            href={`/store/${store.slug}`}
            className="group bg-card rounded-2xl border overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 block h-full flex flex-col"
        >
            {/* Cover Image */}
            <div className="relative h-32 w-full bg-muted overflow-hidden">
                <Image
                    src={store.coverImage}
                    alt={store.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            {/* Content */}
            <div className="p-4 pt-12 relative flex-1 flex flex-col">
                {/* Logo - Floating */}
                <div className="absolute -top-8 left-4 p-1 bg-card rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted">
                        <Image
                            src={store.logo}
                            alt={store.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                {/* Header */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {store.name}
                            </h3>
                            {store.isVerified && (
                                <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                            )}
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-amber-700">{store.rating}</span>
                        </div>
                    </div>

                    {store.location && (
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <MapPin size={12} />
                            <span className="line-clamp-1">{store.location}</span>
                        </div>
                    )}
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {store.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {store.categories.slice(0, 2).map((cat) => (
                        <span
                            key={cat}
                            className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md font-medium uppercase tracking-wider"
                        >
                            {t(`categories.${cat}`)}
                        </span>
                    ))}
                    {store.categories.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md font-medium">
                            +{store.categories.length - 2}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
