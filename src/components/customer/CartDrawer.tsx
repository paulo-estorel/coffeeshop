import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Coffee } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    cartCount,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    settings,
    setActiveTab
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryDiff = Math.max(0, settings.freeDeliveryThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div
        className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#EFE8DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EFE8DC] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#2B1810] flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                Your Coffee Cart
              </h3>
              <p className="text-xs text-[#6F4E37]">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            id="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-[#6F4E37] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-[#EFE8DC]/80 px-5 py-2.5 border-b border-[#E6DAC8] text-xs">
          {freeDeliveryDiff === 0 ? (
            <span className="text-[#3D5A45] font-semibold flex items-center gap-1.5">
              🎉 Congratulations! You qualify for Free Metro Manila Delivery!
            </span>
          ) : (
            <span className="text-[#6F4E37]">
              Add <strong className="text-[#2B1810]">₱{freeDeliveryDiff}</strong> more for Free Delivery
            </span>
          )}
          <div className="w-full bg-[#DFD5C4] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-[#3D5A45] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#8B5A2B] mx-auto">
                <Coffee className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2B1810]">
                Your cart is empty
              </h4>
              <p className="text-xs text-[#6F4E37] max-w-xs mx-auto">
                Discover our signature Spanish Latte, handcrafted frappes, and oven-warm croissants.
              </p>
              <button
                id="empty-cart-browse-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('menu');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold shadow-xs hover:bg-[#5C3A21] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-[#EFE8DC] shadow-2xs space-y-2.5"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#F4EFEA]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-bold text-[#2B1810] truncate">
                        {item.name}
                      </h4>
                      <span className="font-serif text-sm font-bold text-[#2B1810] shrink-0">
                        ₱{item.unitPrice * item.quantity}
                      </span>
                    </div>

                    {/* Options pills */}
                    <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-[#8B5A2B]">
                      {item.options.temperature && (
                        <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E6DAC8]">
                          {item.options.temperature}
                        </span>
                      )}
                      {item.options.size && (
                        <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E6DAC8]">
                          {item.options.size}
                        </span>
                      )}
                      {item.options.sweetness && (
                        <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E6DAC8]">
                          {item.options.sweetness} sweet
                        </span>
                      )}
                      {item.options.milk && item.options.milk !== 'Regular Milk' && (
                        <span className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E6DAC8]">
                          {item.options.milk}
                        </span>
                      )}
                    </div>

                    {item.options.addOns && item.options.addOns.length > 0 && (
                      <p className="text-[10px] text-[#6F4E37] mt-1 italic">
                        + {item.options.addOns.join(', ')}
                      </p>
                    )}

                    {item.options.specialInstructions && (
                      <p className="text-[10px] text-[#3D5A45] mt-0.5">
                        Note: &ldquo;{item.options.specialInstructions}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity and Delete row */}
                <div className="pt-2 border-t border-[#F4EFEA] flex items-center justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[11px] text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <div className="flex items-center gap-2 bg-[#FAF8F5] px-2 py-1 rounded-lg border border-[#E6DAC8]">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white text-[#2B1810] border border-[#E6DAC8] flex items-center justify-center hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-xs text-[#2B1810]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-white text-[#2B1810] border border-[#E6DAC8] flex items-center justify-center hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with subtotal and checkout button */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EFE8DC] space-y-4">
            <div className="space-y-1.5 text-xs text-[#6F4E37]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#2B1810] text-sm">₱{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Metro Manila Delivery</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F4EFEA] flex items-center justify-between">
              <span className="font-serif text-base font-bold text-[#2B1810]">
                Estimated Total:
              </span>
              <span className="font-serif text-xl font-bold text-[#6F4E37]">
                ₱{cartSubtotal}
              </span>
            </div>

            <button
              id="proceed-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-[#6F4E37] hover:bg-[#5C3A21] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-[#A89887] hover:text-[#2B1810] transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
