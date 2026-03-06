import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  storeId: string;
  storeName: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stockQuantity: number;
}

// Shape returned by the backend cart query
interface BackendCartItem {
  id: string;
  productId: string;
  storeId: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stockQuantity: number;
    store?: {
      id: string;
      name: string;
    };
  };
}

interface BackendCart {
  id: string;
  userId: string;
  items: BackendCartItem[];
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  clearStoreCart: (storeId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getStoreItems: (storeId: string) => CartItem[];
  getStoreTotal: (storeId: string) => number;
  /** Sync local cart state with the backend cart response */
  syncFromBackend: (backendCart: BackendCart | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.productId === item.productId
        );

        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, item.stockQuantity) }
                : i
            ),
          };
        }

        return {
          items: [...state.items, { ...item, id: `${item.productId}-${Date.now()}` }],
        };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter((item) => item.id !== id) };
        }

        return {
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.stockQuantity) }
              : item
          ),
        };
      }),

      clearCart: () => set({ items: [] }),

      clearStoreCart: (storeId) => set((state) => ({
        items: state.items.filter((item) => item.storeId !== storeId),
      })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getStoreItems: (storeId) => {
        return get().items.filter((item) => item.storeId === storeId);
      },

      getStoreTotal: (storeId) => {
        return get().items
          .filter((item) => item.storeId === storeId)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },

      syncFromBackend: (backendCart) => {
        if (!backendCart || !backendCart.items?.length) {
          return; // Don't clear local cart if backend returns empty (may not be synced yet)
        }

        const items: CartItem[] = backendCart.items
          .filter((item) => item.product)
          .map((item) => ({
            id: item.id,
            productId: item.productId,
            storeId: item.storeId,
            storeName: item.product?.store?.name ?? '',
            name: item.product?.name ?? '',
            price: item.product?.price ?? 0,
            quantity: item.quantity,
            image: item.product?.images?.[0] ?? '',
            stockQuantity: item.product?.stockQuantity ?? 0,
          }));

        set({ items });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
