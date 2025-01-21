const Book = require('../models/bookModel');  // Assuming you have a Book model

// Add a new book
const addBook = async (req, res) => {
  const { title, author, genre, availableCopies } = req.body;

  try {
    const newBook = new Book({ title, author, genre, availableCopies });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availableCopies === 0) {
      return res.status(400).json({ message: 'No copies available' });
    }

    book.availableCopies -= 1;  // Decrease available copies
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book', error: error.message });
  }
};

module.exports = { addBook, deleteBook, getAllBooks, borrowBook };
