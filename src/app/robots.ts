import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/[locale]', '/[locale]/about', '/[locale]/auth'],
        disallow: ['/[locale]/dashboard', '/api', '/.next'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/sitemap.xml`,
  };
}
