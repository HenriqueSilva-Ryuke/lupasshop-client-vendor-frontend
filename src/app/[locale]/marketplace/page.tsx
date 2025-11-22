'use server';
import React from 'react';
import MarketplaceShell from '@/components/marketplace/MarketplaceShell';
import Navbar from '@/components/Navbar';
import JsonLd from '@/components/JsonLd';
import { generatePageMetadata } from '@/lib/page-seo';
import { mockCategories, mockStores, mockProducts } from '@/lib/mock-marketplace';
export async function generateMetadata({ params, searchParams }: any) {
    const paramsObj = await params;
    const searchParamsObj = await searchParams;
    const locale = paramsObj?.locale || 'en';
    let title = 'Marketplace - LupaShop';
    let description = 'Discover the best stores and products in Angola.';
    if (searchParamsObj?.category) {
        const category = mockCategories.find(c => c.slug === searchParamsObj.category);
        if (category) {
            title = `${category.name} Stores - LupaShop Marketplace`;
            description = `Browse the best ${category.name} stores and products on LupaShop.`;
        }
    }
    return generatePageMetadata({
        page: 'marketplace',
        locale,
        customTitle: title,
        customDescription: description
    });
}
export default async function MarketplacePage({ params, searchParams }: any) {
    const paramsObj = await params;
    const searchParamsObj = await searchParams;
    const locale = paramsObj.locale;
    // Filter stores for Schema.org based on category if present
    let schemaStores = mockStores;
    if (searchParamsObj?.category) {
        schemaStores = mockStores.filter(s => s.categories.includes(searchParamsObj.category));
    }
    const metaData = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'LupaShop Marketplace',
        'itemListElement': schemaStores.map((s: any, i: number) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'url': `${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/store/${s.slug}`
        }))
    };
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-900 via-primary to-primary/40">
            <Navbar />
            <MarketplaceShell
                categories={mockCategories}
                stores={mockStores}
                products={mockProducts}
            />
            <JsonLd data={metaData} />
        </main>
    );
}
