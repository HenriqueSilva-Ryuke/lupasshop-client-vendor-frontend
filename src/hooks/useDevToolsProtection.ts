import { useEffect } from 'react';

export const useDevToolsProtection = () => {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isEnabled = process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS_PROTECTION === 'true';

    // Avoid disruptive reload loops during development and keep this behavior opt-in.
    if (!isProduction || !isEnabled) {
      return;
    }

    let devToolsOpenCount = 0;
    const MAX_ATTEMPTS = 5;
    let isBlocked = false;

    const checkDevTools = () => {
      if (isBlocked) return;

      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        devToolsOpenCount++;

        if (devToolsOpenCount >= MAX_ATTEMPTS) {
          isBlocked = true;
          localStorage.setItem('devtools-blocked', 'true');
          window.location.reload();
        }
      }
    };

    // Verificar se está bloqueado
    if (localStorage.getItem('devtools-blocked') === 'true') {
      isBlocked = true;
      return;
    }

    // Verificar via F12, Ctrl+Shift+I, Cmd+Option+I
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBlocked) {
        e.preventDefault();
        return;
      }

      if (
        (e.key === 'F12') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.metaKey && e.altKey && e.key === 'I')
      ) {
        e.preventDefault();
        devToolsOpenCount++;

        if (devToolsOpenCount >= MAX_ATTEMPTS) {
          isBlocked = true;
          localStorage.setItem('devtools-blocked', 'true');
          window.location.reload();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(checkDevTools, 500);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);
};
