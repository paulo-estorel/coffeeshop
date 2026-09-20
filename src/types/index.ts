export type ProductCategory = 'Coffee' | 'Non-Coffee' | 'Frappe' | 'Food';

export type TemperatureOption = 'Hot' | 'Iced' | 'Both' | 'N/A';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in PHP (₱)
  description: string;
  image: string;
  temperature: TemperatureOption;
  availableSizes?: ('Regular' | 'Large')[];
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  calories?: number;
}

export interface CartItemOption {
  temperature?: 'Hot' | 'Iced';
  size?: 'Regular' | 'Large';
  sweetness?: '0%' | '25%' | '50%' | '100%';
  milk?: 'Regular Milk' | 'Oat Milk (+₱30)' | 'Almond Milk (+₱30)';
  addOns?: string[];
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item uuid in cart
  productId: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  image: string;
  category: ProductCategory;
  options: CartItemOption;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';

export type OrderType = 'Pickup' | 'Delivery';

export type PaymentMethod = 'Cash on Pickup / Delivery' | 'GCash' | 'Maya' | 'Credit / Debit Card';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  notes?: string;
}

export interface Order {
  id: string; // e.g. BNB-2026-1042
  createdAt: string; // ISO string
  customer: CustomerInfo;
  items: CartItem[];
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedTime?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  vipStatus: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Beans' | 'Dairy & Alternatives' | 'Syrups & Flavors' | 'Bakery & Ingredients' | 'Packaging';
  quantity: number;
  unit: string;
  minThreshold: number;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  lastRestocked: string;
}

export interface CategorySummary {
  id: string;
  name: ProductCategory;
  description: string;
  iconName: string;
  itemCount: number;
}

export interface AdminStats {
  todaySales: number;
  todayOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  openingHours: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  isAcceptingOrders: boolean;
  orderNotificationSound: boolean;
  adminPassword?: string;
}
