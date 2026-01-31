import React from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterWidgetProps {
    minPrice: number;
    maxPrice: number;
    onPriceChange: (min: number, max: number) => void;
    selectedRatings: number[];
    onRatingChange: (rating: number) => void;
}

export default function FilterWidget({
    minPrice,
    maxPrice,
    onPriceChange,
    selectedRatings,
    onRatingChange
}: FilterWidgetProps) {
    const t = useTranslations('marketplace');

    return (
        <div className="bg-card rounded-2xl shadow-sm border p-4">
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal size={18} className="text-muted-foreground" />
                <h3 className="font-semibold text-foreground">{t('filters')}</h3>
            </div>

            <div className="space-y-6">
                {/* Price Range */}
                <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">{t('priceRange')}</label>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            step="1000"
                            value={maxPrice}
                            onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                            className="w-full accent-primary h-2 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                            <span>0 AOA</span>
                            <span>{maxPrice.toLocaleString()} AOA</span>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">{t('rating')}</label>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`rating-${rating}`}
                                    checked={selectedRatings.includes(rating)}
                                    onCheckedChange={() => onRatingChange(rating)}
                                />
                                <label
                                    htmlFor={`rating-${rating}`}
                                    className="text-sm text-muted-foreground cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {rating} {rating === 1 ? t('stars').slice(0, -1) : t('stars')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
