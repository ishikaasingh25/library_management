import axios from 'axios';

const API_URL = 'http://localhost:7000/api/books'; // Ensure the URL matches your backend

// Add a new book
export const addBook = async (bookData) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage (or sessionStorage)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
    },
  };
  try {
    const response = await axios.post(`${API_URL}/add`, bookData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is sent
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error adding book: ' + error.response?.data?.message || error.message);
  }
};
export const removeBook = async (bookId) => {
  const token = localStorage.getItem('token');  // Retrieve the token from localStorage (or sessionStorage)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
    },
  };

  try {
    const response = await axios.delete(`http://localhost:7000/api/books/${bookId}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error removing book');
  }
};

// Fetch all books (this can be used in AdminDashboard)
export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.books;
  } catch (error) {
    throw new Error('Error fetching books: ' + error.response?.data?.message || error.message);
  }
};

export const borrowBook = async (bookId) => {
  const token = localStorage.getItem('token');
console.log(token);
  try {
    const response = await axios.post(
      `http://localhost:7000/api/books/${bookId}/borrow`, 
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, // 
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to borrow book');
    }

    return response.data; // Return the response from the server
  } catch (error) {
    // Log the full error response for debugging
    console.error('Error borrowing book:', error.response?.data || error.message);
    throw new Error('Failed to borrow book: ' + (error.response?.data?.message || error.message));
  }
};

export const returnBook = async (bookId) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  try {
    const response = await axios.post(
      `http://localhost:7000/api/books/${bookId}/return`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`, // 
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to return book');
    }

    return response.data; // Return the response from the server
  } catch (error) {
    // Log the full error response for debugging
    console.error('Error returning book:', error.response?.data || error.message);
    throw new Error('Failed to return book: ' + (error.response?.data?.message || error.message));
  }
};
