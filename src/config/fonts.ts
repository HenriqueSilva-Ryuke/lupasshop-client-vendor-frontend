/**
 * Font Optimization
 * Configuração otimizada de fontes
 */

// Keep the same shape expected by layout.tsx without requiring remote font fetches.
export const inter = {
  variable: '--font-inter',
};

export const roboto = {
  variable: '--font-roboto',
};

/**
 * Uso:
 * - Adicione no layout.tsx: className={`${inter.variable} ${roboto.variable}`}
 * - Use no Tailwind: font-sans (Inter) ou font-roboto
 */
