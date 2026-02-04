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
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
