/**
 * Font Optimization
 * Configuração otimizada de fontes
 */

import { Inter, Roboto } from 'next/font/google';

// Font principal com subset otimizado
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

// Font secundária
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
});

/**
 * Uso:
 * - Adicione no layout.tsx: className={`${inter.variable} ${roboto.variable}`}
 * - Use no Tailwind: font-sans (Inter) ou font-roboto
 */
