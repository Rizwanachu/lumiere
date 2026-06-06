import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function ShopPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get('category');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['rings', 'necklaces', 'earrings', 'bracelets'];
  const metals = ['14k Gold', '18k Gold', 'Sterling Silver', 'Platinum'];

  const toggleFilter = (type: 'category' | 'metal', value: string) => {
    if (type === 'category') {
      setSelectedCategories(prev => 
        prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
      );
    } else {
      setSelectedMetals(prev => 
        prev.includes(value) ? prev.filter(m => m !== value) : [...prev, value]
      );
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
  };

  // Filter and Sort Logic
  let filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const metalMatch = selectedMetals.length === 0 || selectedMetals.includes(product.metal);
    return categoryMatch && metalMatch;
  });

  if (sortOption === 'price-low') {
    filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortOption === 'price-high') {
    filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else if (sortOption === 'newest') {
    filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const activeFilterCount = selectedCategories.length + selectedMetals.length;

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-4">Category</h4>
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 border border-border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-foreground border-foreground' : 'group-hover:border-foreground'}`}>
                {selectedCategories.includes(cat) && <span className="w-2 h-2 bg-background" />}
              </div>
              <span className="text-sm capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] uppercase tracking-[0.15em] font-medium mb-4">Metal</h4>
        <div className="space-y-3">
          {metals.map(metal => (
            <label key={metal} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 border border-border flex items-center justify-center transition-colors ${selectedMetals.includes(metal) ? 'bg-foreground border-foreground' : 'group-hover:border-foreground'}`}>
                {selectedMetals.includes(metal) && <span className="w-2 h-2 bg-background" />}
              </div>
              <span className="text-sm">{metal}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">
            {selectedCategories.length === 1 ? <span className="capitalize">{selectedCategories[0]}</span> : 'All Fine Jewelry'}
          </h1>
          <p className="text-muted-foreground">
            Explore our collection of solid gold, platinum, and sterling silver pieces.
          </p>
        </div>

        {/* Desktop Tools & Active Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-y border-border py-4">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] font-medium"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter size={16} strokeWidth={1.5} />
              Filter
              {activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
            
            <span className="text-sm text-muted-foreground hidden md:block">
              {filteredProducts.length} Results
            </span>
          </div>

          <div className="flex items-center gap-4 relative ml-auto w-full md:w-auto">
             <div className="flex items-center text-[11px] uppercase tracking-[0.15em] font-medium w-full md:w-auto justify-between md:justify-start">
               <span className="md:mr-3">Sort By</span>
               <div className="relative group">
                 <select 
                   className="appearance-none bg-transparent outline-none pr-6 cursor-pointer"
                   value={sortOption}
                   onChange={(e) => setSortOption(e.target.value)}
                 >
                   <option value="featured">Featured</option>
                   <option value="newest">Newest</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                 </select>
                 <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
               </div>
             </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => toggleFilter('category', cat)}
                className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-xs capitalize hover:bg-muted transition-colors rounded-full"
              >
                {cat} <X size={12} />
              </button>
            ))}
            {selectedMetals.map(metal => (
              <button 
                key={metal}
                onClick={() => toggleFilter('metal', metal)}
                className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-xs hover:bg-muted transition-colors rounded-full"
              >
                {metal} <X size={12} />
              </button>
            ))}
            <button 
              onClick={clearFilters}
              className="text-xs text-muted-foreground underline ml-2 hover:text-foreground"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterContent />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <h3 className="font-serif text-2xl mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-x-0 bottom-0 h-[85vh] bg-background z-50 lg:hidden flex flex-col rounded-t-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-[11px] uppercase tracking-[0.15em] font-medium">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-border flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="flex-1 py-4 border border-border text-[11px] uppercase tracking-[0.12em] font-medium"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.12em] font-medium"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
