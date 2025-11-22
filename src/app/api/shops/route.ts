'use server';

import { NextResponse } from 'next/server';
import { getShopsList, getShopCategories } from '@/lib/cached-stores';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || undefined;
  const category = url.searchParams.get('category') || undefined;
  const page = Number(url.searchParams.get('page') || '1');
  const limit = Number(url.searchParams.get('limit') || '12');
  const sort = (url.searchParams.get('sort') || undefined) as any;

  const filters = {
    q,
    category,
    page,
    limit,
    sort,
  };

  const shops = await getShopsList(filters);
  const categories = await getShopCategories();

  return NextResponse.json({ shops, categories });
}
