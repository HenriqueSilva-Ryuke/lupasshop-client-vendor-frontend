import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';
type Language = 'pt' | 'en';
type Currency = 'AKZ' | 'USD' | 'EUR';

interface UserPreferencesState {
  theme: Theme;
  language: Language;
  currency: Currency;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'pt',
      currency: 'AKZ',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'user-preferences-storage',
    }
  )
);
