import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isCartDrawerOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  toggleSidebar: () => void;
  toggleCartDrawer: () => void;
  toggleMobileMenu: () => void;
  toggleSearch: () => void;
  closeSidebar: () => void;
  closeCartDrawer: () => void;
  closeMobileMenu: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isCartDrawerOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
