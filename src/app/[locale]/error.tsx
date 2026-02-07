'use client';

import { useEffect } from 'react';
import { Button } from '@lupa/design-system';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface ErrorProps {
 error: Error & { digest?: string };
 reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <svg
              className="h-12 w-12 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Algo deu errado
          </h1>
          <p className="text-muted-foreground">
            Ocorreu um erro inesperado ao carregar esta página.
          </p>
        </div>

        {/* Error details (only in dev) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <p className="text-xs font-mono text-muted-foreground break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                ID: {error.digest}
              </p>
            )}
            {error.stack && (
              <pre className="text-xs text-muted-foreground mt-2 overflow-x-auto max-h-32">
                {error.stack}
              </pre>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="w-full sm:w-auto"
          >
            Tentar novamente
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Voltar
          </Button>
        </div>

        {/* Help text */}
        <p className="text-sm text-muted-foreground">
          Se o problema persistir, entre em contato com o{' '}
          <a
            href="mailto:suporte@lupashop.com"
            className="text-primary hover:underline"
          >
            suporte
          </a>
        </p>
      </div>
    </div>
  );
}
