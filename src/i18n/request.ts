import { getRequestConfig } from 'next-intl/server';
import { loadMessages } from '../lib/messages';

// Can be imported from a shared config
export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    locale = 'en';
  }

  const messages = await loadMessages(locale as string);

  return {
    locale: locale as string,
    messages
  };
});