// Mock data for development and testing
import headphonesImg from '@/assets/headphones.jpg';
import smartwatchImg from '@/assets/smartwatch.jpg';
import leatherBagImg from '@/assets/leather-bag.jpg';
import deskLampImg from '@/assets/desk-lamp.jpg';
import gatsbyBookImg from '@/assets/gatsby-book.jpg';
import pythonBookImg from '@/assets/python-book.jpg';
import runningShoesImg from '@/assets/running-shoes.jpg';
import casualShoesImg from '@/assets/casual-shoes.jpg';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface ProductSupplier {
  id: string;
  name: string;
  price: number;
  rating: number;
  deliveryTime: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  sku?: string;
  manufacturer?: string;
  supplier?: string;
  variants?: ProductVariant[];
  suppliers?: ProductSupplier[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
}

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 299.99,
    image: headphonesImg,
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    reviews: 342,
    sku: 'WH-1000XM5',
    manufacturer: 'AudioTech',
    supplier: 'TechSupply Co',
    variants: [
      { id: 'v1-black', name: 'Black', price: 299.99, inStock: true },
      { id: 'v1-silver', name: 'Silver', price: 319.99, inStock: true },
      { id: 'v1-blue', name: 'Blue', price: 309.99, inStock: false },
    ],
    suppliers: [
      { id: 's1', name: 'TechSupply Co', price: 299.99, rating: 4.8, deliveryTime: '2-3 days' },
      { id: 's2', name: 'ElectroHub', price: 289.99, rating: 4.6, deliveryTime: '4-5 days' },
      { id: 's3', name: 'GadgetWorld', price: 310.00, rating: 4.9, deliveryTime: '1-2 days' },
    ],
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 399.99,
    image: smartwatchImg,
    category: 'Electronics',
    inStock: true,
    rating: 4.6,
    reviews: 289,
    sku: 'SW-PRO-2024',
    manufacturer: 'FitTrack',
    supplier: 'TechSupply Co',
    variants: [
      { id: 'v2-40mm', name: '40mm', price: 399.99, inStock: true },
      { id: 'v2-44mm', name: '44mm', price: 449.99, inStock: true },
    ],
    suppliers: [
      { id: 's1', name: 'TechSupply Co', price: 399.99, rating: 4.7, deliveryTime: '2-3 days' },
      { id: 's4', name: 'WearableTech', price: 389.99, rating: 4.5, deliveryTime: '5-7 days' },
    ],
  },
  {
    id: '3',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag with laptop compartment',
    price: 189.99,
    image: leatherBagImg,
    category: 'Accessories',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    sku: 'LMB-BR-001',
    manufacturer: 'LeatherCraft',
    supplier: 'Fashion Goods Ltd',
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 79.99,
    image: deskLampImg,
    category: 'Home',
    inStock: false,
    rating: 4.5,
    reviews: 98,
    sku: 'DL-MIN-LED',
    manufacturer: 'LightWorks',
    supplier: 'Home Essentials',
  },
  {
    id: '5',
    name: 'The Great Gatsby Book',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 14.99,
    image: gatsbyBookImg,
    category: 'Books',
    inStock: true,
    rating: 4.7,
    reviews: 523,
    sku: 'ISBN-978-0743273565',
    manufacturer: 'Scribner Publishing',
    supplier: 'BookWorld Distributors',
  },
  {
    id: '6',
    name: 'Python Programming Book',
    description: 'Complete guide to Python programming for beginners',
    price: 39.99,
    image: pythonBookImg,
    category: 'Books',
    inStock: true,
    rating: 4.8,
    reviews: 234,
    sku: 'ISBN-978-1593279288',
    manufacturer: 'Tech Press',
    supplier: 'BookWorld Distributors',
  },
  {
    id: '7',
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with cushioned sole',
    price: 129.99,
    image: runningShoesImg,
    category: 'Footwear',
    inStock: true,
    rating: 4.6,
    reviews: 412,
    sku: 'RS-PRO-BLK-42',
    manufacturer: 'SportFit',
    supplier: 'Athletic Gear Co',
  },
  {
    id: '8',
    name: 'Casual Leather Shoes',
    description: 'Comfortable leather shoes for everyday wear',
    price: 89.99,
    image: casualShoesImg,
    category: 'Footwear',
    inStock: true,
    rating: 4.4,
    reviews: 187,
    sku: 'CLS-LTH-BRN-41',
    manufacturer: 'ClassicWear',
    supplier: 'Athletic Gear Co',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    total: 299.99,
    status: 'delivered',
    items: [
      {
        productId: '1',
        productName: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99,
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    total: 589.98,
    status: 'shipped',
    items: [
      {
        productId: '2',
        productName: 'Smart Watch Pro',
        quantity: 1,
        price: 399.99,
      },
      {
        productId: '3',
        productName: 'Leather Messenger Bag',
        quantity: 1,
        price: 189.99,
      },
    ],
  },
];

// Mock API functions
export const mockApi = {
  login: async (userId: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (userId && password) {
      return { success: true, user: mockUser, token: 'mock-token-123' };
    }
    throw new Error('Invalid credentials');
  },

  getUserRecommendations: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.slice(0, 3);
  },

  searchProducts: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  getProduct: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(p => p.id === id);
  },

  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  },

  supplierLogin: async (userId: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (userId && password) {
      return { 
        success: true, 
        supplier: { id: '1', name: 'Supplier Co', email: 'supplier@example.com' }, 
        token: 'supplier-token-123' 
      };
    }
    throw new Error('Invalid credentials');
  },
};
