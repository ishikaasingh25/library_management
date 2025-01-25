import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../services/bookService';  // Import API service

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();  // Call service to fetch books
        setBooks(response.data);  // Store books in state
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title}</li> 
        ))}
      </ul>
    </div>
  );
};

export default BookList;
