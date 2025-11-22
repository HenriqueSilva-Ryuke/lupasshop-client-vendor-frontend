import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { loadMessages } from '../../lib/messages';
import PageTransition from '../../components/PageTransition';
import { DEFAULT_SEO } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === 'pt';

  return {
    title: {
      template: `%s | LupaShop`,
      default: DEFAULT_SEO.title,
    },
    description: DEFAULT_SEO.description,
    keywords: DEFAULT_SEO.keywords,
    openGraph: {
      type: 'website',
      locale: isPortuguese ? 'pt_BR' : 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: 'LupaShop',
      title: DEFAULT_SEO.ogTitle,
      description: DEFAULT_SEO.ogDescription,
      images: [{
        url: DEFAULT_SEO.ogImage || `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LupaShop',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_SEO.ogTitle,
      description: DEFAULT_SEO.ogDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'pt': `${baseUrl}/pt`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await loadMessages(locale || 'en');

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: `${baseUrl}/${locale}` },
  ]);

  return (
    <NextIntlClientProvider locale={locale || 'en'} messages={messages}>
    <JsonLd data={breadcrumbSchema} />
      <PageTransition>
        {children}
      </PageTransition>
    </NextIntlClientProvider>
  );
}
