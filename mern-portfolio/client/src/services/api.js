import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Portfolio API
export const portfolioAPI = {
  getAllProjects: () => api.get('/portfolio/projects'),
  getProject: (id) => api.get(`/portfolio/projects/${id}`),
  getFeaturedProjects: () => api.get('/portfolio/projects/featured'),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  createAdmin: (adminData) => api.post('/admin/create', adminData),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Projects
  getProjects: () => api.get('/admin/projects'),
  createProject: (projectData) => api.post('/admin/projects', projectData),
  updateProject: (id, projectData) => api.put(`/admin/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
};

// Contact API
export const contactAPI = {
  submitContact: (contactData) => api.post('/contact', contactData),
  
  // Admin contact management
  getContacts: () => api.get('/contact'),
  getContact: (id) => api.get(`/contact/${id}`),
  updateContactStatus: (id, statusData) => api.put(`/contact/${id}`, statusData),
  deleteContact: (id) => api.delete(`/contact/${id}`),
  getContactStats: () => api.get('/contact/stats'),
};

// Auth helpers
export const authHelpers = {
  setAuthToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  removeAuthToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getAuthToken: () => {
    return localStorage.getItem('token');
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default api;