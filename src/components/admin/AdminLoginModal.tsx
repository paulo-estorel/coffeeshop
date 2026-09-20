import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, ArrowRight, Coffee, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminLogin } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = adminLogin(pin);
    if (success) {
      onSuccess();
    } else {
      setError('Invalid admin credentials. Password is "12345"');
    }
  };

  const handleDemoAccess = () => {
    adminLogin('12345');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#EFE8DC] relative text-[#2B1810]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6F4E37] hover:bg-[#EFE8DC] rounded-xl transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#2B1810] text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7 text-[#B07D62]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2B1810]">
            Store Admin Portal
          </h3>
          <p className="text-xs text-[#6F4E37] max-w-xs mx-auto">
            Authorized access to Paulo Estorel orders, sales analytics, product inventory, and store settings.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#6F4E37] block mb-1">
              Admin Password or PIN
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter password (e.g. 12345)"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-[#A89887] mt-1">
              Admin Password: <strong className="text-[#2B1810]">12345</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2B1810] hover:bg-[#3D2517] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Authenticate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#EFE8DC] text-center">
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2.5 rounded-xl bg-[#EFE8DC] hover:bg-[#E6DAC8] text-[#5C3A21] font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>1-Click Quick Demo Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
