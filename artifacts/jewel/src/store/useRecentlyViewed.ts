import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface RecentlyViewedState {
  items: Product[];
  addItem: (item: Product) => void;
}

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => 
        set((state) => {
          // Remove if exists
          const filtered = state.items.filter((i) => i.id !== item.id);
          // Add to front, keep max 6
          return { items: [item, ...filtered].slice(0, 6) };
        }),
    }),
    {
      name: 'lumiere-recently-viewed',
    }
  )
);
