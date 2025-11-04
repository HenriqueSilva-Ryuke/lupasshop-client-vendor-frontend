import fs from 'fs';
import path from 'path';

export async function loadMessages(locale: string) {
  const messagesDir = path.join(process.cwd(), 'messages');

  // Define the sections we want to load
  const sections = ['navbar', 'hero', 'features', 'benefits', 'cta', 'footer', 'about'];

  const messages: Record<string, any> = {};

  // Load each section
  for (const section of sections) {
    try {
      const sectionPath = path.join(messagesDir, section, `${locale}.json`);
      if (fs.existsSync(sectionPath)) {
        const sectionMessages = JSON.parse(fs.readFileSync(sectionPath, 'utf-8'));
        messages[section] = sectionMessages;
      }
    } catch (error) {
      console.warn(`Failed to load ${section} messages for locale ${locale}:`, error);
    }
  }

  return messages;
}