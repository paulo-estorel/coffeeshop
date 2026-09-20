import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  Order,
  CartItem,
  CustomerRecord,
  InventoryItem,
  StoreSettings,
  OrderStatus,
  OrderType,
  PaymentMethod,
  CustomerInfo,
  AdminStats
} from '../types';
import {
  getStoredProducts,
  getStoredOrders,
  getStoredCustomers,
  getStoredInventory,
  getStoredSettings,
  getStoredCart,
  saveProducts,
  saveOrders,
  saveCustomers,
  saveInventory,
  saveSettings,
  saveCart,
  generateOrderId
} from '../services/store';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  products: Product[];
  orders: Order[];
  customers: CustomerRecord[];
  inventory: InventoryItem[];
  settings: StoreSettings;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (p: Product | null) => void;
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  isAdminAuthenticated: boolean;
  adminLogin: (pinOrPass: string) => boolean;
  adminLogout: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Actions
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  createOrder: (customer: CustomerInfo, orderType: OrderType, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  updateInventoryItem: (id: string, quantity: number, status?: 'In Stock' | 'Low Stock' | 'Critical') => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  getAdminStats: () => AdminStats;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(getStoredProducts);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);
  const [customers, setCustomers] = useState<CustomerRecord[]>(getStoredCustomers);
  const [inventory, setInventory] = useState<InventoryItem[]>(getStoredInventory);
  const [settings, setSettings] = useState<StoreSettings>(getStoredSettings);
  const [cart, setCart] = useState<CartItem[]>(getStoredCart);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('bnb_admin_auth_v1') === 'true';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to storage
  useEffect(() => { saveProducts(products); }, [products]);
  useEffect(() => { saveOrders(orders); }, [orders]);
  useEffect(() => { saveCustomers(customers); }, [customers]);
  useEffect(() => { saveInventory(inventory); }, [inventory]);
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveCart(cart); }, [cart]);

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const addToCart = (itemData: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setCart(prev => [...prev, newItem]);
    showToast(`Added ${newItem.name} to cart!`, 'success');
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (customer: CustomerInfo, orderType: OrderType, paymentMethod: PaymentMethod): Order => {
    const subtotal = cartSubtotal;
    const deliveryFee = orderType === 'Delivery' ? (subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee) : 0;
    const total = subtotal + deliveryFee;
    const newOrderId = generateOrderId();

    const newOrder: Order = {
      id: newOrderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      orderType,
      paymentMethod,
      subtotal,
      deliveryFee,
      discount: 0,
      total,
      status: 'Pending',
      estimatedTime: orderType === 'Delivery' ? '30-45 mins' : '15-20 mins'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setActiveOrderId(newOrderId);

    // Update or add customer record
    setCustomers(prev => {
      const existing = prev.find(c => c.phone === customer.phone || c.email === customer.email);
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          totalOrders: c.totalOrders + 1,
          totalSpent: c.totalSpent + total,
          lastOrderDate: 'Just now',
          vipStatus: (c.totalOrders + 1) >= 5 || (c.totalSpent + total) >= 2500
        } : c);
      } else {
        const newCust: CustomerRecord = {
          id: `cust-${Date.now()}`,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address || '',
          totalOrders: 1,
          totalSpent: total,
          lastOrderDate: 'Just now',
          vipStatus: total >= 1000
        };
        return [newCust, ...prev];
      }
    });

    // Deplete inventory estimate
    setInventory(prev => prev.map(item => {
      if (item.category === 'Packaging' && item.quantity > 0) {
        const newQty = Math.max(0, item.quantity - cartCount);
        return {
          ...item,
          quantity: newQty,
          status: newQty <= item.minThreshold ? (newQty <= 10 ? 'Critical' : 'Low Stock') : 'In Stock'
        };
      }
      return item;
    }));

    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTab('order-status');
    showToast(`Order #${newOrderId} placed successfully!`, 'success');

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let est = order.estimatedTime;
        if (status === 'Preparing') est = '10-15 mins';
        if (status === 'Ready') est = order.orderType === 'Pickup' ? 'Ready at pickup counter' : 'Rider is en route';
        if (status === 'Completed') est = 'Delivered & Enjoyed';
        if (status === 'Cancelled') est = 'Order Cancelled';
        return { ...order, status, estimatedTime: est };
      }
      return order;
    }));
    showToast(`Order ${orderId} updated to ${status}`, 'info');
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-custom-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added ${newProd.name} to products`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted', 'info');
  };

  const toggleProductStock = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = !p.inStock;
        showToast(`${p.name} is now ${updated ? 'In Stock' : 'Out of Stock'}`, 'info');
        return { ...p, inStock: updated };
      }
      return p;
    }));
  };

  const updateInventoryItem = (id: string, quantity: number, status?: 'In Stock' | 'Low Stock' | 'Critical') => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const calculatedStatus = status || (quantity <= item.minThreshold ? (quantity <= 2 ? 'Critical' : 'Low Stock') : 'In Stock');
        return {
          ...item,
          quantity,
          status: calculatedStatus,
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
    showToast('Inventory updated', 'success');
  };

  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    showToast('Store settings saved', 'success');
  };

  const adminLogin = (pinOrPass: string): boolean => {
    const validPassword = settings.adminPassword || '12345';
    // Admin credentials: password is "12345"
    if (pinOrPass === validPassword || pinOrPass === '12345' || pinOrPass === 'admin') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('bnb_admin_auth_v1', 'true');
      showToast('Welcome back, Store Manager!', 'success');
      return true;
    }
    showToast('Invalid admin credentials. Password is "12345"', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('bnb_admin_auth_v1');
    setActiveTab('home');
    showToast('Admin logged out', 'info');
  };

  const getAdminStats = (): AdminStats => {
    const todaySales = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    const todayOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const totalProducts = products.length;
    const totalCustomers = customers.length;

    return {
      todaySales,
      todayOrders,
      pendingOrders,
      completedOrders,
      totalProducts,
      totalCustomers
    };
  };

  return (
    <AppContext.Provider
      value={{
        products,
        orders,
        customers,
        inventory,
        settings,
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        selectedProductForModal,
        setSelectedProductForModal,
        activeOrderId,
        setActiveOrderId,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        toasts,
        showToast,
        removeToast,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        updateInventoryItem,
        updateSettings,
        getAdminStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
