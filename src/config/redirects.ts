/**
 * Redirect Configuration
 * Gerencia redirects 301 para URLs antigas ou mudanças de estrutura
 */

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Redirects 301 (permanentes)
 * Use para URLs que mudaram definitivamente
 */
export const permanentRedirects: RedirectRule[] = [
  // Exemplos de redirects comuns:
  // {
  //   source: '/old-page',
  //   destination: '/new-page',
  //   permanent: true,
  // },
  // {
  //   source: '/products/:slug',
  //   destination: '/p/:slug',
  //   permanent: true,
  // },
  // {
  //   source: '/loja/:slug',
  //   destination: '/stores/:slug',
  //   permanent: true,
  // },
];

/**
 * Redirects 302 (temporários)
 * Use para redirecionamentos temporários
 */
export const temporaryRedirects: RedirectRule[] = [
  // Exemplos:
  // {
  //   source: '/maintenance',
  //   destination: '/',
  //   permanent: false,
  // },
];

/**
 * Verifica se uma URL precisa de redirect
 */
export function findRedirect(pathname: string): RedirectRule | null {
  const allRedirects = [...permanentRedirects, ...temporaryRedirects];
  
  for (const redirect of allRedirects) {
    // Match exato
    if (redirect.source === pathname) {
      return redirect;
    }
    
    // Match com parâmetros dinâmicos
    const sourceRegex = new RegExp(
      '^' + redirect.source.replace(/:[^/]+/g, '([^/]+)') + '$'
    );
    
    if (sourceRegex.test(pathname)) {
      const matches = pathname.match(sourceRegex);
      if (matches) {
        let destination = redirect.destination;
        const params = redirect.source.match(/:[^/]+/g) || [];
        
        params.forEach((param, index) => {
          destination = destination.replace(param, matches[index + 1]);
        });
        
        return {
          ...redirect,
          destination,
        };
      }
    }
  }
  
  return null;
}

/**
 * Configuração para Next.js config
 */
export const nextConfigRedirects = [
  ...permanentRedirects,
  ...temporaryRedirects,
];
