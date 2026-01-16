"use client";

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
};

export default function IntlProviderClient({ children, locale, messages }: Props) {
  // Use an explicit client-side default timeZone to avoid ENVIRONMENT_FALLBACK
  // issues when rendering on different machines/environments.
  const timeZone = process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC';

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
