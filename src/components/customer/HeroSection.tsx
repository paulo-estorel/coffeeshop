import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coffee, ArrowRight, Sparkles, Clock, ShieldCheck, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#2B1810] text-[#FDFBF7] py-16 sm:py-24 lg:py-28">
      {/* Subtle Background Pattern & Coffee Photo Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1800&q=80"
          alt="Coffee beans texture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#8B5A2B]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#3D5A45]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D2517]/80 border border-[#6F4E37]/60 text-[#EFE8DC] text-xs font-medium tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B07D62]" />
              <span>Benguet & Sagada Single-Origin Beans • Roasted Fresh Weekly</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.12]">
              Brewed with Passion, <br className="hidden sm:inline" />
              <span className="text-[#E6DAC8] italic">Poured with Purpose.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#C4B5A5] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Step into Paulo Estorel Coffee Shop — where Philippine mountain harvest meets meticulous espresso craft. Enjoy comforting Spanish Lattes, refreshing frappes, and oven-fresh pastries delivered straight to your door or ready for counter pickup.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={() => setActiveTab('order')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#6F4E37] hover:bg-[#8B5A2B] text-white font-semibold text-base shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Order for Pickup & Delivery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={() => setActiveTab('menu')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#C4B5A5]/40 hover:border-[#FDFBF7] text-[#FDFBF7] font-medium text-base hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Coffee className="w-4 h-4 text-[#B07D62]" />
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-[#3D2517] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#FDFBF7]">100%</p>
                <p className="text-xs text-[#A89887]">Philippine Specialty Grade Beans</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#FDFBF7]">₱49</p>
                <p className="text-xs text-[#A89887]">Flat Metro Manila Delivery</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#FDFBF7]">4.9 ★</p>
                <p className="text-xs text-[#A89887]">Over 2,400+ Happy Patrons</p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#6F4E37] to-[#B07D62] opacity-30 blur-md transform -rotate-1" />
              
              <div className="relative rounded-2xl overflow-hidden border border-[#5C3A21] bg-[#1E130D] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                  alt="Barista brewing artisan espresso at Paulo Estorel Coffee Shop"
                  className="w-full h-[400px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Highlight Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#23140C]/90 backdrop-blur-md border border-[#5C3A21] text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm font-bold text-[#FDFBF7]">Signature Spanish Latte</p>
                      <p className="text-[#C4B5A5]">Benguet espresso & silky condensed milk</p>
                    </div>
                    <span className="font-bold text-[#FDFBF7] text-sm bg-[#6F4E37] px-2.5 py-1 rounded-md">
                      ₱175
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Award Tag */}
              <div className="absolute -top-4 -right-3 bg-[#FAF8F5] text-[#2B1810] p-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-[#EFE8DC]">
                <div className="w-8 h-8 rounded-full bg-[#3D5A45] flex items-center justify-center text-white">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#3D5A45]">Best Local Roast</p>
                  <p className="text-xs font-semibold text-[#2B1810]">Poblacion Coffee Choice 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
