import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data.message || 'An error occurred';
      return Promise.reject({ message, status: error.response.status });
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject({ message: 'Network error - please check your connection' });
    } else {
      // Something else happened
      return Promise.reject({ message: error.message });
    }
  }
);

// Contact API calls
export const contactAPI = {
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  create: (data) => api.post('/contacts', data),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

export default api;