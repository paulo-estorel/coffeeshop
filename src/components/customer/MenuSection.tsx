import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory, Product } from '../../types';
import { Search, SlidersHorizontal, Coffee, Sparkles, IceCream, UtensilsCrossed, Plus, AlertCircle } from 'lucide-react';

interface MenuSectionProps {
  isOrderingMode?: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ isOrderingMode = false }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductForModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [temperatureFilter, setTemperatureFilter] = useState<'All' | 'Hot' | 'Iced'>('All');

  const categories: { id: ProductCategory | 'All'; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Items', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Coffee', label: 'Coffee', icon: <Coffee className="w-4 h-4" /> },
    { id: 'Non-Coffee', label: 'Non-Coffee', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Frappe', label: 'Frappe', icon: <IceCream className="w-4 h-4" /> },
    { id: 'Food', label: 'Food & Bakery', icon: <UtensilsCrossed className="w-4 h-4" /> },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }
      // Temperature match
      if (temperatureFilter !== 'All') {
        if (p.temperature === 'N/A') return true; // food items stay visible
        if (p.temperature !== 'Both' && p.temperature !== temperatureFilter) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery, temperatureFilter]);

  return (
    <section id="menu-section" className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5A2B] bg-[#EFE8DC] px-3.5 py-1 rounded-full">
            {isOrderingMode ? 'Online Ordering' : 'Our Artisan Menu'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810] mt-3">
            {isOrderingMode ? 'Select Your Favorite Drinks & Bites' : 'Handcrafted With Benguet & Sagada Harvest'}
          </h2>
          <p className="text-sm sm:text-base text-[#6F4E37] mt-2">
            Every beverage is made-to-order with freshly ground beans, calibrated temperatures, and balanced flavor notes.
          </p>
        </div>

        {/* Category Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#EFE8DC] shadow-xs">
          {/* Categories Tab Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#2B1810] text-[#FDFBF7] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5C3A21] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Temperature Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="menu-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search espresso, matcha, croissant..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37] text-[#2B1810]"
              />
            </div>

            {/* Temperature Quick Switcher */}
            <div className="hidden sm:flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#E6DAC8] text-xs font-semibold">
              {(['All', 'Hot', 'Iced'] as const).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setTemperatureFilter(temp)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    temperatureFilter === temp
                      ? 'bg-[#6F4E37] text-white shadow-2xs'
                      : 'text-[#6F4E37] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Count Display */}
        <div className="flex items-center justify-between text-xs text-[#6F4E37] font-medium mb-6 px-1">
          <span>
            Showing <strong className="text-[#2B1810]">{filteredProducts.length}</strong> items in{' '}
            <strong className="text-[#2B1810]">{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</strong>
          </span>
          <span className="text-[#8B5A2B]">Prices in Philippine Peso (₱)</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#C4B5A5] p-8">
            <AlertCircle className="w-10 h-10 text-[#8B5A2B] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">No items found</h3>
            <p className="text-sm text-[#6F4E37] mt-1">
              Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setTemperatureFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#6F4E37] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className={`bg-white rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                  !product.inStock ? 'opacity-70' : ''
                }`}
              >
                {/* Top Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F4EFEA]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2B1810]/80 backdrop-blur-xs text-[#FDFBF7] text-[11px] font-medium">
                    {product.category}
                  </span>

                  {/* Stock Status / Out of Stock Banner */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-sm tracking-wider uppercase">
                      Sold Out
                    </div>
                  )}

                  {/* Temperature Pill */}
                  {product.temperature !== 'N/A' && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#2B1810] text-[10px] font-bold shadow-xs">
                      {product.temperature === 'Both' ? 'Hot & Iced' : product.temperature}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#2B1810] group-hover:text-[#6F4E37] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <span className="font-serif text-base font-bold text-[#2B1810] shrink-0">
                        ₱{product.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#6F4E37] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-3 border-t border-[#F4EFEA] flex items-center justify-between">
                    <span className="text-[11px] text-[#A89887] font-medium">
                      {product.calories ? `~${product.calories} kcal` : 'Freshly made'}
                    </span>

                    <button
                      id={`order-btn-${product.id}`}
                      onClick={() => setSelectedProductForModal(product)}
                      disabled={!product.inStock}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                        product.inStock
                          ? 'bg-[#6F4E37] hover:bg-[#5C3A21] text-white'
                          : 'bg-[#C4B5A5] text-white cursor-not-allowed'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isOrderingMode ? 'Add' : 'Customize'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
