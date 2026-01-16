import fs from 'fs';
import path from 'path';

export async function loadMessages(locale: string) {
  const messagesDir = path.join(process.cwd(), 'messages');

  // Validate locale against supported locales to avoid treating asset paths
  // or other unexpected values (like "icon-192.png") as locales.
  const supportedLocales = ['en', 'pt'];
  const effectiveLocale = supportedLocales.includes(locale) ? locale : 'en';
  if (effectiveLocale !== locale) {
    console.warn(`loadMessages: unsupported locale "${locale}" - falling back to "${effectiveLocale}"`);
  }

  // Define the sections we want to load
  // Add all message namespaces that should be available to the app. If a section
  // is missing here its translation keys will not be loaded, which causes
  // next-intl to fall back to raw key names on the page.
  const sections = [
    'navbar',
    'hero',
    'home',
    'features',
    'benefits',
    'cta',
    'footer',
    'about',
    'dashboard',
    'auth',
    'stores',
    'marketplace'
  ];

  const messages: Record<string, any> = {};

  // Load each section for the validated locale
  for (const section of sections) {
    try {
      const sectionPath = path.join(messagesDir, section, `${effectiveLocale}.json`);
      if (fs.existsSync(sectionPath)) {
        const sectionMessages = JSON.parse(fs.readFileSync(sectionPath, 'utf-8'));
        messages[section] = sectionMessages;
      }
    } catch (error) {
      console.warn(`Failed to load ${section} messages for locale ${effectiveLocale}:`, error);
    }
  }

  return messages;
}