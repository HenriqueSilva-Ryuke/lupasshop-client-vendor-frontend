import { getRequestConfig } from 'next-intl/server';
import { loadMessages } from '../lib/messages';

// Can be imported from a shared config
export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  console.log('getRequestConfig called with locale:', locale);
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  console.log('Loading messages for locale:', locale);
  const messages = await loadMessages(locale as string);
  console.log('Messages keys:', Object.keys(messages));

  return {
    locale: locale as string,
    messages
  };
});