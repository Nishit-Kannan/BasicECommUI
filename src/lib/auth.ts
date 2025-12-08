// Authentication token management

import { API_BASE_URL } from '@/config/api';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

// Token storage keys
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Store tokens
export const storeTokens = (tokens: TokenResponse) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

// Get access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Get refresh token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Clear tokens (logout)
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem('userType');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// Refresh the access token
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // Refresh token expired or invalid
      clearTokens();
      return null;
    }

    const data: TokenResponse = await response.json();
    storeTokens(data);
    return data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearTokens();
    return null;
  }
};

// Logout and redirect
export const logout = async () => {
  const token = getAccessToken();
  
  // Call logout API endpoint if token exists
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Even if API call fails, continue with local logout
      console.error('Logout API call failed:', error);
    }
  }
  
  // Clear tokens and redirect
  clearTokens();
  window.location.href = '/login';
};
