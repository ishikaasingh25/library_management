import React, { useState, useEffect } from 'react';
import { borrowBook, returnBook } from '../services/bookService'; // Removed fetchBooks import
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/books');
        const data = await response.json();

        if (data.books && Array.isArray(data.books)) {
          setBooks(data.books); // Access the 'books' array correctly
        } else {
          setErrorMessage('Failed to fetch books.');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setErrorMessage('Failed to fetch books.');
      }
    };

    fetchBooksData();
  }, []);

  // Handle borrowing a book
  const handleBorrowBook = async (bookId) => {
    try {
      const response = await borrowBook(bookId);
      if (response.message) {
        alert(response.message);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, availableCopies: book.availableCopies - 1 } : book
          )
        );
      }
    } catch (error) {
      alert('Error borrowing book: ' + error.message);
    }
  };

  // Handle returning a book
  const handleReturnBook = async (bookId) => {
    try {
      const response = await returnBook(bookId);
      if (response.message) {
        alert(response.message);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId ? { ...book, availableCopies: book.availableCopies + 1 } : book
          )
        );
      }
    } catch (error) {
      alert('Error returning book: ' + error.message);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <h2>All Available Books</h2>
      <ul>
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author} - {book.availableCopies} copies available
              <button
                onClick={() => handleBorrowBook(book._id)}
                disabled={book.availableCopies === 0}
              >
                Borrow
              </button>
              <button onClick={() => handleReturnBook(book._id)}>Return</button>
            </li>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </ul>
    </div>
  );
};

export default UserDashboard;
