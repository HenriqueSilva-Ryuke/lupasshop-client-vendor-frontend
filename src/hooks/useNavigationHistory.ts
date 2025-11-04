import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useNavigationHistory = () => {
  const router = useRouter();

  useEffect(() => {
    // Salvar a rota anterior no localStorage
    const handleNavigation = () => {
      const currentPath = window.location.pathname;
      const previousPath = localStorage.getItem('previous-path');
      
      if (previousPath !== currentPath) {
        localStorage.setItem('previous-path', currentPath);
      }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();

    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const goBack = () => {
    const previousPath = localStorage.getItem('previous-path');
    if (previousPath) {
      router.push(previousPath);
    } else {
      router.back();
    }
  };

  return { goBack };
};
