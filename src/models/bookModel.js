const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  availableCopies: { type: Number, required: true },
  uniqueId: { type: String, unique: true, sparse: true }  // This might be causing the issue
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
