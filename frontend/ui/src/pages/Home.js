import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../services/bookService';  // Assuming you have a service to fetch books
import './Home.css';
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookList = await fetchBooks();
        setBooks(bookList);
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Library Management System</h2>
        </div>
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      </nav>

      <div className="welcome-section">
        <h1>Welcome to the Library</h1>
        <p>Browse through our collection of books!</p>
      </div>

      <div className="book-list">
        <h2>Available Books</h2>
        {loading && <p>Loading books...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && books.length === 0 && <p>No books available.</p>}
        <ul className="book-items">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book-info">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
