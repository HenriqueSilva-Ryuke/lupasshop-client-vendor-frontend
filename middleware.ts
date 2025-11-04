import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Disable automatic locale detection to use URL locale
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en)/:path*']
};