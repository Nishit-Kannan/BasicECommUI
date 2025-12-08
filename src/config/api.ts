// Centralized API configuration
// All backend endpoints are defined here for easy management

import { getAccessToken, refreshAccessToken, logout } from '@/lib/auth';

// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_BASE_URL = 'http://localhost';

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: `${API_BASE_URL}/auth/api/auth/login`,
    logout: `${API_BASE_URL}/auth/api/auth/logout`,
    register: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
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
    catalog: `${API_BASE_URL}/supplier/catalog`,
    addProduct: `${API_BASE_URL}/supplier/catalog/add`,
    updateProduct: (id: string) => `${API_BASE_URL}/supplier/catalog/${id}`,
    deleteProduct: (id: string) => `${API_BASE_URL}/supplier/catalog/${id}`,
    inventory: `${API_BASE_URL}/supplier/inventory`,
    updateInventory: (id: string) => `${API_BASE_URL}/supplier/inventory/${id}`,
    dashboard: `${API_BASE_URL}/supplier/dashboard`,
  },
};

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

// API helper function with automatic token refresh
export const apiCall = async <T = any>(
  url: string, 
  options: RequestInit = {},
  retry = true
): Promise<T> => {
  const token = getAccessToken();
  
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

    // Handle 401 Unauthorized - token might be expired
    if (response.status === 401 && retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        
        const newToken = await refreshAccessToken();
        
        isRefreshing = false;
        
        if (newToken) {
          onTokenRefreshed(newToken);
          // Retry the original request with new token
          return apiCall<T>(url, options, false);
        } else {
          // Refresh failed, logout user
          logout();
          throw new Error('Session expired. Please login again.');
        }
      } else {
        // Wait for the refresh to complete
        return new Promise<T>((resolve, reject) => {
          subscribeTokenRefresh(async (newToken: string) => {
            try {
              const retryResponse = await fetch(url, {
                ...options,
                headers: {
                  ...defaultHeaders,
                  Authorization: `Bearer ${newToken}`,
                  ...options.headers,
                },
              });
              
              if (!retryResponse.ok) {
                throw new Error(`HTTP error! status: ${retryResponse.status}`);
              }
              
              resolve(await retryResponse.json());
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Convenience methods
export const api = {
  get: <T = any>(url: string, options?: RequestInit) => 
    apiCall<T>(url, { ...options, method: 'GET' }),
  
  post: <T = any>(url: string, data?: any, options?: RequestInit) => 
    apiCall<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
  
  put: <T = any>(url: string, data?: any, options?: RequestInit) => 
    apiCall<T>(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  
  patch: <T = any>(url: string, data?: any, options?: RequestInit) => 
    apiCall<T>(url, { ...options, method: 'PATCH', body: JSON.stringify(data) }),
  
  delete: <T = any>(url: string, options?: RequestInit) => 
    apiCall<T>(url, { ...options, method: 'DELETE' }),
};
