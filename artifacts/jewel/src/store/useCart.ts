import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
  metal?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  toggleOpen: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.product.id === item.product.id && i.size === item.size
          );
          
          if (existingItemIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems };
          }
          
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter((i) => !(i.product.id === productId && i.size === size))
        })),
      updateQuantity: (productId, quantity, size) =>
        set((state) => ({
          items: state.items.map((i) => 
            i.product.id === productId && i.size === size 
              ? { ...i, quantity: Math.max(1, quantity) } 
              : i
          )
        })),
      clearCart: () => set({ items: [] }),
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'lumiere-cart',
    }
  )
);
