import { create } from 'zustand';

interface HomeState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));