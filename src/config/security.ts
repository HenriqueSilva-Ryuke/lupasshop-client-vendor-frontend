/**
 * Content Security Policy Configuration
 * Proteção contra XSS e outros ataques
 */

export const cspConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'", // Next.js precisa disso em dev
    "'unsafe-inline'", // Pode ser removido com nonce
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Tailwind CSS inline styles
    'https://fonts.googleapis.com',
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:',
    'https://res.cloudinary.com', // Se usar Cloudinary
  ],
  'font-src': [
    "'self'",
    'data:',
    'https://fonts.gstatic.com',
  ],
  'connect-src': [
    "'self'",
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    'https://www.google-analytics.com',
  ],
  'frame-src': [
    "'self'",
    // Adicione domínios de pagamento se necessário
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': process.env.NODE_ENV === 'production' ? [] : undefined,
};

/**
 * Gera o header CSP
 */
export function generateCSP(): string {
  const csp = Object.entries(cspConfig)
    .filter(([_, value]) => value !== undefined)
    .map(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        return `${key} ${values.join(' ')}`;
      }
      return key;
    })
    .join('; ');

  return csp;
}

/**
 * Security Headers para Next.js
 */
export const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // CSP será adicionado em produção
  ...(process.env.NODE_ENV === 'production'
    ? [
        {
          key: 'Content-Security-Policy',
          value: generateCSP(),
        },
      ]
    : []),
];

/**
 * Configuração de cookies seguros
 */
export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 dias
};
