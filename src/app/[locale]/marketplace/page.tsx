'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import MarketplaceProductListing from '@/components/marketplace/MarketplaceProductListing';
import JsonLd from '@/components/JsonLd';

export default function MarketplacePage() {
 const metaData = {
 '@context': 'https://schema.org',
 '@type': 'ItemList',
 'name': 'LupaShop Marketplace',
 'itemListElement': []
 };

 return (
 <>
 <Navbar />
 <MarketplaceProductListing />
 <JsonLd data={metaData} />
 </>
 );
}

