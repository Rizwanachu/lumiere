import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search as SearchIcon, X } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useRecentlyViewed } from '@/store/useRecentlyViewed';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { items: recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('lumiere-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('lumiere-recent-searches', JSON.stringify(newRecent));
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('lumiere-recent-searches');
  };

  const searchResults = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.metal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative mb-16 group">
          <SearchIcon size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" strokeWidth={1.5} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewelry, metals, categories..."
            className="w-full bg-transparent border-b-2 border-border focus:border-foreground pl-10 pr-10 py-6 text-xl md:text-3xl font-serif outline-none transition-colors placeholder:text-muted-foreground/50 placeholder:font-sans placeholder:text-lg"
            autoFocus
          />
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          )}
        </form>

        {query.trim() === '' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Suggestions state */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Recent Searches</h3>
                  <button onClick={clearRecent} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
                </div>
                <ul className="space-y-4">
                  {recentSearches.map((s, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => setQuery(s)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        <SearchIcon size={14} /> {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <div className="mb-6 border-b border-border pb-2">
                <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Popular Categories</h3>
              </div>
              <ul className="space-y-4">
                <li><Link href="/shop?category=rings" className="font-serif text-xl hover:text-primary transition-colors">Gold Rings</Link></li>
                <li><Link href="/shop?category=necklaces" className="font-serif text-xl hover:text-primary transition-colors">Diamond Necklaces</Link></li>
                <li><Link href="/shop?category=earrings" className="font-serif text-xl hover:text-primary transition-colors">Pearl Earrings</Link></li>
                <li><Link href="/shop" className="font-serif text-xl hover:text-primary transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            
            {recentlyViewed.length > 0 && (
              <div className="col-span-1 md:col-span-2 mt-8">
                <div className="mb-8 border-b border-border pb-2">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Recently Viewed</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {recentlyViewed.slice(0, 4).map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results state */
          <div>
            <div className="mb-8 flex justify-between items-center text-sm border-b border-border pb-4">
              <span>Results for "{query}"</span>
              <span className="text-muted-foreground">{searchResults.length} {searchResults.length === 1 ? 'item' : 'items'}</span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="font-serif text-2xl mb-4">No results found</h3>
                <p className="text-muted-foreground mb-8">We couldn't find anything matching "{query}". Try checking your spelling or using different keywords.</p>
                <div className="flex justify-center gap-4">
                  <Link href="/shop">
                    <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium">
                      Shop All
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
