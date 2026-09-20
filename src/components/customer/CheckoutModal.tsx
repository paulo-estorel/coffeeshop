import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderType, PaymentMethod } from '../../types';
import { X, CheckCircle, MapPin, Store, CreditCard, Banknote, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    settings,
    createOrder
  } = useApp();

  // Form State
  const [orderType, setOrderType] = useState<OrderType>('Delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Makati City');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('GCash');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Delivery calculation
  const deliveryFee = orderType === 'Delivery' ? (cartSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee) : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please provide your complete name.');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setErrorMsg('Please provide a valid contact phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address for the order confirmation.');
      return;
    }
    if (orderType === 'Delivery' && !address.trim()) {
      setErrorMsg('Please enter your complete delivery address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder(
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: orderType === 'Delivery' ? address.trim() : undefined,
          city: orderType === 'Delivery' ? city : undefined,
          notes: notes.trim() ? notes.trim() : undefined
        },
        orderType,
        paymentMethod
      );
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EFE8DC] relative max-h-[90vh] flex flex-col my-auto text-[#2B1810]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#EFE8DC] flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Checkout & Confirmation
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#2B1810]">
              Complete Your Order
            </h3>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-[#6F4E37] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-6 space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Order Type Selection (Pickup vs Delivery) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
              Fulfillment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="select-delivery-btn"
                onClick={() => setOrderType('Delivery')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  orderType === 'Delivery'
                    ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810] shadow-sm'
                    : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                }`}
              >
                <MapPin className={`w-5 h-5 shrink-0 ${orderType === 'Delivery' ? 'text-[#B07D62]' : 'text-[#6F4E37]'}`} />
                <div>
                  <p className="font-bold text-sm">Doorstep Delivery</p>
                  <p className="text-xs opacity-75 mt-0.5">
                    {cartSubtotal >= settings.freeDeliveryThreshold ? 'Free delivery' : `₱${settings.deliveryFee} flat fee`}
                  </p>
                </div>
              </button>

              <button
                type="button"
                id="select-pickup-btn"
                onClick={() => setOrderType('Pickup')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  orderType === 'Pickup'
                    ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810] shadow-sm'
                    : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#EFE8DC]'
                }`}
              >
                <Store className={`w-5 h-5 shrink-0 ${orderType === 'Pickup' ? 'text-[#B07D62]' : 'text-[#6F4E37]'}`} />
                <div>
                  <p className="font-bold text-sm">Store Pickup</p>
                  <p className="text-xs opacity-75 mt-0.5">
                    Ready in 15 mins • Poblacion Cafe
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
              Customer Details
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#6F4E37] block mb-1">Full Name *</label>
                <input
                  type="text"
                  id="checkout-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="text-xs text-[#6F4E37] block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  id="checkout-phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0917 123 4567"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-[#6F4E37] block mb-1">Email Address (for Receipt) *</label>
                <input
                  type="email"
                  id="checkout-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maria.santos@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                />
              </div>
            </div>
          </div>

          {/* 3. Delivery Address (Conditional) */}
          {orderType === 'Delivery' && (
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E6DAC8]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
                Delivery Location
              </label>
              
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-[#6F4E37] block mb-1">Street Address, Unit / Building *</label>
                  <input
                    type="text"
                    id="checkout-address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Unit 12B, Pacific Star Tower, Sen. Gil Puyat Ave"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-[#6F4E37] block mb-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden"
                    >
                      <option value="Makati City">Makati City</option>
                      <option value="Taguig / BGC">Taguig / BGC</option>
                      <option value="Mandaluyong">Mandaluyong</option>
                      <option value="Pasig City">Pasig City</option>
                      <option value="Quezon City">Quezon City</option>
                      <option value="Manila">Manila</option>
                      <option value="San Juan">San Juan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#6F4E37] block mb-1">Rider Notes / Landmarks</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Beside 7-Eleven, buzz unit"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] rounded-xl border border-[#E6DAC8] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6F4E37] block">
              Payment Method (Philippine Peso ₱)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'GCash', label: 'GCash e-Wallet', desc: 'Scan QR or direct transfer' },
                { id: 'Maya', label: 'Maya e-Wallet', desc: 'Instant QR / mobile transfer' },
                { id: 'Cash on Pickup / Delivery', label: orderType === 'Delivery' ? 'Cash on Delivery (COD)' : 'Cash at Counter (COP)', desc: 'Exact change appreciated' },
                { id: 'Credit / Debit Card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB' },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === pm.id
                      ? 'bg-[#2B1810] text-[#FDFBF7] border-[#2B1810]'
                      : 'bg-white text-[#2B1810] border-[#E6DAC8] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs">{pm.label}</p>
                    <p className="text-[10px] opacity-75">{pm.desc}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === pm.id ? 'bg-[#B07D62] border-[#B07D62]' : 'border-[#C4B5A5]'
                    }`}
                  >
                    {paymentMethod === pm.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Order Breakdown Summary */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] space-y-2 text-xs">
            <h4 className="font-bold text-[#2B1810] uppercase tracking-wider text-[11px]">
              Order Summary ({cart.length} items)
            </h4>
            <div className="divide-y divide-[#F4EFEA] max-h-36 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="py-1.5 flex justify-between">
                  <span className="text-[#5C3A21]">
                    {item.quantity}x {item.name}{' '}
                    {item.options.size ? `(${item.options.size})` : ''}
                  </span>
                  <span className="font-semibold text-[#2B1810]">
                    ₱{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#EFE8DC] space-y-1">
              <div className="flex justify-between text-[#6F4E37]">
                <span>Items Subtotal</span>
                <span>₱{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#6F4E37]">
                <span>{orderType === 'Delivery' ? 'Delivery Fee' : 'Store Pickup Fee'}</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₱${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-[#2B1810] font-bold text-sm pt-1 border-t border-[#F4EFEA]">
                <span>Total Amount Due:</span>
                <span className="font-serif text-lg text-[#6F4E37]">₱{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="confirm-place-order-btn"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#6F4E37] hover:bg-[#5C3A21] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <span>Confirm & Place Order (₱{grandTotal})</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[#A89887] mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3D5A45]" />
              Paulo Estorel Safe Checkout Guarantee
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
