import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'wouter';
import { useCart } from '@/store/useCart';
import { proxyImg } from '@/lib/imgProxy';

export function CartDrawer() {
  const { items, isOpen, toggleOpen, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shippingThreshold = 150;
  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);
  const remaining = Math.max(shippingThreshold - subtotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOpen}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-2xl z-50 flex flex-col border-l border-border"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl tracking-wide">Your Bag</h2>
              <button onClick={toggleOpen} className="p-2 -mr-2 hover:opacity-70 transition-opacity">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-6 bg-secondary/50 border-b border-border">
              <div className="text-sm mb-2 text-center">
                {remaining > 0 ? (
                  <>You are <strong>${remaining}</strong> away from free shipping.</>
                ) : (
                  <>You have unlocked <strong>free shipping!</strong></>
                )}
              </div>
              <div className="h-1 bg-border w-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <p className="mb-4">Your bag is currently empty.</p>
                  <Link href="/shop" onClick={toggleOpen}>
                    <button className="bg-foreground text-background uppercase tracking-[0.12em] text-[11px] px-8 py-3 font-medium hover:opacity-90 transition-opacity">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <Link href={`/product/${item.product.slug}`} onClick={toggleOpen} className="w-24 h-32 flex-shrink-0 bg-secondary rounded-xl overflow-hidden">
                      <img 
                        src={proxyImg(item.product.images[0])} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.slug}`} onClick={toggleOpen} className="font-serif hover:underline">
                          {item.product.name}
                        </Link>
                        <span className="font-medium text-sm">
                          ${(item.product.salePrice || item.product.price) * item.quantity}
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-auto space-y-1">
                        <p>{item.product.metal}</p>
                        {item.size && <p>Size: {item.size}</p>}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border">
                          <button 
                            className="p-2 hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="px-4 text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="p-2 hover:bg-secondary transition-colors"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button 
                          className="text-muted-foreground hover:text-destructive transition-colors p-2 -mr-2"
                          onClick={() => removeItem(item.product.id, item.size)}
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background">
                <div className="flex justify-between mb-6 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={toggleOpen}>
                  <button className="w-full bg-foreground text-background uppercase tracking-[0.12em] text-[11px] py-4 font-medium hover:opacity-90 transition-opacity">
                    Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
