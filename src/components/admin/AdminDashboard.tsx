import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  OrderStatus,
  ProductCategory,
  Product,
  InventoryItem,
  StoreSettings
} from '../../types';
import {
  LayoutDashboard,
  Coffee,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Bike,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    customers,
    inventory,
    settings,
    getAdminStats,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    updateInventoryItem,
    updateSettings,
    adminLogout,
    setActiveTab
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'dashboard' | 'products' | 'categories' | 'orders' | 'customers' | 'inventory' | 'sales' | 'reports' | 'settings'
  >('dashboard');

  // Orders Filter State
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | OrderStatus>('All');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<string | null>(null);

  // Products State
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<'All' | ProductCategory>('All');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCat, setNewProdCat] = useState<ProductCategory>('Coffee');
  const [newProdPrice, setNewProdPrice] = useState(150);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80');
  const [newProdTemp, setNewProdTemp] = useState<'Hot' | 'Iced' | 'Both' | 'N/A'>('Both');

  // Stats calculation
  const stats = getAdminStats();

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName.trim(),
      category: newProdCat,
      price: Number(newProdPrice),
      description: newProdDesc.trim() || 'Signature handcrafted beverage made with Philippine specialty beans.',
      image: newProdImg.trim(),
      temperature: newProdTemp,
      availableSizes: ['Regular', 'Large'],
      inStock: true
    });

    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdDesc('');
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'All' && o.status !== orderStatusFilter) return false;
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCustomer = o.customer.name.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      if (!matchId && !matchCustomer && !matchPhone) return false;
    }
    return true;
  });

  // Filtered Products
  const filteredAdminProducts = products.filter((p) => {
    if (productCatFilter !== 'All' && p.category !== productCatFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderForInvoice);

  const navItems: { id: typeof activeAdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Coffee className="w-4 h-4" /> },
    { id: 'categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory', icon: <Boxes className="w-4 h-4" /> },
    { id: 'sales', label: 'Sales Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2B1810] flex flex-col">
      {/* Admin Top Header */}
      <div className="bg-[#23140C] text-white px-4 sm:px-6 py-3.5 border-b border-[#3D2517] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#6F4E37] flex items-center justify-center text-white">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight text-white leading-none">
              Paulo Estorel Management System
            </h1>
            <p className="text-[11px] text-[#A89887] mt-0.5">
              Poblacion Makati Branch • Live Store Operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D2517] hover:bg-[#5C3A21] text-xs text-[#EFE8DC] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Store</span>
          </button>

          <button
            onClick={adminLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-900 text-rose-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admin Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 bg-white p-3 rounded-2xl border border-[#E6DAC8] shadow-2xs h-fit">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
            Navigation Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#2B1810] text-[#FDFBF7] shadow-xs'
                      : 'text-[#5C3A21] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'orders' && stats.pendingOrders > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8B5A2B] text-white">
                      {stats.pendingOrders}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeAdminTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Statistics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-[#8B5A2B] uppercase">Today&apos;s Sales</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#2B1810]">
                    ₱{stats.todaySales.toLocaleString()}
                  </p>
                  <span className="text-[10px] text-[#3D5A45] font-semibold">Active Daily Gross</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-[#8B5A2B] uppercase">Today&apos;s Orders</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#2B1810]">
                    {stats.todayOrders}
                  </p>
                  <span className="text-[10px] text-[#6F4E37]">Total tickets placed</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">Pending Orders</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-amber-900">
                    {stats.pendingOrders}
                  </p>
                  <span className="text-[10px] text-amber-700 font-semibold">In queue or brewing</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold text-[#3D5A45] uppercase">Completed Orders</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#3D5A45]">
                    {stats.completedOrders}
                  </p>
                  <span className="text-[10px] text-[#3D5A45]">Fulfilled orders</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-[#8B5A2B] uppercase">Total Products</span>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#2B1810]">
                    {stats.totalProducts}
                  </p>
                  <span className="text-[10px] text-[#6F4E37]">4 Active categories</span>
                </div>
              </div>

              {/* Quick Actions & Recent Orders Row */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                      Live Orders Monitor
                    </h3>
                    <p className="text-xs text-[#6F4E37]">
                      Real-time orders received from online customers
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveAdminTab('orders')}
                    className="text-xs font-semibold text-[#8B5A2B] hover:text-[#2B1810] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EFE8DC] text-[#8B5A2B]">
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Items</th>
                        <th className="py-2.5 px-3">Total (₱)</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFEA]">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-3 font-bold text-[#2B1810]">{order.id}</td>
                          <td className="py-3 px-3">
                            <p className="font-semibold">{order.customer.name}</p>
                            <p className="text-[10px] text-[#A89887]">{order.customer.phone}</p>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E6DAC8] rounded text-[11px]">
                              {order.orderType}
                            </span>
                          </td>
                          <td className="py-3 px-3 max-w-[160px] truncate">
                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                          </td>
                          <td className="py-3 px-3 font-serif font-bold text-[#2B1810]">
                            ₱{order.total}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                order.status === 'Completed'
                                  ? 'bg-[#3D5A45]/20 text-[#3D5A45]'
                                  : order.status === 'Ready'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'Preparing'
                                  ? 'bg-amber-100 text-amber-900'
                                  : order.status === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-stone-200 text-stone-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1">
                            {order.status === 'Pending' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Preparing')}
                                className="px-2 py-1 bg-amber-700 text-white rounded text-[10px] font-bold hover:bg-amber-800 cursor-pointer"
                              >
                                Brew
                              </button>
                            )}
                            {order.status === 'Preparing' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Ready')}
                                className="px-2 py-1 bg-blue-700 text-white rounded text-[10px] font-bold hover:bg-blue-800 cursor-pointer"
                              >
                                Ready
                              </button>
                            )}
                            {order.status === 'Ready' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'Completed')}
                                className="px-2 py-1 bg-[#3D5A45] text-white rounded text-[10px] font-bold hover:bg-[#2E4A3B] cursor-pointer"
                              >
                                Complete
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedOrderForInvoice(order.id)}
                              className="px-2 py-1 bg-[#FAF8F5] border border-[#E6DAC8] rounded text-[10px] hover:bg-[#EFE8DC] cursor-pointer"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeAdminTab === 'products' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E6DAC8]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                    Product Catalog & Stock Management
                  </h3>
                  <p className="text-xs text-[#6F4E37]">
                    Manage prices in Philippine Peso (₱), menu items, and availability
                  </p>
                </div>

                <button
                  id="admin-add-product-btn"
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2 bg-[#6F4E37] hover:bg-[#5C3A21] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl border border-[#E6DAC8]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product name..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] rounded-xl border border-[#E6DAC8]"
                  />
                </div>

                <div className="flex gap-1 overflow-x-auto">
                  {(['All', 'Coffee', 'Non-Coffee', 'Frappe', 'Food'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCatFilter(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap cursor-pointer ${
                        productCatFilter === cat
                          ? 'bg-[#2B1810] text-white'
                          : 'bg-[#FAF8F5] text-[#6F4E37] hover:bg-[#EFE8DC]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#E6DAC8] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#EFE8DC] text-[#8B5A2B]">
                        <th className="py-2.5 px-4">Item</th>
                        <th className="py-2.5 px-4">Category</th>
                        <th className="py-2.5 px-4">Price (₱)</th>
                        <th className="py-2.5 px-4">Temperature</th>
                        <th className="py-2.5 px-4">Stock Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFEA]">
                      {filteredAdminProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                              <div>
                                <p className="font-bold text-[#2B1810]">{prod.name}</p>
                                <p className="text-[10px] text-[#A89887] line-clamp-1">{prod.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{prod.category}</td>
                          <td className="py-3 px-4 font-serif font-bold text-[#2B1810]">
                            ₱{prod.price}
                          </td>
                          <td className="py-3 px-4">{prod.temperature}</td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleProductStock(prod.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                                prod.inStock
                                  ? 'bg-[#3D5A45]/20 text-[#3D5A45]'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {prod.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-md cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Product Modal */}
              {isAddProductOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E6DAC8] shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DC]">
                      <h4 className="font-serif text-xl font-bold text-[#2B1810]">
                        Add New Coffee Shop Product
                      </h4>
                      <button
                        onClick={() => setIsAddProductOpen(false)}
                        className="p-1.5 text-[#6F4E37] hover:bg-[#EFE8DC] rounded-lg"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="font-bold block mb-1">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. Hazelnut Spanish Latte"
                          className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold block mb-1">Category</label>
                          <select
                            value={newProdCat}
                            onChange={(e) => setNewProdCat(e.target.value as ProductCategory)}
                            className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                          >
                            <option value="Coffee">Coffee</option>
                            <option value="Non-Coffee">Non-Coffee</option>
                            <option value="Frappe">Frappe</option>
                            <option value="Food">Food</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold block mb-1">Price (₱ PHP) *</label>
                          <input
                            type="number"
                            required
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold block mb-1">Temperature Option</label>
                        <select
                          value={newProdTemp}
                          onChange={(e) => setNewProdTemp(e.target.value as any)}
                          className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                        >
                          <option value="Both">Both (Hot & Iced)</option>
                          <option value="Hot">Hot Only</option>
                          <option value="Iced">Iced Only</option>
                          <option value="N/A">N/A (Food / Bakery)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold block mb-1">Image URL</label>
                        <input
                          type="url"
                          value={newProdImg}
                          onChange={(e) => setNewProdImg(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="font-bold block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          placeholder="Rich espresso notes with toasted hazelnut syrup..."
                          className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddProductOpen(false)}
                          className="px-4 py-2 border border-[#E6DAC8] text-[#5C3A21] rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#6F4E37] text-white font-bold rounded-xl"
                        >
                          Save Product
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CATEGORIES */}
          {activeAdminTab === 'categories' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8]">
                <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                  Menu Categories
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  4 Active Menu Groups with live product counts
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['Coffee', 'Non-Coffee', 'Frappe', 'Food'] as ProductCategory[]).map((catName) => {
                  const count = products.filter(p => p.category === catName).length;
                  return (
                    <div key={catName} className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-xl font-bold text-[#2B1810]">
                          {catName}
                        </h4>
                        <span className="px-2.5 py-1 bg-[#EFE8DC] text-[#6F4E37] text-xs font-bold rounded-full">
                          {count} Products
                        </span>
                      </div>
                      <p className="text-xs text-[#6F4E37]">
                        {catName === 'Coffee' && 'Espresso, Americano, Cappuccino, Lattes, Caramel Macchiato, Mocha'}
                        {catName === 'Non-Coffee' && 'Artisan Chocolate, Ceremonial Matcha, Strawberry Milk, Assam Milk Tea'}
                        {catName === 'Frappe' && 'Java Chip, Caramel Frappe, Mocha Frappe, Cookies & Cream'}
                        {catName === 'Food' && 'Butter Croissant, Ham & Cheddar Sandwich, Truffle Pasta, Fries, Cakes, Cookies'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS MANAGEMENT */}
          {activeAdminTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                    Complete Orders Directory
                  </h3>
                  <p className="text-xs text-[#6F4E37]">
                    Manage order pipeline from Pending to Completed or Cancelled
                  </p>
                </div>

                {/* Status Selector Pills */}
                <div className="flex flex-wrap gap-1">
                  {(['All', 'Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                        orderStatusFilter === st
                          ? 'bg-[#2B1810] text-white'
                          : 'bg-[#FAF8F5] text-[#5C3A21] border border-[#E6DAC8]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Search */}
              <div className="bg-white p-3 rounded-2xl border border-[#E6DAC8]">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by Order ID (BNB-...), customer name, or phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] rounded-xl border border-[#E6DAC8]"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-[#E6DAC8] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#FAF8F5] border-b border-[#EFE8DC] text-[#8B5A2B]">
                        <th className="py-2.5 px-4">Order ID & Date</th>
                        <th className="py-2.5 px-4">Customer</th>
                        <th className="py-2.5 px-4">Fulfillment</th>
                        <th className="py-2.5 px-4">Items Summary</th>
                        <th className="py-2.5 px-4">Total</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4EFEA]">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-4">
                            <p className="font-bold text-[#2B1810]">{order.id}</p>
                            <p className="text-[10px] text-[#A89887]">
                              {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-semibold">{order.customer.name}</p>
                            <p className="text-[10px] text-[#A89887]">{order.customer.phone}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-[#2B1810]">{order.orderType}</span>
                            <p className="text-[10px] text-[#8B5A2B]">{order.paymentMethod}</p>
                          </td>
                          <td className="py-3 px-4 max-w-[200px] truncate">
                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                          </td>
                          <td className="py-3 px-4 font-serif font-bold text-[#2B1810]">
                            ₱{order.total}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status === 'Completed'
                                  ? 'bg-[#3D5A45]/20 text-[#3D5A45]'
                                  : order.status === 'Ready'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'Preparing'
                                  ? 'bg-amber-100 text-amber-900'
                                  : order.status === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-stone-200 text-stone-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 bg-white border border-[#E6DAC8] rounded text-[11px] font-medium"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Ready">Ready</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => setSelectedOrderForInvoice(order.id)}
                              className="p-1.5 text-[#6F4E37] hover:bg-[#EFE8DC] rounded"
                              title="Invoice View"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS */}
          {activeAdminTab === 'customers' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8]">
                <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                  Customer Database & Loyalty
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  {customers.length} registered patron records
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E6DAC8] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#EFE8DC] text-[#8B5A2B]">
                      <th className="py-2.5 px-4">Patron Name</th>
                      <th className="py-2.5 px-4">Contact & Email</th>
                      <th className="py-2.5 px-4">Address</th>
                      <th className="py-2.5 px-4">Total Orders</th>
                      <th className="py-2.5 px-4">Lifetime Spend</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4EFEA]">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-3 px-4 font-bold text-[#2B1810]">{c.name}</td>
                        <td className="py-3 px-4">
                          <p>{c.phone}</p>
                          <p className="text-[10px] text-[#A89887]">{c.email}</p>
                        </td>
                        <td className="py-3 px-4">{c.address || 'Metro Manila'}</td>
                        <td className="py-3 px-4 font-semibold">{c.totalOrders}</td>
                        <td className="py-3 px-4 font-serif font-bold text-[#2B1810]">
                          ₱{c.totalSpent.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          {c.vipStatus ? (
                            <span className="px-2 py-0.5 bg-[#8B5A2B] text-white rounded text-[10px] font-bold">
                              ★ VIP Patron
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E6DAC8] text-[#6F4E37] rounded text-[10px]">
                              Regular
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: INVENTORY */}
          {activeAdminTab === 'inventory' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                    Stock & Ingredient Inventory
                  </h3>
                  <p className="text-xs text-[#6F4E37]">
                    Monitor coffee beans, milk varieties, syrups, and packaging
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E6DAC8] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#EFE8DC] text-[#8B5A2B]">
                      <th className="py-2.5 px-4">Item Name</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Current Stock</th>
                      <th className="py-2.5 px-4">Threshold</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4EFEA]">
                    {inventory.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-3 px-4 font-bold text-[#2B1810]">{inv.name}</td>
                        <td className="py-3 px-4 font-medium text-[#6F4E37]">{inv.category}</td>
                        <td className="py-3 px-4 font-semibold text-sm">
                          {inv.quantity} {inv.unit}
                        </td>
                        <td className="py-3 px-4 text-[#A89887]">
                          Min: {inv.minThreshold} {inv.unit}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              inv.status === 'In Stock'
                                ? 'bg-[#3D5A45]/20 text-[#3D5A45]'
                                : inv.status === 'Low Stock'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => updateInventoryItem(inv.id, inv.quantity + 5, 'In Stock')}
                            className="px-2.5 py-1 bg-[#6F4E37] hover:bg-[#5C3A21] text-white rounded text-[10px] font-bold cursor-pointer"
                          >
                            +5 {inv.unit}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SALES */}
          {activeAdminTab === 'sales' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8]">
                <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                  Sales Performance & Revenue
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  Real-time gross and net metrics
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-1">
                  <span className="text-xs font-bold text-[#8B5A2B]">Total Realized Revenue</span>
                  <p className="font-serif text-2xl font-bold text-[#2B1810]">
                    ₱{stats.todaySales.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-[#3D5A45]">Active register total</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-1">
                  <span className="text-xs font-bold text-[#8B5A2B]">Average Order Value (AOV)</span>
                  <p className="font-serif text-2xl font-bold text-[#2B1810]">
                    ₱{orders.length ? Math.round(stats.todaySales / orders.length) : 0}
                  </p>
                  <p className="text-[10px] text-[#6F4E37]">Per customer basket</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-1">
                  <span className="text-xs font-bold text-[#8B5A2B]">Delivery vs. Pickup</span>
                  <p className="font-serif text-2xl font-bold text-[#2B1810]">
                    65% / 35%
                  </p>
                  <p className="text-[10px] text-[#6F4E37]">Delivery dominance</p>
                </div>
              </div>

              {/* Best Selling Beverage Ranking */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-3">
                <h4 className="font-serif text-base font-bold text-[#2B1810]">
                  Top Revenue Drivers
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="font-bold">1. Spanish Latte (Benguet Blend)</span>
                    <span className="font-serif font-bold text-[#6F4E37]">₱4,250 sales</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="font-bold">2. Uji Matcha Latte</span>
                    <span className="font-serif font-bold text-[#6F4E37]">₱2,960 sales</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="font-bold">3. Butter Croissant (Fresh Baked)</span>
                    <span className="font-serif font-bold text-[#6F4E37]">₱2,160 sales</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF8F5]">
                    <span className="font-bold">4. Java Chip Frappe</span>
                    <span className="font-serif font-bold text-[#6F4E37]">₱1,950 sales</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {activeAdminTab === 'reports' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                    Operations & Financial Reports
                  </h3>
                  <p className="text-xs text-[#6F4E37]">
                    Export CSV reports and audit daily tickets
                  </p>
                </div>

                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + "Order ID,Customer,Total,Status\n"
                      + orders.map(e => `${e.id},${e.customer.name},${e.total},${e.status}`).join("\n");
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `paulo_estorel_orders_${new Date().toISOString().split('T')[0]}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-[#2B1810] hover:bg-[#3D2517] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Orders CSV</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-2 text-xs">
                  <h4 className="font-serif text-base font-bold text-[#2B1810]">
                    Daily Shift Summary
                  </h4>
                  <p className="text-[#6F4E37]">
                    Total Orders: <strong className="text-[#2B1810]">{orders.length}</strong>
                  </p>
                  <p className="text-[#6F4E37]">
                    Total Revenue: <strong className="text-[#2B1810]">₱{stats.todaySales}</strong>
                  </p>
                  <p className="text-[#6F4E37]">
                    Active Barista Shift: <strong className="text-[#2B1810]">Morning & Afternoon Crew</strong>
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6DAC8] space-y-2 text-xs">
                  <h4 className="font-serif text-base font-bold text-[#2B1810]">
                    Compliance & Sanitation
                  </h4>
                  <p className="text-[#3D5A45] font-semibold">
                    ✓ Espresso machine backflushed and calibrated
                  </p>
                  <p className="text-[#3D5A45] font-semibold">
                    ✓ Refrigerator temperature log checked (3.5°C)
                  </p>
                  <p className="text-[#3D5A45] font-semibold">
                    ✓ Davao cacao and Benguet bean silos inspected
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-4 rounded-2xl border border-[#E6DAC8]">
                <h3 className="font-serif text-lg font-bold text-[#2B1810]">
                  Store Settings & Ordering Parameters
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  Configure store operational hours, delivery rates, and store contact info
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E6DAC8] space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Store Name</label>
                    <input
                      type="text"
                      value={settings.storeName}
                      onChange={(e) => updateSettings({ storeName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Hotline / Phone</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Flat Delivery Fee (₱)</label>
                    <input
                      type="number"
                      value={settings.deliveryFee}
                      onChange={(e) => updateSettings({ deliveryFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#6F4E37] block mb-1">Free Delivery Threshold (₱)</label>
                    <input
                      type="number"
                      value={settings.freeDeliveryThreshold}
                      onChange={(e) => updateSettings({ freeDeliveryThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#6F4E37] block mb-1">Store Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5]"
                  />
                </div>

                <div className="pt-3 border-t border-[#EFE8DC]">
                  <label className="font-bold text-[#6F4E37] block mb-1">Admin Portal Password</label>
                  <div className="max-w-xs">
                    <input
                      type="text"
                      value={settings.adminPassword || '12345'}
                      onChange={(e) => updateSettings({ adminPassword: e.target.value })}
                      placeholder="e.g. 12345"
                      className="w-full px-3 py-2 border border-[#E6DAC8] rounded-xl bg-[#FAF8F5] font-mono text-sm"
                    />
                    <p className="text-[11px] text-[#A89887] mt-1">
                      Current password used to access this Admin Dashboard.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#2B1810] text-sm">Accepting Online Orders</p>
                    <p className="text-[#6F4E37] text-[11px]">When turned off, customers cannot checkout</p>
                  </div>
                  <button
                    onClick={() => updateSettings({ isAcceptingOrders: !settings.isAcceptingOrders })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      settings.isAcceptingOrders ? 'bg-[#3D5A45] text-white' : 'bg-rose-700 text-white'
                    }`}
                  >
                    {settings.isAcceptingOrders ? 'Store Active' : 'Store Paused'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice / Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E6DAC8] shadow-2xl text-[#2B1810] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE8DC]">
              <div>
                <span className="text-xs font-bold text-[#8B5A2B]">Invoice Details</span>
                <h4 className="font-serif text-xl font-bold">Order #{selectedOrder.id}</h4>
              </div>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="p-1.5 text-[#6F4E37] hover:bg-[#EFE8DC] rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#FAF8F5] p-3 rounded-xl space-y-1">
                <p><strong>Customer:</strong> {selectedOrder.customer.name}</p>
                <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                <p><strong>Fulfillment:</strong> {selectedOrder.orderType}</p>
                {selectedOrder.customer.address && (
                  <p><strong>Address:</strong> {selectedOrder.customer.address}</p>
                )}
                <p><strong>Status:</strong> {selectedOrder.status}</p>
              </div>

              <div className="divide-y divide-[#F4EFEA]">
                {selectedOrder.items.map((i, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span>{i.quantity}x {i.name}</span>
                    <span className="font-bold">₱{i.unitPrice * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EFE8DC] flex justify-between text-sm font-bold">
                <span>Grand Total:</span>
                <span className="font-serif text-[#6F4E37] text-base">₱{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
