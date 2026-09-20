import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { Search, CheckCircle, Clock, ChefHat, Bike, AlertCircle, Phone, ArrowLeft, Coffee, MapPin } from 'lucide-react';

export const OrderStatusView: React.FC = () => {
  const { orders, activeOrderId, setActiveOrderId, setActiveTab } = useApp();
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searchFeedback, setSearchFeedback] = useState('');

  // Determine which order to show: active placed order, searched order, or latest order in system
  const currentOrder =
    searchedOrder ||
    orders.find((o) => o.id === activeOrderId) ||
    orders[0] ||
    null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFeedback('');
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === query ||
        o.customer.phone.includes(query) ||
        o.customer.name.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setSearchedOrder(found);
      setActiveOrderId(found.id);
    } else {
      setSearchFeedback(`No order found matching "${searchId}". Please check your Order ID.`);
    }
  };

  const steps: { status: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      status: 'Pending',
      label: 'Order Placed',
      desc: 'Received and sent to baristas',
      icon: <Clock className="w-5 h-5" />
    },
    {
      status: 'Preparing',
      label: 'Brewing & Baking',
      desc: 'Espresso extraction & fresh plating',
      icon: <ChefHat className="w-5 h-5" />
    },
    {
      status: 'Ready',
      label: currentOrder?.orderType === 'Delivery' ? 'Out for Delivery' : 'Ready for Pickup',
      desc: currentOrder?.orderType === 'Delivery' ? 'Rider is on the way to you' : 'Please proceed to pickup counter',
      icon: <Bike className="w-5 h-5" />
    },
    {
      status: 'Completed',
      label: 'Completed',
      desc: 'Delivered & enjoyed',
      icon: <CheckCircle className="w-5 h-5" />
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Preparing': return 1;
      case 'Ready': return 2;
      case 'Completed': return 3;
      default: return -1;
    }
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;
  const isCancelled = currentOrder?.status === 'Cancelled';

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Search Bar */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5A2B] bg-[#EFE8DC] px-3 py-1 rounded-full">
            Live Order Status Tracker
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1810]">
            Track Your Fresh Brew
          </h2>
          <p className="text-sm text-[#6F4E37] max-w-lg mx-auto">
            Monitor preparation progress in real-time. Look up using your Order ID (e.g. BNB-2026-1042) or mobile number.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. BNB-2026-1042)"
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-xl border border-[#E6DAC8] focus:outline-hidden focus:border-[#6F4E37] text-[#2B1810]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#6F4E37] hover:bg-[#5C3A21] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {searchFeedback && (
            <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 py-1.5 px-3 rounded-lg inline-block">
              {searchFeedback}
            </p>
          )}
        </div>

        {/* Order Details Display */}
        {currentOrder ? (
          <div className="bg-white rounded-3xl border border-[#EFE8DC] shadow-sm overflow-hidden text-[#2B1810]">
            {/* Top Order Badge Banner */}
            <div className="p-6 bg-[#2B1810] text-[#FDFBF7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl font-bold text-[#FDFBF7]">
                    Order #{currentOrder.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      currentOrder.status === 'Completed'
                        ? 'bg-[#3D5A45] text-white'
                        : currentOrder.status === 'Cancelled'
                        ? 'bg-rose-800 text-white'
                        : 'bg-[#B07D62] text-[#2B1810]'
                    }`}
                  >
                    {currentOrder.status}
                  </span>
                </div>
                <p className="text-xs text-[#E6DAC8] mt-1">
                  Placed on {new Date(currentOrder.createdAt).toLocaleDateString()} at{' '}
                  {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                  <strong className="text-white">{currentOrder.orderType}</strong>
                </p>
              </div>

              <div className="text-right sm:text-right">
                <p className="text-xs text-[#E6DAC8]">Estimated Time</p>
                <p className="font-serif text-xl font-bold text-[#FDFBF7]">
                  {currentOrder.estimatedTime || '15-20 mins'}
                </p>
              </div>
            </div>

            {/* Stepper Visualizer */}
            {!isCancelled ? (
              <div className="p-6 sm:p-8 border-b border-[#EFE8DC] bg-[#FAF8F5]/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                  {steps.map((step, idx) => {
                    const isDone = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;

                    return (
                      <div key={step.status} className="flex flex-col items-center text-center space-y-2">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isDone
                              ? 'bg-[#3D5A45] text-white shadow-xs'
                              : 'bg-[#EFE8DC] text-[#8B5A2B]'
                          } ${isCurrent ? 'ring-4 ring-[#86E4A4]/40 scale-105' : ''}`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isDone ? 'text-[#2B1810]' : 'text-[#A89887]'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-[11px] text-[#6F4E37] max-w-[130px] mx-auto mt-0.5 leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-rose-50 text-rose-800 text-center text-sm font-medium border-b border-rose-200">
                This order was cancelled. If you have questions or require a refund, please reach out to our barista team.
              </div>
            )}

            {/* Order Details Body */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Items Ordered */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#2B1810] pb-2 border-b border-[#EFE8DC]">
                  Items in this Order
                </h4>
                <div className="space-y-3">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between text-xs sm:text-sm">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#2B1810]">
                          {item.quantity}x {item.name}
                        </p>
                        <div className="text-[11px] text-[#8B5A2B] space-x-1">
                          {item.options.temperature && <span>{item.options.temperature}</span>}
                          {item.options.size && <span>• {item.options.size}</span>}
                          {item.options.sweetness && <span>• {item.options.sweetness}</span>}
                          {item.options.milk && <span>• {item.options.milk}</span>}
                        </div>
                        {item.options.addOns && item.options.addOns.length > 0 && (
                          <p className="text-[10px] text-[#6F4E37] italic">
                            + {item.options.addOns.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="font-bold text-[#2B1810]">
                        ₱{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-4 border-t border-[#EFE8DC] space-y-1.5 text-xs text-[#6F4E37]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₱{currentOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{currentOrder.orderType === 'Delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                    <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `₱${currentOrder.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2B1810] pt-2 border-t border-[#F4EFEA]">
                    <span>Total Paid / Due:</span>
                    <span className="font-serif text-base text-[#6F4E37]">₱{currentOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Customer & Delivery Info */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#2B1810] pb-2 border-b border-[#EFE8DC]">
                  Customer & Delivery Details
                </h4>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6DAC8] space-y-3 text-xs">
                  <div>
                    <span className="text-[#8B5A2B] font-semibold block">Customer Name</span>
                    <span className="font-bold text-sm text-[#2B1810]">{currentOrder.customer.name}</span>
                  </div>

                  <div>
                    <span className="text-[#8B5A2B] font-semibold block">Contact Number & Email</span>
                    <span className="text-[#2B1810]">{currentOrder.customer.phone} • {currentOrder.customer.email}</span>
                  </div>

                  {currentOrder.orderType === 'Delivery' ? (
                    <div>
                      <span className="text-[#8B5A2B] font-semibold block">Delivery Address</span>
                      <span className="text-[#2B1810]">
                        {currentOrder.customer.address}, {currentOrder.customer.city}
                      </span>
                      {currentOrder.customer.notes && (
                        <p className="text-[#6F4E37] italic mt-1">
                          Note: {currentOrder.customer.notes}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-[#8B5A2B] font-semibold block">Pickup Location</span>
                      <span className="text-[#2B1810]">
                        Paulo Estorel Coffee Shop Counter — 128 Roastcraft Boulevard, Poblacion, Makati City
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-[#8B5A2B] font-semibold block">Payment Method</span>
                    <span className="text-[#2B1810] font-medium">{currentOrder.paymentMethod}</span>
                  </div>
                </div>

                {/* Need Help Button */}
                <div className="p-4 bg-[#EFE8DC]/60 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#2B1810]">
                    <Phone className="w-4 h-4 text-[#8B5A2B]" />
                    <span>Questions about this order?</span>
                  </div>
                  <a
                    href="tel:+63281234567"
                    className="text-xs font-bold text-[#6F4E37] hover:underline"
                  >
                    Call Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE8DC] p-8">
            <Coffee className="w-12 h-12 text-[#8B5A2B] mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#2B1810]">No Active Orders</h3>
            <p className="text-xs sm:text-sm text-[#6F4E37] mt-1">
              You haven&apos;t placed any orders yet. Explore our handcrafted menu and order now!
            </p>
            <button
              onClick={() => setActiveTab('order')}
              className="mt-4 px-5 py-2.5 bg-[#6F4E37] text-white text-xs font-semibold rounded-xl"
            >
              Start an Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
