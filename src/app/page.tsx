"use server";
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // Check if Portuguese is preferred
  const isPortuguese = acceptLanguage.toLowerCase().startsWith('pt');

  redirect(isPortuguese ? '/pt' : '/en');
}
