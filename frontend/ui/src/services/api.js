import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:7000/api', // Base URL of your backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the Authorization token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
