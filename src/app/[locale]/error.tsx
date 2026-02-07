'use client';

import { useEffect } from 'react';
import { Button } from '@lupa/design-system';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ErrorIllustration, EmptyState } from '@/components/ErrorIllustration';

interface ErrorProps {
 error: Error & { digest?: string };
 reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const t = useTranslations('error.error');

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <EmptyState
        illustration={<ErrorIllustration className="w-64 h-auto" />}
        title={t('title')}
        description={
          isDev
            ? error.message
            : t('description')
        }
      >
        {/* Dev-only error details */}
        {isDev && (
          <div className="bg-muted/60 rounded-xl border border-border p-4 text-left max-w-lg w-full mb-4">
            <p className="text-xs font-mono text-destructive break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-[11px] text-muted-foreground mt-2 font-mono">
                {t('digest')}: {error.digest}
              </p>
            )}
            {error.stack && (
              <pre className="text-[11px] text-muted-foreground mt-2 overflow-x-auto max-h-28 font-mono whitespace-pre-wrap">
                {error.stack}
              </pre>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={reset} variant="default" size="lg">
            {t('tryAgain')}
          </Button>
          <Button onClick={() => router.back()} variant="outline" size="lg">
            {t('goBack')}
          </Button>
        </div>
      </EmptyState>
    </div>
  );
}
