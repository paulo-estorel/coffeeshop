import { Product, CategorySummary, Order, CustomerRecord, InventoryItem, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // COFFEE
  {
    id: 'prod-esp-01',
    name: 'Espresso',
    category: 'Coffee',
    price: 110,
    description: 'Rich and intense double shot extracted from our signature Benguet Arabica & Robusta blend.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    temperature: 'Hot',
    availableSizes: ['Regular'],
    inStock: true,
    featured: false,
    tags: ['Signature', 'Bold'],
    calories: 10
  },
  {
    id: 'prod-ame-02',
    name: 'Americano',
    category: 'Coffee',
    price: 130,
    description: 'Freshly pulled espresso shots diluted with hot water or poured over ice for a smooth, deep coffee notes.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Classic', 'Low Calorie'],
    calories: 15
  },
  {
    id: 'prod-cap-03',
    name: 'Cappuccino',
    category: 'Coffee',
    price: 155,
    description: 'Balanced harmony of bold espresso, velvety steamed milk, and a thick, luxurious layer of microfoam.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    temperature: 'Hot',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Best Seller', 'Velvety'],
    calories: 140
  },
  {
    id: 'prod-lat-04',
    name: 'Cafe Latte',
    category: 'Coffee',
    price: 160,
    description: 'Silky espresso combined with generous textured whole milk, topped with delicate barista latte art.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Popular', 'Creamy'],
    calories: 180
  },
  {
    id: 'prod-spa-05',
    name: 'Spanish Latte',
    category: 'Coffee',
    price: 175,
    description: 'Our customer favorite: Bold espresso blended with sweetened condensed milk and silky fresh milk for caramel sweetness.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Top Favorite', 'Sweet & Bold'],
    calories: 230
  },
  {
    id: 'prod-car-06',
    name: 'Caramel Macchiato',
    category: 'Coffee',
    price: 185,
    description: 'Steamed milk stained with espresso, infused with vanilla bean syrup and topped with decadent caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Sweet', 'Decadent'],
    calories: 250
  },
  {
    id: 'prod-moc-07',
    name: 'Mocha',
    category: 'Coffee',
    price: 180,
    description: 'Dark Belgian chocolate ganache melted into espresso shots and steamed milk, finished with cocoa dusting.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Chocolatey', 'Comforting'],
    calories: 280
  },

  // NON-COFFEE
  {
    id: 'prod-cho-08',
    name: 'Chocolate',
    category: 'Non-Coffee',
    price: 150,
    description: 'Rich Davao artisan dark chocolate melted with sweet dairy and steamed to silky perfection.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Rich', 'Comfort'],
    calories: 260
  },
  {
    id: 'prod-mat-09',
    name: 'Matcha Latte',
    category: 'Non-Coffee',
    price: 185,
    description: 'Ceremonial grade Uji Japanese matcha whisked with fresh milk and a hint of organic cane sweetener.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Uji Matcha', 'Antioxidant'],
    calories: 190
  },
  {
    id: 'prod-str-10',
    name: 'Strawberry Milk',
    category: 'Non-Coffee',
    price: 170,
    description: 'House-made La Trinidad strawberry compote layered with cold whole milk and fresh strawberry slices.',
    image: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80',
    temperature: 'Iced',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Fruity', 'Refreshing'],
    calories: 210
  },
  {
    id: 'prod-mil-11',
    name: 'Milk Tea',
    category: 'Non-Coffee',
    price: 140,
    description: 'Brewed premium black Assam tea leaves slow-steeped, blended with silky milk and brown sugar syrup.',
    image: 'https://images.unsplash.com/photo-1558857563-b37cfb95f242?auto=format&fit=crop&w=600&q=80',
    temperature: 'Both',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Assam Tea', 'Crowd-Pleaser'],
    calories: 220
  },

  // FRAPPE
  {
    id: 'prod-jav-12',
    name: 'Java Chip',
    category: 'Frappe',
    price: 195,
    description: 'Blended espresso, chocolate chips, mocha sauce, and milk, capped with whipped cream and chocolate curl flakes.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    temperature: 'Iced',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Crunchy', 'Indulgent'],
    calories: 380
  },
  {
    id: 'prod-crf-13',
    name: 'Caramel Frappe',
    category: 'Frappe',
    price: 195,
    description: 'Creamy blended coffee frappe swirled with buttery sea-salt caramel sauce, whipped cream, and caramel drizzle.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    temperature: 'Iced',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Sweet', 'Caramel'],
    calories: 390
  },
  {
    id: 'prod-mof-14',
    name: 'Mocha Frappe',
    category: 'Frappe',
    price: 190,
    description: 'Frosty blended coffee with rich dark cocoa fudge, topped with airy vanilla whipped cream.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    temperature: 'Iced',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: false,
    tags: ['Cold Brew', 'Cocoa'],
    calories: 370
  },
  {
    id: 'prod-ckc-15',
    name: 'Cookies & Cream',
    category: 'Frappe',
    price: 195,
    description: 'Thick vanilla cream frappe blended with crushed chocolate cookies, topped with cookie crumble and sweet cream.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    temperature: 'Iced',
    availableSizes: ['Regular', 'Large'],
    inStock: true,
    featured: true,
    tags: ['Cookie Crumble', 'Kid-Friendly'],
    calories: 410
  },

  // FOOD
  {
    id: 'prod-cro-16',
    name: 'Croissant',
    category: 'Food',
    price: 120,
    description: 'All-butter French pastry baked fresh each morning. Flaky golden crust with airy, honeycombed layers.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: true,
    tags: ['Fresh Daily', 'French Butter'],
    calories: 270
  },
  {
    id: 'prod-san-17',
    name: 'Sandwich',
    category: 'Food',
    price: 210,
    description: 'Artisan sourdough grilled sandwich with smoked honey ham, aged cheddar, crisp greens, and Dijon aioli.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: false,
    tags: ['Savory', 'Filling'],
    calories: 420
  },
  {
    id: 'prod-pas-18',
    name: 'Pasta',
    category: 'Food',
    price: 240,
    description: 'Al dente fettuccine tossed in aromatic creamy truffle mushroom sauce with shaved parmesan and fresh parsley.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628165e?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: true,
    tags: ['Chef Pick', 'Creamy Truffle'],
    calories: 510
  },
  {
    id: 'prod-fri-19',
    name: 'French Fries',
    category: 'Food',
    price: 120,
    description: 'Crispy skin-on potato fries tossed in aromatic truffle oil, parmesan dust, and fresh rosemary sprigs.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: false,
    tags: ['Crispy', 'Snack'],
    calories: 340
  },
  {
    id: 'prod-cak-20',
    name: 'Cake',
    category: 'Food',
    price: 180,
    description: 'Decadent Basque burnt cheesecake slice with a caramelized exterior and an ultra-creamy, molten core.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: true,
    tags: ['Signature Dessert', 'Melt-in-Mouth'],
    calories: 380
  },
  {
    id: 'prod-coo-21',
    name: 'Cookies',
    category: 'Food',
    price: 85,
    description: 'Chewy, warm brown-butter cookie studded with 70% dark chocolate chunks and flaky sea salt.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    temperature: 'N/A',
    inStock: true,
    featured: false,
    tags: ['Chewy', 'Dark Chocolate'],
    calories: 220
  }
];

