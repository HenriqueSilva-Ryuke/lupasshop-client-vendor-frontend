'use client';

import React from 'react';

/**
 * LupaShop branded error illustration.
 * A broken magnifying glass (lupa) with a sad shopping bag — matches the
 * violet brand palette and conveys "something went wrong while searching/shopping".
 */
export function ErrorIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background blob */}
      <ellipse cx="140" cy="180" rx="120" ry="28" fill="var(--lupa-brand-50, #f5f0ff)" />

      {/* Shopping bag body */}
      <rect x="88" y="80" width="104" height="100" rx="12" fill="var(--lupa-brand-100, #ede5ff)" stroke="var(--lupa-brand-300, #c4a8ff)" strokeWidth="2.5" />

      {/* Bag handles */}
      <path
        d="M118 80V64a22 22 0 0 1 44 0v16"
        stroke="var(--lupa-brand-400, #a775ff)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sad face on bag */}
      {/* Eyes */}
      <circle cx="124" cy="120" r="4" fill="var(--lupa-brand-500, #8b46f5)" />
      <circle cx="156" cy="120" r="4" fill="var(--lupa-brand-500, #8b46f5)" />
      {/* Sad mouth */}
      <path
        d="M126 146c4-6 18-6 22 0"
        stroke="var(--lupa-brand-500, #8b46f5)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        transform="rotate(180 137 146)"
      />

      {/* Magnifying glass (broken / cracked) */}
      <g transform="translate(170, 30) rotate(25)">
        {/* Glass circle */}
        <circle
          cx="0"
          cy="0"
          r="28"
          stroke="var(--lupa-primary, #412778)"
          strokeWidth="4"
          fill="var(--lupa-brand-50, #f5f0ff)"
          fillOpacity="0.7"
        />
        {/* Crack lines */}
        <path
          d="M-6 -12 L2 0 L-4 10"
          stroke="var(--lupa-destructive, #ef4444)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M2 0 L10 -4"
          stroke="var(--lupa-destructive, #ef4444)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Handle */}
        <line
          x1="20"
          y1="20"
          x2="40"
          y2="40"
          stroke="var(--lupa-primary, #412778)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* Exclamation circle */}
      <circle cx="60" cy="50" r="16" fill="var(--lupa-destructive, #ef4444)" opacity="0.12" />
      <circle cx="60" cy="50" r="12" fill="var(--lupa-destructive, #ef4444)" opacity="0.2" />
      <text
        x="60"
        y="56"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="var(--lupa-destructive, #ef4444)"
      >
        !
      </text>

      {/* Small decorative dots */}
      <circle cx="50" cy="160" r="3" fill="var(--lupa-brand-200, #ddd0ff)" />
      <circle cx="230" cy="150" r="4" fill="var(--lupa-brand-200, #ddd0ff)" />
      <circle cx="210" cy="170" r="2.5" fill="var(--lupa-brand-300, #c4a8ff)" />
      <circle cx="70" cy="175" r="2" fill="var(--lupa-brand-300, #c4a8ff)" />
    </svg>
  );
}

/**
 * LupaShop empty state component (shadcn-style).
 * Combines the illustration with a title, description and optional action.
 */
export function EmptyState({
  illustration,
  title,
  description,
  children,
  className = '',
}: {
  illustration?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {illustration && <div className="mb-6">{illustration}</div>}
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {description}
        </p>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
