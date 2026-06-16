import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage (patient token or admin token)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const isAdminPage = window.location.pathname.startsWith('/admin');
    const token = isAdminPage ? localStorage.getItem('adminToken') : localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const isAdminRoute = error.config?.url?.startsWith('/admin');
      if (isAdminRoute) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
