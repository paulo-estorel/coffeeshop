import { useState, useEffect } from 'react';
import { Product, Order, CartItem, CustomerRecord, InventoryItem, StoreSettings, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_INVENTORY, INITIAL_SETTINGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'bnb_products_v1',
  ORDERS: 'bnb_orders_v1',
  CUSTOMERS: 'bnb_customers_v1',
  INVENTORY: 'bnb_inventory_v1',
  SETTINGS: 'bnb_settings_v1',
  CART: 'bnb_cart_v1',
  ADMIN_AUTH: 'bnb_admin_auth_v1',
  LAST_ORDER_ID: 'bnb_last_order_id'
};

// Database Connector Interface Hook:
// If connecting to PostgreSQL / Cloud SQL / Supabase or Firebase Firestore,
// replace the localStorage read/writes in this repository with async API calls:
// e.g. fetch('/api/orders', { method: 'POST', body: JSON.stringify(order) })

export const getStoredProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

export const getStoredOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
};

export const getStoredCustomers = (): CustomerRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : INITIAL_CUSTOMERS;
  } catch {
    return INITIAL_CUSTOMERS;
  }
};

export const getStoredInventory = (): InventoryItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return data ? JSON.parse(data) : INITIAL_INVENTORY;
  } catch {
    return INITIAL_INVENTORY;
  }
};

export const getStoredSettings = (): StoreSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return INITIAL_SETTINGS;
    const parsed = JSON.parse(data);
    if (parsed.storeName?.includes('Brew & Bean')) {
      parsed.storeName = 'Paulo Estorel Coffee Shop';
      parsed.email = 'hello@pauloestorelcoffee.ph';
    }
    if (!parsed.adminPassword) {
      parsed.adminPassword = '12345';
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed));
    return parsed;
  } catch {
    return INITIAL_SETTINGS;
  }
};

export const getStoredCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
};

export const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const saveCustomers = (customers: CustomerRecord[]) => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
};

export const saveInventory = (inv: InventoryItem[]) => {
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inv));
};

export const saveSettings = (settings: StoreSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `BNB-2026-${randomNum}`;
}
