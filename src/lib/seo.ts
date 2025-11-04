export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  twitterSite?: string;
  canonical?: string;
  robots?: string;
  author?: string;
  locale?: string;
  type?: 'website' | 'article' | 'product' | 'profile';
}

export const DEFAULT_SEO: SEOConfig = {
  title: 'LupaShop - Seller Platform for Independent Stores',
  description:
    'The integrated e-commerce platform where multiple independent stores come together in one digital space. Manage your shop, products, orders, and finances in one place.',
  keywords: [
    'e-commerce',
    'seller platform',
    'online store',
    'independent stores',
    'shop management',
    'dropshipping',
    'multi-store',
    'marketplace',
  ],
  ogTitle: 'LupaShop - Sell Online Easily',
  ogDescription:
    'The integrated e-commerce platform where multiple independent stores come together in one digital space.',
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/og-image.png`,
  twitterCard: 'summary_large_image',
  twitterSite: '@lupashop',
  twitterCreator: '@lupashop',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  author: 'LupaShop',
  locale: 'en_US',
  type: 'website',
};

export const SEO_PAGES: Record<string, SEOConfig> = {
  'home': {
    title: 'LupaShop - Sell Online with Multiple Stores',
    description:
      'Join LupaShop and start selling online today. Manage multiple independent stores in one integrated platform.',
    keywords: [
      'sell online',
      'ecommerce platform',
      'multi-store selling',
      'independent sellers',
      'online business',
    ],
    ogTitle: 'LupaShop - Your Multi-Store E-commerce Platform',
    ogDescription: 'Start selling online with LupaShop. Manage multiple stores easily.',
    type: 'website',
  },
  'about': {
    title: 'About LupaShop - Our Mission & Vision',
    description:
      'Learn about LupaShop, the integrated e-commerce platform connecting independent stores worldwide.',
    keywords: [
      'about lupashop',
      'ecommerce company',
      'seller platform',
      'multi-store solution',
    ],
    ogTitle: 'About LupaShop',
    ogDescription: 'Discover LupaShop story and mission to empower independent sellers.',
    type: 'website',
  },
  'login': {
    title: 'Login to LupaShop - Manage Your Store',
    description: 'Sign in to your LupaShop account to manage your store, products, and orders.',
    keywords: ['login', 'sign in', 'lupashop account', 'seller dashboard'],
    robots: 'noindex, follow',
  },
  'register': {
    title: 'Join LupaShop - Create Your Store',
    description:
      'Start your online business journey. Create a LupaShop account and begin selling today.',
    keywords: [
      'sign up',
      'create account',
      'join lupashop',
      'start selling',
      'register store',
    ],
    type: 'website',
  },
  'forgot-password': {
    title: 'Reset Password - LupaShop',
    description: 'Forgot your password? Reset your LupaShop account password here.',
    keywords: ['password reset', 'forgot password', 'account recovery'],
    robots: 'noindex, follow',
  },
  'reset-password': {
    title: 'Create New Password - LupaShop',
    description: 'Create a new password for your LupaShop account.',
    keywords: ['password reset', 'new password', 'account security'],
    robots: 'noindex, follow',
  },
};

export function getSEOConfig(page: string, locale: string = 'en'): Partial<SEOConfig> {
  const pageSEO = SEO_PAGES[page];
  const localeCode = locale === 'pt' ? 'pt_BR' : 'en_US';

  return {
    ...DEFAULT_SEO,
    ...pageSEO,
    locale: localeCode,
  };
}
