import { NextIntlClientProvider } from 'next-intl';
import { loadMessages } from '../../lib/messages';
import PageTransition from '../../components/PageTransition';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Resolve params if it's a promise (Next passes a Promise in some contexts)
  const resolvedParams = (params as any).then ? await params : params;
  const locale = (resolvedParams && (resolvedParams as any).locale) || 'en';

  // Load messages from organized folder structure
  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PageTransition>
        {children}
      </PageTransition>
    </NextIntlClientProvider>
  );
}