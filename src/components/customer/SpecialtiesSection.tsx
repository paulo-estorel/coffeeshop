import React from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Sparkles, Plus, Check, Star } from 'lucide-react';

export const SpecialtiesSection: React.FC = () => {
  const { products, setSelectedProductForModal, setActiveTab, setSelectedCategory } = useApp();

  // Filter featured products
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DC] text-[#6F4E37] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-[#B07D62]" />
              Patron Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810]">
              Signature Brews & Bites
            </h2>
            <p className="text-sm sm:text-base text-[#6F4E37] mt-1 max-w-xl">
              Our most celebrated creations, handcrafted by master baristas and baked fresh every sunrise.
            </p>
          </div>

          <button
            id="view-full-menu-btn"
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('menu');
            }}
            className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-[#6F4E37] hover:text-[#2B1810] underline underline-offset-4 cursor-pointer"
          >
            Browse All 21 Items →
          </button>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F4EFEA]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.tags?.slice(0, 1).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-[#2B1810]/80 backdrop-blur-xs text-[#FDFBF7] text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-xs font-bold text-[#2B1810] shadow-xs">
                  ₱{product.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8B5A2B] font-medium mb-1">
                    <span>{product.category}</span>
                    {product.temperature !== 'N/A' && (
                      <span>{product.temperature === 'Both' ? 'Hot / Iced' : product.temperature}</span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1810] group-hover:text-[#6F4E37] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#6F4E37]/80 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F4EFEA] flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#2B1810]">
                    ₱{product.price}
                  </span>
                  <button
                    id={`featured-add-btn-${product.id}`}
                    onClick={() => setSelectedProductForModal(product)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6F4E37] hover:bg-[#5C3A21] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
