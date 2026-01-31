'use client';
import React from 'react';
import NavbarWithSearch from '@/components/NavbarWithSearch';
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
 <NavbarWithSearch />
 <MarketplaceProductListing />
 <JsonLd data={metaData} />
 </>
 );
}

