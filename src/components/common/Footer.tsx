import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coffee, MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#23140C] text-[#EFE8DC] pt-16 pb-12 border-t border-[#3D2517]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2517]">
          {/* Brand & Story Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#6F4E37] flex items-center justify-center text-[#FDFBF7]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">
                PAULO ESTOREL
              </span>
            </div>
            <p className="text-sm text-[#C4B5A5] leading-relaxed">
              Poblacion&apos;s neighborhood specialty roastery. Dedicated to ethically sourced Philippine single-origin beans, precision roasting, and comforting artisan kitchen bites.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-[#3D2517] flex items-center justify-center text-[#EFE8DC] hover:bg-[#6F4E37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-[#3D2517] flex items-center justify-center text-[#EFE8DC] hover:bg-[#6F4E37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                id="footer-admin-btn"
                onClick={() => handleNav('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D2517] text-xs text-[#E6DAC8] hover:bg-[#6F4E37] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B07D62]" />
                Admin Dashboard
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide mb-4">
              Explore Menu & Cafe
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C4B5A5]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Handcrafted Coffee Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('order')} className="hover:text-white transition-colors cursor-pointer">
                  Online Ordering & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('order-status')} className="hover:text-white transition-colors cursor-pointer">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Coffee Bean Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Cafe Gallery & Ambience
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide mb-4">
              Location & Hours
            </h4>
            <div className="flex items-start gap-3 text-sm text-[#C4B5A5]">
              <MapPin className="w-4 h-4 text-[#B07D62] shrink-0 mt-1" />
              <span>128 Roastcraft Boulevard, Poblacion, Makati City, Metro Manila</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#C4B5A5]">
              <Clock className="w-4 h-4 text-[#B07D62] shrink-0" />
              <span>Mon – Sun: 7:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#C4B5A5]">
              <Phone className="w-4 h-4 text-[#B07D62] shrink-0" />
              <span>+63 2 8123 4567 • 0917 555 BEAN</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#C4B5A5]">
              <Mail className="w-4 h-4 text-[#B07D62] shrink-0" />
              <span>orders@pauloestorelcoffee.ph</span>
            </div>
          </div>

          {/* Payment & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide">
              Accepted Payments
            </h4>
            <p className="text-xs text-[#C4B5A5] leading-relaxed">
              We accept Philippine Peso (₱) via Cash on Pickup/Delivery, GCash, Maya, and major debit/credit cards.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-[#3D2517] text-[#EFE8DC] text-xs font-semibold rounded">
                Cash (COD/COP)
              </span>
              <span className="px-2.5 py-1 bg-[#005CEE]/20 text-[#7BB1FF] border border-[#005CEE]/40 text-xs font-semibold rounded">
                GCash
              </span>
              <span className="px-2.5 py-1 bg-[#1DB954]/20 text-[#86E4A4] border border-[#1DB954]/40 text-xs font-semibold rounded">
                Maya
              </span>
              <span className="px-2.5 py-1 bg-[#3D2517] text-[#EFE8DC] text-xs font-semibold rounded">
                Visa / Mastercard
              </span>
            </div>
            <div className="pt-2">
              <p className="text-xs text-[#C4B5A5]">Pickup & Delivery across Metro Manila</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89887]">
          <p>© {new Date().getFullYear()} Paulo Estorel Coffee Shop. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for coffee lovers in the Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
