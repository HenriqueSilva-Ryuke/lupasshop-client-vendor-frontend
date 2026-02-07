'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Skeleton loading components for better perceived performance.
 * Shows content structure before data loads.
 */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/60',
        className
      )}
    />
  );
}

/**
 * Product card skeleton - matches actual ProductCard layout
 */
export function SkeletonProductCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Image */}
      <Skeleton className="h-48 w-full rounded-lg mb-4" />
      
      {/* Title */}
      <Skeleton className="h-5 w-3/4 mb-2" />
      
      {/* Price */}
      <Skeleton className="h-6 w-1/3 mb-3" />
      
      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
      
      {/* Button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

/**
 * Store card skeleton
 */
export function SkeletonStoreCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        {/* Store avatar */}
        <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
        <div className="flex-1">
          {/* Store name */}
          <Skeleton className="h-5 w-2/3 mb-2" />
          {/* Store description */}
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

/**
 * Order item skeleton
 */
export function SkeletonOrderItem() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      
      <div className="flex gap-3">
        <Skeleton className="h-20 w-20 rounded-md" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

/**
 * Table row skeleton
 */
export function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === 0 ? 'w-1/4' : i === columns - 1 ? 'w-20' : 'w-1/5'
          )}
        />
      ))}
    </div>
  );
}

/**
 * List item skeleton (for dashboards, settings)
 */
export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  );
}

/**
 * Form skeleton
 */
export function SkeletonForm() {
  return (
    <div className="space-y-6">
      {/* Field 1 */}
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      
      {/* Field 2 */}
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      
      {/* Field 3 */}
      <div>
        <Skeleton className="h-4 w-28 mb-2" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
      
      {/* Button */}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
