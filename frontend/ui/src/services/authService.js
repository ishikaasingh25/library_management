import api from './api';

// Register user
export const registerUser = async (userData) => {
  return api.post('/auth/register', userData);
};

// Login user
export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials);
};
