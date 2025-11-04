import { Metadata } from 'next';
import { getSEOConfig } from '../../lib/seo';

export async function generateHomeMetadata(locale: string = 'en'): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com';
  const seoConfig = getSEOConfig('home', locale);
  const localePath = locale === 'en' ? '' : locale;
  const url = localePath ? `${baseUrl}/${locale}` : baseUrl;

  const localeFormatted = locale === 'pt' ? 'pt_BR' : 'en_US';

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    openGraph: {
      type: 'website',
      locale: localeFormatted,
      url,
      siteName: 'LupaShop',
      title: seoConfig.ogTitle,
      description: seoConfig.ogDescription,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: seoConfig.ogTitle,
          type: 'image/png',
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: seoConfig.twitterCard || seoConfig.title,
      description: seoConfig.description,
      images: [`${baseUrl}/og-image.png`],
      creator: seoConfig.twitterCreator,
      site: seoConfig.twitterSite,
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': `${baseUrl}/en`,
        'pt-BR': `${baseUrl}/pt`,
        'x-default': baseUrl,
      }
    },
    robots: seoConfig.robots,
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: 'LupaShop',
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'LupaShop',
    },
    metadataBase: new URL(baseUrl),
  };
}
