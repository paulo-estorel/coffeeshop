import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coffee, Award, Heart, ShieldCheck, Mountain, Flame, Users, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE8DC] text-[#6F4E37] text-xs font-semibold uppercase tracking-wider">
              <Mountain className="w-3.5 h-3.5 text-[#B07D62]" />
              Born in Poblacion, Rooted in Philippine Highlands
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1810] leading-tight">
              Honoring Philippine Coffee Culture, One Cup at a Time.
            </h2>

            <p className="text-sm sm:text-base text-[#6F4E37] leading-relaxed">
              Paulo Estorel Coffee Shop was founded with a straightforward mission: to celebrate the world-class terroir of Philippine specialty beans and create a neighborhood haven where quality, comfort, and hospitality converge.
            </p>

            <p className="text-sm sm:text-base text-[#6F4E37] leading-relaxed">
              From the misty high-altitude farms of Atok, Benguet and the pine valleys of Sagada to the volcanic slopes of Mt. Apo in Davao, our beans are sourced directly through fair partnerships with local smallholder farming cooperatives.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('menu')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6F4E37] hover:bg-[#5C3A21] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Taste Our Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80"
              alt="Artisan pour over coffee"
              className="rounded-3xl object-cover h-64 w-full shadow-xs"
            />
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
              alt="Cozy cafe interior"
              className="rounded-3xl object-cover h-64 w-full shadow-xs mt-8"
            />
          </div>
        </div>

        {/* 4 Pillars of Paulo Estorel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EFE8DC] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37]">
              <Mountain className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">
              Direct Farm Sourcing
            </h3>
            <p className="text-xs text-[#6F4E37] leading-relaxed">
              We work directly with indigenous farming communities in Northern Luzon and Mindanao to ensure fair wages and premium crop selection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EFE8DC] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">
              Small-Batch Roasting
            </h3>
            <p className="text-xs text-[#6F4E37] leading-relaxed">
              Roasting in meticulous micro-batches brings out vibrant notes of cacao nibs, wild honey, and ripe mountain berries in every roast.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EFE8DC] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">
              Artisan Kitchen Bites
            </h3>
            <p className="text-xs text-[#6F4E37] leading-relaxed">
              From our famous all-butter croissants to savory truffle pastas and Basque burnt cheesecakes, everything is freshly prepped daily.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EFE8DC] shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFE8DC] flex items-center justify-center text-[#6F4E37]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">
              Neighborhood Ambiance
            </h3>
            <p className="text-xs text-[#6F4E37] leading-relaxed">
              Warm wooden textures, natural lighting, high-speed WiFi, and friendly baristas make our Poblacion cafe your ideal sanctuary.
            </p>
          </div>
        </div>

        {/* Master Barista Quote */}
        <div className="bg-[#2B1810] text-[#FDFBF7] p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B07D62]">
              Our Craft Promise
            </p>
            <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#FAF8F5]">
              &ldquo;Coffee is more than morning fuel in the Philippines. It is a warm conversation with old friends, a quiet moment of reflection, and a tribute to the resilient hands that harvested the red coffee cherries in our Cordilleras.&rdquo;
            </p>
            <div className="pt-2">
              <p className="font-bold text-sm text-white">Mateo Cruz</p>
              <p className="text-xs text-[#C4B5A5]">Head Roaster & Co-Founder, Paulo Estorel Coffee Shop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
