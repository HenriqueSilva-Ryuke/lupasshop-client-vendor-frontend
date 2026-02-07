'use client';

import React from 'react';

/**
 * LupaShop branded 404 illustration.
 * A magnifying glass (lupa) searching over empty space with a "?" — conveys
 * "we looked but couldn't find the page". Uses the violet brand palette.
 */
export function NotFoundIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ground shadow */}
      <ellipse cx="160" cy="220" rx="130" ry="24" fill="var(--lupa-brand-50, #f5f0ff)" />

      {/* Empty shelf / platform */}
      <rect x="60" y="140" width="200" height="60" rx="14" fill="var(--lupa-brand-100, #ede5ff)" stroke="var(--lupa-brand-300, #c4a8ff)" strokeWidth="2" />
      {/* Shelf legs */}
      <rect x="85" y="196" width="8" height="28" rx="3" fill="var(--lupa-brand-200, #ddd0ff)" />
      <rect x="227" y="196" width="8" height="28" rx="3" fill="var(--lupa-brand-200, #ddd0ff)" />

      {/* Dotted lines on shelf (where items should be) */}
      <line x1="90" y1="170" x2="120" y2="170" stroke="var(--lupa-brand-300, #c4a8ff)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <line x1="135" y1="170" x2="165" y2="170" stroke="var(--lupa-brand-300, #c4a8ff)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <line x1="180" y1="170" x2="230" y2="170" stroke="var(--lupa-brand-300, #c4a8ff)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />

      {/* Magnifying glass hovering over shelf */}
      <g transform="translate(160, 60)">
        {/* Glass circle */}
        <circle
          cx="0"
          cy="0"
          r="40"
          stroke="var(--lupa-primary, #412778)"
          strokeWidth="5"
          fill="var(--lupa-brand-50, #f5f0ff)"
          fillOpacity="0.8"
        />
        {/* Shine on glass */}
        <path
          d="M-16 -18 Q-8 -28 4 -24"
          stroke="var(--lupa-brand-300, #c4a8ff)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Question mark inside */}
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fontSize="32"
          fontWeight="bold"
          fill="var(--lupa-primary, #412778)"
          opacity="0.6"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          ?
        </text>
        {/* Handle */}
        <line
          x1="28"
          y1="28"
          x2="52"
          y2="52"
          stroke="var(--lupa-primary, #412778)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Handle grip */}
        <rect
          x="46"
          y="46"
          width="16"
          height="12"
          rx="3"
          transform="rotate(45 54 52)"
          fill="var(--lupa-brand-400, #a775ff)"
        />
      </g>

      {/* Floating "404" badge */}
      <g transform="translate(60, 30)">
        <rect x="-8" y="-12" width="52" height="28" rx="14" fill="var(--lupa-primary, #412778)" />
        <text x="18" y="6" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif">404</text>
      </g>

      {/* Small decorative elements */}
      {/* Stars / sparkles around the glass */}
      <g fill="var(--lupa-brand-400, #a775ff)" opacity="0.5">
        <circle cx="100" cy="40" r="3" />
        <circle cx="230" cy="50" r="2.5" />
        <circle cx="250" cy="90" r="2" />
        <circle cx="80" cy="80" r="2" />
      </g>

      {/* Floating dots */}
      <circle cx="280" cy="180" r="4" fill="var(--lupa-brand-200, #ddd0ff)" />
      <circle cx="40" cy="160" r="3" fill="var(--lupa-brand-200, #ddd0ff)" />
      <circle cx="290" cy="140" r="2.5" fill="var(--lupa-brand-300, #c4a8ff)" />
      <circle cx="30" cy="120" r="2" fill="var(--lupa-brand-300, #c4a8ff)" />
    </svg>
  );
}
