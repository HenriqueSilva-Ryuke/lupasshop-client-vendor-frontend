'use client';

import { useEffect, useState } from 'react';

/**
 * Root not-found — no providers available (outside [locale] layout).
 * Detects locale from pathname/cookie/navigator and shows inline branded SVG.
 */

function InlineNotFoundIllustration() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 280, height: 'auto', margin: '0 auto', display: 'block' }} aria-hidden="true">
      <ellipse cx="160" cy="220" rx="130" ry="24" fill="#f5f0ff" />
      <rect x="60" y="140" width="200" height="60" rx="14" fill="#ede5ff" stroke="#c4a8ff" strokeWidth="2" />
      <rect x="85" y="196" width="8" height="28" rx="3" fill="#ddd0ff" />
      <rect x="227" y="196" width="8" height="28" rx="3" fill="#ddd0ff" />
      <line x1="90" y1="170" x2="120" y2="170" stroke="#c4a8ff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <line x1="135" y1="170" x2="165" y2="170" stroke="#c4a8ff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <line x1="180" y1="170" x2="230" y2="170" stroke="#c4a8ff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <g transform="translate(160, 60)">
        <circle cx="0" cy="0" r="40" stroke="#412778" strokeWidth="5" fill="#f5f0ff" fillOpacity="0.8" />
        <path d="M-16 -18 Q-8 -28 4 -24" stroke="#c4a8ff" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="0" y="8" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#412778" opacity="0.6" fontFamily="system-ui, -apple-system, sans-serif">?</text>
        <line x1="28" y1="28" x2="52" y2="52" stroke="#412778" strokeWidth="7" strokeLinecap="round" />
        <rect x="46" y="46" width="16" height="12" rx="3" transform="rotate(45 54 52)" fill="#a775ff" />
      </g>
      <g transform="translate(60, 30)">
        <rect x="-8" y="-12" width="52" height="28" rx="14" fill="#412778" />
        <text x="18" y="6" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff" fontFamily="system-ui, -apple-system, sans-serif">404</text>
      </g>
      <g fill="#a775ff" opacity="0.5">
        <circle cx="100" cy="40" r="3" />
        <circle cx="230" cy="50" r="2.5" />
        <circle cx="250" cy="90" r="2" />
        <circle cx="80" cy="80" r="2" />
      </g>
      <circle cx="280" cy="180" r="4" fill="#ddd0ff" />
      <circle cx="40" cy="160" r="3" fill="#ddd0ff" />
      <circle cx="290" cy="140" r="2.5" fill="#c4a8ff" />
      <circle cx="30" cy="120" r="2" fill="#c4a8ff" />
    </svg>
  );
}

const translations = {
  pt: {
    title: 'Página não encontrada',
    description: 'Desculpe, a página que você está procurando não existe ou foi movida.',
    goHome: 'Ir para Home',
    goBack: 'Voltar',
    errorCode: 'Código do erro',
  },
  en: {
    title: 'Page not found',
    description: "Sorry, the page you're looking for doesn't exist or has been moved.",
    goHome: 'Go to Home',
    goBack: 'Go back',
    errorCode: 'Error code',
  },
} as const;

function detectLocale(): 'pt' | 'en' {
  if (typeof window === 'undefined') return 'pt';
  const pathMatch = window.location.pathname.match(/^\/(en|pt)/);
  if (pathMatch) return pathMatch[1] as 'pt' | 'en';
  const navLang = navigator.language?.toLowerCase() || '';
  if (navLang.startsWith('en')) return 'en';
  return 'pt';
}

export default function NotFound() {
  const [locale, setLocale] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const t = translations[locale];

  return (
    <div style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#fafafa',
      }}>
        <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <InlineNotFoundIllustration />

          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#09090b', margin: '1.5rem 0 0.5rem' }}>
            {t.title}
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
            {t.description}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`/${locale}`}
              style={{
                height: 44,
                padding: '0 2rem',
                borderRadius: 8,
                border: 'none',
                background: '#412778',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#35206a')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#412778')}
            >
              {t.goHome}
            </a>
            <button
              onClick={() => window.history.back()}
              style={{
                height: 44,
                padding: '0 2rem',
                borderRadius: 8,
                border: '1.5px solid #e4e4e7',
                background: '#fff',
                color: '#18181b',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#f4f4f5')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
            >
              {t.goBack}
            </button>
          </div>

          <p style={{ fontSize: 12, color: '#a1a1aa', marginTop: '1.5rem', fontFamily: 'monospace' }}>
            {t.errorCode}: <span style={{ fontWeight: 600 }}>404 NOT_FOUND</span>
          </p>
        </div>
      </div>
    </div>
  );
}
