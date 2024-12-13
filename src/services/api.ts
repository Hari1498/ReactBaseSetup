import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apiGet = (url: string, params?: object) => api.get(url, { params });
export const apiPost = (url: string, data: object) => api.post(url, data);
export default api;
