import React, { useState } from 'react';
import { Sparkles, X, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Cafe' | 'Coffee' | 'Food';
  image: string;
  caption: string;
}

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Cafe' | 'Coffee' | 'Food'>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Artisan Espresso Bar',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
      caption: 'Our custom La Marzocco espresso station in the heart of Poblacion.'
    },
    {
      id: 'g-2',
      title: 'Velvety Latte Art',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1000&q=80',
      caption: 'Each flat white and latte is crafted with textured microfoam.'
    },
    {
      id: 'g-3',
      title: 'Morning Croissant Bake',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80',
      caption: 'Golden butter croissants hot out of the oven at 6:45 AM daily.'
    },
    {
      id: 'g-4',
      title: 'Misty Benguet Arabica Beans',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
      caption: 'Whole coffee beans roasted to medium dark profile.'
    },
    {
      id: 'g-5',
      title: 'Warm Sunlit Seating',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
      caption: 'Cozy leather booths and wooden tables for work, reading, or quiet catch-ups.'
    },
    {
      id: 'g-6',
      title: 'Ceremonial Uji Matcha',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=1000&q=80',
      caption: 'Authentic stone-ground Japanese matcha poured over creamy dairy.'
    },
    {
      id: 'g-7',
      title: 'Basque Burnt Cheesecake',
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80',
      caption: 'Caramelized top with a melt-in-the-mouth creamy core.'
    },
    {
      id: 'g-8',
      title: 'Ice-Blended Java Chip Frappe',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
      caption: 'Decadent chocolate chips and espresso capped with fresh cream.'
    },
    {
      id: 'g-9',
      title: 'Evening Coffee Vibe',
      category: 'Cafe',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
      caption: 'Warm ambient lighting as the night settles over Poblacion Makati.'
    }
  ];

  const filtered = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5A2B] bg-[#EFE8DC] px-3.5 py-1 rounded-full">
            Atmosphere & Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810]">
            The Paulo Estorel Visual Gallery
          </h2>
          <p className="text-sm text-[#6F4E37]">
            Immerse yourself in our daily rhythm — from early sunrise roasts and latte pours to peaceful cafe corners.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2">
          {(['All', 'Cafe', 'Coffee', 'Food'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#2B1810] text-[#FDFBF7] shadow-xs'
                  : 'bg-white text-[#5C3A21] border border-[#E6DAC8] hover:bg-[#EFE8DC]'
              }`}
            >
              {cat === 'All' ? 'All Moments' : cat}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-2xs cursor-pointer bg-[#F4EFEA]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/90 via-[#2B1810]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B07D62]">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-[#E6DAC8] line-clamp-2 mt-1">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/90">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to view full photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-[#2B1810] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#5C3A21] text-white relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-10 cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>

              <div className="p-6 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B07D62]">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FDFBF7]">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-[#C4B5A5] pt-1">
                  {selectedImage.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
