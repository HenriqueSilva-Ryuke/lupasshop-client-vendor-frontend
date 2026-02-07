'use client';

import { useEffect } from 'react';

/**
 * Inline SVG illustration for global-error — can't import components here
 * because global-error.tsx replaces the entire <html>, so no providers or
 * design-system context is available.
 */
function InlineErrorIllustration() {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56 h-auto mx-auto" aria-hidden="true">
      <ellipse cx="140" cy="180" rx="120" ry="28" fill="#f5f0ff" />
      <rect x="88" y="80" width="104" height="100" rx="12" fill="#ede5ff" stroke="#c4a8ff" strokeWidth="2.5" />
      <path d="M118 80V64a22 22 0 0 1 44 0v16" stroke="#a775ff" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="124" cy="120" r="4" fill="#8b46f5" />
      <circle cx="156" cy="120" r="4" fill="#8b46f5" />
      <path d="M126 146c4-6 18-6 22 0" stroke="#8b46f5" strokeWidth="2.5" strokeLinecap="round" fill="none" transform="rotate(180 137 146)" />
      <g transform="translate(170, 30) rotate(25)">
        <circle cx="0" cy="0" r="28" stroke="#412778" strokeWidth="4" fill="#f5f0ff" fillOpacity="0.7" />
        <path d="M-6 -12 L2 0 L-4 10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M2 0 L10 -4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="20" y1="20" x2="40" y2="40" stroke="#412778" strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="50" r="16" fill="#ef4444" opacity="0.12" />
      <circle cx="60" cy="50" r="12" fill="#ef4444" opacity="0.2" />
      <text x="60" y="56" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ef4444">!</text>
      <circle cx="50" cy="160" r="3" fill="#ddd0ff" />
      <circle cx="230" cy="150" r="4" fill="#ddd0ff" />
      <circle cx="210" cy="170" r="2.5" fill="#c4a8ff" />
      <circle cx="70" cy="175" r="2" fill="#c4a8ff" />
    </svg>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#fafafa',
        }}>
          <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
            <InlineErrorIllustration />

            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#09090b', margin: '1.5rem 0 0.5rem' }}>
              Ops! Algo deu errado
            </h1>
            <p style={{ color: '#71717a', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              {isDev
                ? error.message
                : 'Encontramos um problema inesperado. Por favor, recarregue a página ou volte ao início.'}
            </p>

            {/* Dev-only error details */}
            {isDev && (
              <div style={{
                background: '#f4f4f5',
                border: '1px solid #e4e4e7',
                borderRadius: 12,
                padding: '1rem',
                textAlign: 'left',
                marginBottom: '1.5rem',
              }}>
                <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#ef4444', wordBreak: 'break-all', margin: 0 }}>
                  {error.message}
                </p>
                {error.digest && (
                  <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#71717a', marginTop: 8, marginBottom: 0 }}>
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
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
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#35206a')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#412778')}
              >
                Tentar novamente
              </button>
              <button
                onClick={() => (window.location.href = '/')}
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
                Voltar ao início
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
