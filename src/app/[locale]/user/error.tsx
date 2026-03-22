'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function UserError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg shadow-sm border mt-8">
      <h2 className="text-2xl font-bold text-destructive mb-4">
        {t('somethingWentWrong') || 'Algo deu errado'}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || 'Ocorreu um erro inesperado.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        {t('tryAgain') || 'Tentar novamente'}
      </button>
    </div>
  );
}
