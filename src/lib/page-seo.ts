import { Metadata } from 'next';
import { getSEOConfig } from '@/lib/seo';

interface PageSEOProps {
  page: string;
  locale: string;
  customTitle?: string;
  customDescription?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com';

export async function generatePageMetadata(props: PageSEOProps): Promise<Metadata> {
  const seoConfig = getSEOConfig(props.page, props.locale);
  const isPortuguese = props.locale === 'pt';

  const title = props.customTitle || (seoConfig.title as string);
  const description = props.customDescription || (seoConfig.description as string);

  return {
    title,
    description,
    keywords: seoConfig.keywords,
    robots: seoConfig.robots,
    openGraph: {
      type: (seoConfig.type as any) || 'website',
      locale: isPortuguese ? 'pt_BR' : 'en_US',
      url: `${baseUrl}/${props.locale}/${props.page === 'home' ? '' : props.page}`,
      siteName: 'LupaShop',
      title: seoConfig.ogTitle || title,
      description: seoConfig.ogDescription || description,
      images: [{
        url: seoConfig.ogImage || `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LupaShop',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoConfig.ogTitle || title,
      description: seoConfig.ogDescription || description,
      creator: seoConfig.twitterCreator,
      site: seoConfig.twitterSite,
    },
    alternates: {
      canonical: `${baseUrl}/${props.locale}/${props.page === 'home' ? '' : props.page}`,
    },
  };
}
