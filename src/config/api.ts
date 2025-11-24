// Centralized API configuration
// All backend endpoints are defined here for easy management

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    register: `${API_BASE_URL}/auth/register`,
  },
  
  // User
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    updateProfile: `${API_BASE_URL}/user/profile`,
    recommendations: `${API_BASE_URL}/user/recommendations`,
  },
  
  // Products
  products: {
    list: `${API_BASE_URL}/products`,
    search: `${API_BASE_URL}/products/search`,
    details: (id: string) => `${API_BASE_URL}/products/${id}`,
    categories: `${API_BASE_URL}/products/categories`,
  },
  
  // Cart
  cart: {
    get: `${API_BASE_URL}/cart`,
    add: `${API_BASE_URL}/cart/add`,
    update: `${API_BASE_URL}/cart/update`,
    remove: `${API_BASE_URL}/cart/remove`,
    clear: `${API_BASE_URL}/cart/clear`,
  },
  
  // Orders
  orders: {
    list: `${API_BASE_URL}/orders`,
    details: (id: string) => `${API_BASE_URL}/orders/${id}`,
    create: `${API_BASE_URL}/orders`,
    cancel: (id: string) => `${API_BASE_URL}/orders/${id}/cancel`,
  },
  
  // Supplier
  supplier: {
    login: `${API_BASE_URL}/supplier/auth/login`,
    catalog: `${API_BASE_URL}/supplier/catalog`,
    addProduct: `${API_BASE_URL}/supplier/catalog/add`,
    updateProduct: (id: string) => `${API_BASE_URL}/supplier/catalog/${id}`,
    deleteProduct: (id: string) => `${API_BASE_URL}/supplier/catalog/${id}`,
    inventory: `${API_BASE_URL}/supplier/inventory`,
    updateInventory: (id: string) => `${API_BASE_URL}/supplier/inventory/${id}`,
    dashboard: `${API_BASE_URL}/supplier/dashboard`,
  },
};

// API helper functions
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
