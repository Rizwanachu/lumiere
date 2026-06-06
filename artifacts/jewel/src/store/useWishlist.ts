import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (productId: string) => void;
  toggle: (item: Product) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => 
        set((state) => ({
          items: state.items.some((i) => i.id === item.id) 
            ? state.items 
            : [...state.items, item]
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId)
        })),
      toggle: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.id === item.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...items, item] });
        }
      },
      hasItem: (productId) => {
        return get().items.some((i) => i.id === productId);
      }
    }),
    {
      name: 'lumiere-wishlist',
    }
  )
);
