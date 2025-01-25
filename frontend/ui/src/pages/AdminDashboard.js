import React, { useState, useEffect } from 'react';
import { fetchBooks, addBook, removeBook } from '../services/bookService'; // Import removeBook
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    availableCopies: 0,
  });
  const navigate = useNavigate(); // Use navigate instead of history

  // Fetch books on component mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    getBooks();
  }, []);

  // Handle form inputs for new book
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  // Handle adding a new book
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await addBook(newBook);
      alert(response.message);
      setBooks([...books, response.book]);
      setNewBook({
        title: '',
        author: '',
        genre: '',
        availableCopies: 0,
      }); // Reset form
    } catch (error) {
      alert('Error adding book: ' + error.message);
    }
  };

  // Handle removing a book
  const handleRemoveBook = async (bookId) => {
    try {
      const result = await removeBook(bookId);
      alert(result.message); // Show success message
      // Remove the book from the list after successful deletion
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      alert('Error removing book: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Add New Book Form */}
      <form onSubmit={handleAddBook}>
        <h2>Add a New Book</h2>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="Author"
        />
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          placeholder="Genre"
        />
        <input
          type="number"
          name="availableCopies"
          value={newBook.availableCopies}
          onChange={handleInputChange}
          placeholder="Available Copies"
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Display Books List */}
      <h2>Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - {book.availableCopies} copies available
            <button onClick={() => handleRemoveBook(book._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
