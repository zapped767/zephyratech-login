import axios from 'axios';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    console.log('Request data:', config.data);
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    // Handle common error scenarios
    console.error('Response interceptor error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;