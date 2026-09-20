import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, ShieldCheck, Clock, Phone, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    isAdminAuthenticated,
    settings
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Online Order' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'order-status', label: 'Track Order' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#23140C] text-[#EFE8DC] text-xs py-2 px-4 border-b border-[#3D2517]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[13px]">
            <span className="flex items-center gap-1.5 text-[#E6DAC8]">
              <Clock className="w-3.5 h-3.5 text-[#B07D62]" />
              Open Daily: 7:00 AM – 10:00 PM
            </span>
            <span className="hidden md:inline-block text-[#6F4E37]">•</span>
            <span className="hidden md:flex items-center gap-1 text-[#E6DAC8]">
              <Phone className="w-3.5 h-3.5 text-[#B07D62]" />
              Poblacion, Makati • (02) 8123-4567
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#3D5A45] text-[#FDFBF7] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase">
              Free Delivery
            </span>
            <span className="text-[#E6DAC8] text-xs">
              On orders ₱{settings.freeDeliveryThreshold}+
            </span>
            <span className="text-[#6F4E37]">•</span>
            <button
              id="header-admin-quick-link"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 text-xs hover:text-[#B07D62] transition-colors ${
                activeTab === 'admin' ? 'text-[#B07D62] font-bold' : 'text-[#C4B5A5]'
              }`}
              title="Store Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdminAuthenticated ? 'Admin Panel' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFE8DC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2B1810] to-[#6F4E37] flex items-center justify-center text-[#FDFBF7] shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Coffee className="w-6 h-6 text-[#EFE8DC]" />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B1810] block leading-none">
                  PAULO ESTOREL
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B5A2B]">
                  Coffee Shop • Roastery
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#2B1810] text-[#FDFBF7] shadow-xs'
                        : 'text-[#5C3A21] hover:text-[#2B1810] hover:bg-[#EFE8DC]/60'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Order Online Button (Desktop) */}
              <button
                id="header-order-online-btn"
                onClick={() => handleNavClick('order')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#6F4E37] hover:bg-[#5C3A21] text-[#FDFBF7] text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Order Online
              </button>

              {/* Shopping Cart Button */}
              <button
                id="nav-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg bg-[#EFE8DC] hover:bg-[#E6DAC8] text-[#2B1810] transition-colors cursor-pointer"
                aria-label={`Shopping Cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#2B1810]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#8B5A2B] text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg bg-[#EFE8DC] hover:bg-[#E6DAC8] text-[#2B1810] lg:hidden transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EFE8DC] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#2B1810] text-[#FDFBF7]'
                        : 'text-[#2B1810] hover:bg-[#EFE8DC]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-2 border-t border-[#EFE8DC] mt-2 flex flex-col gap-2">
                <button
                  id="mobile-nav-order-btn"
                  onClick={() => handleNavClick('order')}
                  className="w-full py-3 rounded-lg bg-[#6F4E37] text-white font-semibold text-center shadow-xs"
                >
                  Start Online Order
                </button>
                <button
                  id="mobile-nav-admin-btn"
                  onClick={() => handleNavClick('admin')}
                  className="w-full py-2.5 rounded-lg border border-[#6F4E37] text-[#6F4E37] font-medium text-center flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
