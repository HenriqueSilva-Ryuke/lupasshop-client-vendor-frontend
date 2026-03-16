export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export function getDashboardUrlByRole(locale: string, role?: UserRole): string {
  if (!role) {
    return `/${locale}/auth/login`;
  }

  switch (role) {
    case 'SELLER':
      return `/${locale}/seller/dashboard`;
    case 'ADMIN':
      return '/admin';
    case 'BUYER':
    default:
      return `/${locale}/user`;
  }
}

export function stripLocaleFromPath(pathname: string, locale: string): string {
  if (!pathname) return '/';
  const normalized = pathname.replace(`/${locale}`, '');
  return normalized || '/';
}

export function isLocaleRouteActive(pathname: string, href: string, locale: string): boolean {
  const currentPath = stripLocaleFromPath(pathname, locale);
  const hrefPath = stripLocaleFromPath(href, locale);
  return currentPath === hrefPath;
}
