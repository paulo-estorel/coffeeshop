import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { X, Plus, Minus, Check, Coffee, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useApp();

  const product = selectedProductForModal;

  // Options State
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [sweetness, setSweetness] = useState<'0%' | '25%' | '50%' | '100%'>('100%');
  const [milk, setMilk] = useState<'Regular Milk' | 'Oat Milk (+₱30)' | 'Almond Milk (+₱30)'>('Regular Milk');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize options when product changes
  useEffect(() => {
    if (product) {
      if (product.temperature === 'Iced') {
        setTemperature('Iced');
      } else if (product.temperature === 'Hot') {
        setTemperature('Hot');
      } else {
        setTemperature('Iced'); // default for Both
      }
      setSize('Regular');
      setSweetness('100%');
      setMilk('Regular Milk');
      setSelectedAddOns([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const isBeverage = product.category === 'Coffee' || product.category === 'Non-Coffee' || product.category === 'Frappe';

  // Add-on definitions
  const availableAddOns = [
    { id: 'Extra Espresso Shot (+₱35)', name: 'Extra Espresso Shot', price: 35, onlyFor: 'Coffee' },
    { id: 'Whipped Cream (+₱25)', name: 'Whipped Cream', price: 25, onlyFor: 'Any' },
    { id: 'Caramel Drizzle (+₱20)', name: 'Caramel Drizzle', price: 20, onlyFor: 'Any' },
    { id: 'Vanilla Syrup Shot (+₱25)', name: 'Vanilla Syrup Shot', price: 25, onlyFor: 'Any' },
  ];

  // Calculate Unit Price
  let unitPrice = product.price;
  if (size === 'Large') unitPrice += 25;
  if (milk === 'Oat Milk (+₱30)' || milk === 'Almond Milk (+₱30)') unitPrice += 30;

  selectedAddOns.forEach((addonId) => {
    const found = availableAddOns.find(a => a.id === addonId);
    if (found) unitPrice += found.price;
  });

  const totalItemPrice = unitPrice * quantity;

  const handleToggleAddOn = (addonId: string) => {
    if (selectedAddOns.includes(addonId)) {
      setSelectedAddOns(prev => prev.filter(id => id !== addonId));
    } else {
      setSelectedAddOns(prev => [...prev, addonId]);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      unitPrice: unitPrice,
      quantity: quantity,
      image: product.image,
      category: product.category,
      options: {
        temperature: product.temperature !== 'N/A' ? temperature : undefined,
        size: isBeverage ? size : undefined,
        sweetness: isBeverage ? sweetness : undefined,
        milk: isBeverage ? milk : undefined,
        addOns: selectedAddOns.length > 0 ? selectedAddOns : undefined,
        specialInstructions: specialInstructions.trim() ? specialInstructions.trim() : undefined
      }
    });
    setSelectedProductForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#EFE8DC] relative max-h-[90vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Close Button */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-[#2B1810] shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810] via-[#2B1810]/40 to-transparent" />
          
          <button
            id="close-product-modal-btn"
            onClick={() => setSelectedProductForModal(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E6DAC8] bg-[#6F4E37]/80 px-2.5 py-0.5 rounded-md">
              {product.category}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#FDFBF7]">
              {product.name}
            </h3>
            <p className="text-xs text-[#EFE8DC]/80 line-clamp-1 mt-0.5">
              {product.description}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#2B1810]">
          {/* Temperature Option (If applicable) */}
          {product.temperature === 'Both' && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Temperature Selection
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTemperature('Hot')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    temperature === 'Hot'
                      ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                      : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                  }`}
                >
                  <span>♨ Hot</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature('Iced')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    temperature === 'Iced'
                      ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                      : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                  }`}
                >
                  <span>❄ Iced</span>
                </button>
              </div>
            </div>
          )}

          {/* Size Option (For Beverages) */}
          {isBeverage && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Cup Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSize('Regular')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                    size === 'Regular'
                      ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                      : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                  }`}
                >
                  <span>Regular (12oz / 16oz)</span>
                  <span className="text-xs opacity-75">Base</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSize('Large')}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                    size === 'Large'
                      ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                      : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                  }`}
                >
                  <span>Large (16oz / 20oz)</span>
                  <span className="text-xs font-bold text-[#8B5A2B]">+₱25</span>
                </button>
              </div>
            </div>
          )}

          {/* Sweetness Level (For Beverages) */}
          {isBeverage && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Sweetness Level
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['0%', '25%', '50%', '100%'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSweetness(level)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      sweetness === level
                        ? 'bg-[#6F4E37] text-white border-[#6F4E37]'
                        : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options (For Coffee & Non-Coffee) */}
          {isBeverage && product.category !== 'Frappe' && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Dairy & Plant-Based Milk
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {(['Regular Milk', 'Oat Milk (+₱30)', 'Almond Milk (+₱30)'] as const).map((milkOpt) => (
                  <button
                    key={milkOpt}
                    type="button"
                    onClick={() => setMilk(milkOpt)}
                    className={`p-2.5 rounded-xl font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                      milk === milkOpt
                        ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                        : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                    }`}
                  >
                    <span>{milkOpt.replace(' (+₱30)', '')}</span>
                    {milkOpt.includes('+₱30') && (
                      <span className="text-[10px] font-bold text-[#8B5A2B]">+₱30</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons for Drinks */}
          {isBeverage && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Custom Add-Ons (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableAddOns.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => handleToggleAddOn(addon.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#EFE8DC] border-[#6F4E37] text-[#2B1810]'
                          : 'bg-white border-[#E6DAC8] text-[#5C3A21] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-[#6F4E37] border-[#6F4E37] text-white' : 'border-[#C4B5A5]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="font-bold text-[#8B5A2B]">+₱{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
              Special Instructions / Allergy Notes
            </label>
            <input
              type="text"
              id="product-special-instructions"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Please warm up pastry, extra napkin, less ice..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity Counter & Add to Cart */}
        <div className="p-5 bg-white border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#E6DAC8]">
            <button
              id="qty-minus-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-white text-[#2B1810] border border-[#E6DAC8] flex items-center justify-center hover:bg-[#EFE8DC] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-[#2B1810]">
              {quantity}
            </span>
            <button
              id="qty-plus-btn"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white text-[#2B1810] border border-[#E6DAC8] flex items-center justify-center hover:bg-[#EFE8DC] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            id="modal-add-to-cart-btn"
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-[#6F4E37] hover:bg-[#5C3A21] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-bold text-base bg-white/15 px-2.5 py-1 rounded-md">
              ₱{totalItemPrice}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
