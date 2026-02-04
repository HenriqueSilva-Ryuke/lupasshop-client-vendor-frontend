import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Disable automatic locale detection to use URL locale
  localeDetection: false
});

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/orders', '/profile', '/settings'];

// Routes only for sellers
const sellerRoutes = ['/dashboard/stores', '/dashboard/products'];

// Admin routes
const adminRoutes = ['/admin'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // First, run internationalization middleware
  const response = intlMiddleware(request);
  
  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  const isSellerRoute = sellerRoutes.some(route => pathname.includes(route));
  const isAdminRoute = adminRoutes.some(route => pathname.includes(route));
  
  // Get auth token from cookie or localStorage (server-side we use cookies)
  const authCookie = request.cookies.get('auth-storage');
  
  if (isProtectedRoute || isSellerRoute || isAdminRoute) {
    if (!authCookie) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Parse auth data from cookie
    try {
      const authData = JSON.parse(authCookie.value);
      const { state } = authData;
      
      if (!state?.isAuthenticated || !state?.user) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
      
      // Check role-based access
      if (isSellerRoute && state.user.role !== 'SELLER' && state.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
      if (isAdminRoute && state.user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // If error parsing auth cookie, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*|icon-.*|manifest.webmanifest).*)']
};