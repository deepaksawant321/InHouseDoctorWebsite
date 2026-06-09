import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Point to NestJS backend on 3001
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
