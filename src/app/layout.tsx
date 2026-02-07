import type { Metadata } from "next";
import "./globals.css";
import { DEFAULT_SEO } from "@/lib/seo";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { inter, roboto } from "@/config/fonts";

// Disable static rendering
export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com';

export const metadata: Metadata = {
 title: {
 template: "%s | LupaShop",
 default: DEFAULT_SEO.title,
 },
 description: DEFAULT_SEO.description,
 keywords: DEFAULT_SEO.keywords,
 authors: [{ name: DEFAULT_SEO.author }],
 creator: DEFAULT_SEO.author,
 publisher: DEFAULT_SEO.author,
 robots: DEFAULT_SEO.robots,
 metadataBase: new URL(baseUrl),
 alternates: {
 canonical: baseUrl,
 languages: {
 'en-US': `${baseUrl}/en`,
 'pt-BR': `${baseUrl}/pt`,
 },
 },
 openGraph: {
 type: 'website',
 locale: 'en_US',
 alternateLocale: ['pt_BR'],
 url: baseUrl,
 siteName: 'LupaShop',
 title: DEFAULT_SEO.ogTitle || DEFAULT_SEO.title,
 description: DEFAULT_SEO.ogDescription || DEFAULT_SEO.description,
 images: [{
 url: DEFAULT_SEO.ogImage || `${baseUrl}/og-image.png`,
 width: 1200,
 height: 630,
 alt: 'LupaShop - E-commerce Platform',
 }],
 },
 twitter: {
 card: 'summary_large_image',
 site: DEFAULT_SEO.twitterSite,
 creator: DEFAULT_SEO.twitterCreator,
 title: DEFAULT_SEO.ogTitle || DEFAULT_SEO.title,
 description: DEFAULT_SEO.ogDescription || DEFAULT_SEO.description,
 images: [DEFAULT_SEO.ogImage || `${baseUrl}/og-image.png`],
 },
 appleWebApp: {
 capable: true,
 statusBarStyle: 'black-translucent',
 title: DEFAULT_SEO.title,
 },
 formatDetection: {
 telephone: false,
 },
 verification: {
 google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
 },
};

export default function RootLayout({
 children
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
 <head>
 {/* JSON-LD Structured Data */}
 <JsonLd data={[generateOrganizationSchema(), generateWebsiteSchema()]} />

 {/* Material Symbols Outlined Font */}
 <link
 rel="stylesheet"
 href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
 />

 {/* DNS Prefetch & Preconnect for performance */}
 <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'} />

 {/* DNS Prefetch for third-party services */}
 <link rel="dns-prefetch" href="https://www.google-analytics.com" />
 <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
 </head>
 <body className="antialiased">
 {children}
 <ThirdPartyScripts
 googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
 facebookPixelId={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
 />
 </body>
 </html>
 );
}
