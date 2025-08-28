import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

// Add request interceptor to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin login
export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

// Get pending users
export const getPendingUsers = async () => {
  const response = await api.get('/admin/pending-users');
  return response.data;
};

// Get approved users
export const getApprovedUsers = async () => {
  const response = await api.get('/admin/approved-users');
  return response.data;
};

// Get rejected users
export const getRejectedUsers = async () => {
  const response = await api.get('/admin/rejected-users');
  return response.data;
};

// Approve user
export const approveUser = async (userId) => {
  const response = await api.patch(`/admin/approve/${userId}`);
  return response.data;
};

// Reject user
export const rejectUser = async (userId) => {
  const response = await api.patch(`/admin/reject/${userId}`);
  return response.data;
};

export default api;