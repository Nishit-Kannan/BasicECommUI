// Mock data for development and testing

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
    image: '/placeholder.svg',
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 399.99,
    image: '/placeholder.svg',
    category: 'Electronics',
    inStock: true,
    rating: 4.6,
    reviews: 289,
  },
  {
    id: '3',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag with laptop compartment',
    price: 189.99,
    image: '/placeholder.svg',
    category: 'Accessories',
    inStock: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 79.99,
    image: '/placeholder.svg',
    category: 'Home',
    inStock: false,
    rating: 4.5,
    reviews: 98,
  },
  {
    id: '5',
    name: 'The Great Gatsby Book',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 14.99,
    image: '/placeholder.svg',
    category: 'Books',
    inStock: true,
    rating: 4.7,
    reviews: 523,
  },
  {
    id: '6',
    name: 'Python Programming Book',
    description: 'Complete guide to Python programming for beginners',
    price: 39.99,
    image: '/placeholder.svg',
    category: 'Books',
    inStock: true,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '7',
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with cushioned sole',
    price: 129.99,
    image: '/placeholder.svg',
    category: 'Footwear',
    inStock: true,
    rating: 4.6,
    reviews: 412,
  },
  {
    id: '8',
    name: 'Casual Leather Shoes',
    description: 'Comfortable leather shoes for everyday wear',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'Footwear',
    inStock: true,
    rating: 4.4,
    reviews: 187,
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
