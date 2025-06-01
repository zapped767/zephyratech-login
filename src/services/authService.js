import { api } from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.login({
        username: credentials.username || credentials.email,
        password: credentials.password,
        expiresInMins: 30
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.signup(userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};