import axios from "axios";

const API_URL = "http://localhost:7000/api";

export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/users`);
};

export const getAllBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

export const addBook = async (bookData) => {
  return await axios.post(`${API_URL}/books`, bookData);
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/books/${id}`);
};
