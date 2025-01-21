const express = require('express');
const { addBook, deleteBook, getAllBooks, borrowBook } = require('../controller/bookController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Protect routes with the authMiddleware and authorize roles
router.post('/add', authMiddleware, authorizeRoles('admin'), addBook);  // Only admin can add books
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteBook); // Only admin can delete books
router.get('/', getAllBooks); // All users can view books
router.post('/:id/borrow', authMiddleware, borrowBook); // Authenticated users can borrow books

module.exports = router;
