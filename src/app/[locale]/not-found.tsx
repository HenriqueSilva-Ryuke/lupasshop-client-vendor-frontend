'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@lupa/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotFoundIllustration } from '@/components/NotFoundIllustration';
import { EmptyState } from '@/components/ErrorIllustration';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('error.notFound');
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <EmptyState
        illustration={<NotFoundIllustration className="w-72 h-auto" />}
        title={t('title')}
        description={t('description')}
      >
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button asChild variant="default" size="lg">
            <Link href={`/${locale}`}>
              {t('goHome')}
            </Link>
          </Button>
          <Button onClick={() => router.back()} variant="outline" size="lg">
            {t('goBack')}
          </Button>
        </div>

        {/* Error code */}
        <p className="text-xs text-muted-foreground mt-6 font-mono">
          {t('errorCode')}: <span className="font-semibold">404 NOT_FOUND</span>
        </p>
      </EmptyState>
    </div>
  );
}
