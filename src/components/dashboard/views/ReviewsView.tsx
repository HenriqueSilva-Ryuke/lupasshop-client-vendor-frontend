'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER, LIST_STORES, LIST_REVIEWS } from '@/graphql/queries';

export default function ReviewsView() {
 const t = useTranslations('dashboard.reviews');

 const { data: userData } = useQuery<any>(GET_CURRENT_USER);
 const ownerId = userData?.me?.id;

 const { data: storesData } = useQuery<any>(LIST_STORES, {
 variables: { ownerId },
 skip: !ownerId,
 });

 const storeId = storesData?.listStores?.[0]?.id;

 const { data: reviewsData, loading } = useQuery<any>(LIST_REVIEWS, {
 variables: { storeId },
 skip: !storeId,
 fetchPolicy: 'cache-and-network',
 });

 const reviews = reviewsData?.listReviews || [];

 return (
 <div className="space-y-8">
 <div>
 <h1 className="text-2xl font-bold text-foreground">{t('manage')}</h1>
 <p className="text-muted-foreground">Monitor and respond to customer reviews</p>
 </div>

 <div className="bg-card rounded-2xl border overflow-hidden">
 <div className="px-6 py-4 border-b">
 <h3 className="font-semibold">Reviews</h3>
 </div>

 {loading ? (
 <div className="p-6 text-center text-muted-foreground">Carregando...</div>
 ) : reviews.length === 0 ? (
 <div className="p-6 text-center text-muted-foreground">Nenhuma avaliação encontrada</div>
 ) : (
 <div className="divide-y divide-gray-100">
 {reviews.map((review: any) => (
 <div key={review.id} className="p-6">
 <div className="flex items-center justify-between">
 <div>
 <p className="font-medium text-foreground">{review.user?.fullName || 'Cliente'}</p>
 <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
 </div>
 <div className="text-sm font-semibold text-foreground">{review.rating} / 5</div>
 </div>
 <p className="text-muted-foreground mt-3">{review.comment}</p>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
