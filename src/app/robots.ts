import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/[locale]', '/[locale]/about', '/[locale]/auth'],
        disallow: ['/api', '/.next', '/[locale]/user', '/[locale]/seller'],
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
