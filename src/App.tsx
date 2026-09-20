import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HeroSection } from './components/customer/HeroSection';
import { SpecialtiesSection } from './components/customer/SpecialtiesSection';
import { MenuSection } from './components/customer/MenuSection';
import { AboutSection } from './components/customer/AboutSection';
import { GallerySection } from './components/customer/GallerySection';
import { ContactSection } from './components/customer/ContactSection';
import { OrderStatusView } from './components/customer/OrderStatusView';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Coffee, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isAdminAuthenticated
  } = useApp();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // If user clicked Admin but is not authenticated, show login modal
  const handleOpenAdmin = () => {
    if (!isAdminAuthenticated) {
      setIsAdminModalOpen(true);
    } else {
      setActiveTab('admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2B1810]">
      {/* If activeTab is 'admin' and user is logged in, show full Admin Dashboard */}
      {activeTab === 'admin' && isAdminAuthenticated ? (
        <AdminDashboard />
      ) : (
        <>
          {/* Main Storefront Navbar */}
          <Navbar />

          {/* Main View Router */}
          <main className="flex-1">
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div className="space-y-0 animate-fadeIn">
                <HeroSection />
                <SpecialtiesSection />
                <MenuSection />
                
                {/* Mid-page Ambience & Sourcing Callout */}
                <section className="bg-[#2B1810] text-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#3D2517]">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#B07D62]">
                        Philippine Specialty Coffee Terroir
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold">
                        Roasted in Small Batches for Pure Flavor Clarity
                      </h3>
                      <p className="text-sm sm:text-base text-[#C4B5A5] leading-relaxed max-w-2xl">
                        We celebrate indigenous coffee growers across Atok, Sagada, and Mt. Apo. Every batch is roasted on-site in Poblacion, Makati, unlocking natural notes of dark cocoa, roasted hazelnuts, and wildflower honey.
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                      <button
                        onClick={() => setActiveTab('order')}
                        className="px-6 py-3.5 rounded-xl bg-[#6F4E37] hover:bg-[#8B5A2B] text-white font-semibold text-sm transition-colors text-center cursor-pointer"
                      >
                        Order Online for Delivery
                      </button>
                      <button
                        onClick={() => setActiveTab('about')}
                        className="px-6 py-3.5 rounded-xl border border-[#C4B5A5]/40 hover:border-white text-white font-medium text-sm transition-colors text-center cursor-pointer"
                      >
                        Read Our Story
                      </button>
                    </div>
                  </div>
                </section>

                <AboutSection />
                <GallerySection />
                <ContactSection />
              </div>
            )}

            {/* 2. FULL MENU TAB */}
            {activeTab === 'menu' && (
              <div className="animate-fadeIn">
                <MenuSection isOrderingMode={false} />
              </div>
            )}

            {/* 3. ONLINE ORDERING TAB */}
            {activeTab === 'order' && (
              <div className="animate-fadeIn">
                <MenuSection isOrderingMode={true} />
              </div>
            )}

            {/* 4. ABOUT US TAB */}
            {activeTab === 'about' && (
              <div className="animate-fadeIn">
                <AboutSection />
              </div>
            )}

            {/* 5. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="animate-fadeIn">
                <GallerySection />
              </div>
            )}

            {/* 6. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="animate-fadeIn">
                <ContactSection />
              </div>
            )}

            {/* 7. ORDER STATUS TRACKER TAB */}
            {activeTab === 'order-status' && (
              <div className="animate-fadeIn">
                <OrderStatusView />
              </div>
            )}

            {/* Fallback for Admin when not logged in */}
            {activeTab === 'admin' && !isAdminAuthenticated && (
              <div className="py-24 text-center px-4 max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#2B1810] text-white flex items-center justify-center mx-auto shadow-md">
                  <ShieldCheck className="w-8 h-8 text-[#B07D62]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2B1810]">
                  Admin Dashboard Authentication Required
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  Please enter store credentials to access inventory, orders management, and sales reporting.
                </p>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#6F4E37] text-white font-semibold text-xs sm:text-sm shadow-xs"
                >
                  Enter Admin Credentials / 1-Click Demo
                </button>
              </div>
            )}
          </main>

          {/* Storefront Footer */}
          <Footer />
        </>
      )}

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdminModalOpen(false);
          setActiveTab('admin');
        }}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
