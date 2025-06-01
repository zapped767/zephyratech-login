import apiClient from '../utils/interceptor';

export const api = {
  // Auth endpoints
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  // Mock signup endpoint (since dummyjson doesn't have signup)
  signup: (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          resolve({
            data: {
              id: Math.floor(Math.random() * 1000),
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              message: 'Account created successfully'
            }
          });
        } else {
          reject(new Error('Invalid user data'));
        }
      }, 1000);
    });
  },
  
  // Get user profile
  getProfile: () => apiClient.get('/auth/me'),
  
  // Refresh token
  refreshToken: () => apiClient.post('/auth/refresh'),
};