export const INITIAL_CATEGORIES: CategorySummary[] = [
  {
    id: 'cat-1',
    name: 'Coffee',
    description: 'Espresso-based classics and single-origin handcrafted brews',
    iconName: 'Coffee',
    itemCount: 7
  },
  {
    id: 'cat-2',
    name: 'Non-Coffee',
    description: 'Rich chocolates, authentic Japanese matchas, and fresh milks',
    iconName: 'Sparkles',
    itemCount: 4
  },
  {
    id: 'cat-3',
    name: 'Frappe',
    description: 'Ice-blended indulgence topped with luscious whipped cream',
    iconName: 'IceCream',
    itemCount: 4
  },
  {
    id: 'cat-4',
    name: 'Food',
    description: 'Freshly baked viennoiserie, gourmet sandwiches, and pasta',
    iconName: 'UtensilsCrossed',
    itemCount: 6
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BNB-2026-1042',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
    customer: {
      name: 'Maria Santos',
      phone: '09171234567',
      email: 'maria.santos@gmail.com',
      address: 'Tower 2, Unit 14B, Salcedo Village',
      city: 'Makati City',
      notes: 'Please buzz unit 14B at lobby'
    },
    items: [
      {
        id: 'cart-1',
        productId: 'prod-spa-05',
        name: 'Spanish Latte',
        basePrice: 175,
        unitPrice: 200,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
        category: 'Coffee',
        options: {
          temperature: 'Iced',
          size: 'Large',
          sweetness: '50%',
          milk: 'Regular Milk',
          addOns: ['Caramel Drizzle']
        }
      },
      {
        id: 'cart-2',
        productId: 'prod-cro-16',
        name: 'Croissant',
        basePrice: 120,
        unitPrice: 120,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
        category: 'Food',
        options: {
          specialInstructions: 'Warm it up please'
        }
      }
    ],
    orderType: 'Delivery',
    paymentMethod: 'GCash',
    subtotal: 640,
    deliveryFee: 49,
    discount: 0,
    total: 689,
    status: 'Preparing',
    estimatedTime: '15-20 mins'
  },
  {
    id: 'BNB-2026-1041',
    createdAt: new Date(Date.now() - 50 * 60000).toISOString(),
    customer: {
      name: 'Carlos Reyes',
      phone: '09189876543',
      email: 'carlos.reyes@yahoo.com'
    },
    items: [
      {
        id: 'cart-3',
        productId: 'prod-car-06',
        name: 'Caramel Macchiato',
        basePrice: 185,
        unitPrice: 185,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80',
        category: 'Coffee',
        options: {
          temperature: 'Hot',
          size: 'Regular',
          sweetness: '25%'
        }
      },
      {
        id: 'cart-4',
        productId: 'prod-cak-20',
        name: 'Cake',
        basePrice: 180,
        unitPrice: 180,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
        category: 'Food',
        options: {}
      }
    ],
    orderType: 'Pickup',
    paymentMethod: 'Cash on Pickup / Delivery',
    subtotal: 365,
    deliveryFee: 0,
    discount: 0,
    total: 365,
    status: 'Ready',
    estimatedTime: 'Ready at Counter'
  },
  {
    id: 'BNB-2026-1040',
    createdAt: new Date(Date.now() - 95 * 60000).toISOString(),
    customer: {
      name: 'Alyssa Valdez',
      phone: '09205551234',
      email: 'alyssa.v@outlook.com',
      address: '24 Jupiter St, Bel-Air',
      city: 'Makati City'
    },
    items: [
      {
        id: 'cart-5',
        productId: 'prod-mat-09',
        name: 'Matcha Latte',
        basePrice: 185,
        unitPrice: 215,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
        category: 'Non-Coffee',
        options: {
          temperature: 'Iced',
          size: 'Regular',
          milk: 'Oat Milk (+₱30)'
        }
      },
      {
        id: 'cart-6',
        productId: 'prod-pas-18',
        name: 'Pasta',
        basePrice: 240,
        unitPrice: 240,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628165e?auto=format&fit=crop&w=600&q=80',
        category: 'Food',
        options: {}
      }
    ],
    orderType: 'Delivery',
    paymentMethod: 'Maya',
    subtotal: 455,
    deliveryFee: 49,
    discount: 0,
    total: 504,
    status: 'Completed'
  },
  {
    id: 'BNB-2026-1039',
    createdAt: new Date(Date.now() - 140 * 60000).toISOString(),
    customer: {
      name: 'Gabriel Mendoza',
      phone: '09194443322',
      email: 'gmendoza@techcorp.ph'
    },
    items: [
      {
        id: 'cart-7',
        productId: 'prod-jav-12',
        name: 'Java Chip',
        basePrice: 195,
        unitPrice: 220,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
        category: 'Frappe',
        options: {
          size: 'Large'
        }
      }
    ],
    orderType: 'Pickup',
    paymentMethod: 'Credit / Debit Card',
    subtotal: 440,
    deliveryFee: 0,
    discount: 0,
    total: 440,
    status: 'Pending',
    estimatedTime: '10-15 mins'
  }
];

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust-1',
    name: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    phone: '09171234567',
    address: 'Salcedo Village, Makati',
    totalOrders: 14,
    totalSpent: 4890,
    lastOrderDate: 'Today',
    vipStatus: true
  },
  {
    id: 'cust-2',
    name: 'Carlos Reyes',
    email: 'carlos.reyes@yahoo.com',
    phone: '09189876543',
    address: 'San Antonio, Makati',
    totalOrders: 6,
    totalSpent: 1980,
    lastOrderDate: 'Today',
    vipStatus: false
  },
  {
    id: 'cust-3',
    name: 'Alyssa Valdez',
    email: 'alyssa.v@outlook.com',
    phone: '09205551234',
    address: 'Bel-Air, Makati',
    totalOrders: 21,
    totalSpent: 7650,
    lastOrderDate: 'Today',
    vipStatus: true
  },
  {
    id: 'cust-4',
    name: 'Gabriel Mendoza',
    email: 'gmendoza@techcorp.ph',
    phone: '09194443322',
    address: 'Legazpi Village, Makati',
    totalOrders: 9,
    totalSpent: 3120,
    lastOrderDate: 'Today',
    vipStatus: false
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Benguet Arabica Beans (Whole)',
    category: 'Beans',
    quantity: 18.5,
    unit: 'kg',
    minThreshold: 5.0,
    status: 'In Stock',
    lastRestocked: '2026-09-15'
  },
  {
    id: 'inv-2',
    name: 'Sagada Dark Roast Beans',
    category: 'Beans',
    quantity: 3.2,
    unit: 'kg',
    minThreshold: 4.0,
    status: 'Low Stock',
    lastRestocked: '2026-09-12'
  },
  {
    id: 'inv-3',
    name: 'Fresh Whole Milk',
    category: 'Dairy & Alternatives',
    quantity: 34,
    unit: 'Liters',
    minThreshold: 10,
    status: 'In Stock',
    lastRestocked: '2026-09-18'
  },
  {
    id: 'inv-4',
    name: 'Barista Oat Milk (Oatly)',
    category: 'Dairy & Alternatives',
    quantity: 12,
    unit: 'Liters',
    minThreshold: 6,
    status: 'In Stock',
    lastRestocked: '2026-09-17'
  },
  {
    id: 'inv-5',
    name: 'Vanilla Bean Syrup',
    category: 'Syrups & Flavors',
    quantity: 5,
    unit: 'Bottles (750ml)',
    minThreshold: 2,
    status: 'In Stock',
    lastRestocked: '2026-09-10'
  },
  {
    id: 'inv-6',
    name: 'Caramel Sauce Drizzle',
    category: 'Syrups & Flavors',
    quantity: 1,
    unit: 'Bottle (1L)',
    minThreshold: 2,
    status: 'Critical',
    lastRestocked: '2026-09-08'
  },
  {
    id: 'inv-7',
    name: 'Uji Matcha Ceremonial Powder',
    category: 'Syrups & Flavors',
    quantity: 1.8,
    unit: 'kg',
    minThreshold: 0.5,
    status: 'In Stock',
    lastRestocked: '2026-09-14'
  },
  {
    id: 'inv-8',
    name: 'Butter Croissant Dough (Frozen)',
    category: 'Bakery & Ingredients',
    quantity: 45,
    unit: 'Pieces',
    minThreshold: 15,
    status: 'In Stock',
    lastRestocked: '2026-09-16'
  },
  {
    id: 'inv-9',
    name: 'Biodegradable Takeout Cups 16oz',
    category: 'Packaging',
    quantity: 380,
    unit: 'Units',
    minThreshold: 100,
    status: 'In Stock',
    lastRestocked: '2026-09-11'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Paulo Estorel Coffee Shop',
  tagline: 'Artisan specialty coffee & freshly baked fare in Poblacion',
  phone: '+63 2 8123 4567 / 0917 555 BEAN',
  email: 'hello@pauloestorelcoffee.ph',
  address: '128 Roastcraft Boulevard, Poblacion, Makati City, Metro Manila',
  openingHours: 'Monday – Sunday: 7:00 AM – 10:00 PM',
  deliveryFee: 49,
  freeDeliveryThreshold: 600,
  isAcceptingOrders: true,
  orderNotificationSound: true,
  adminPassword: '12345'
};
