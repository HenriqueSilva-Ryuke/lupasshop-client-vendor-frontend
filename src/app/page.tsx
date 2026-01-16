import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to default locale marketplace to ensure NextIntl provider
  // is mounted from the locale layout and translations are available.
  redirect('/en/marketplace');
}
