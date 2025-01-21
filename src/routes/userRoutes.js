const express = require('express');
const { getUsers, updateUser } = require('../controller/userController');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

// Protect routes with authMiddleware and authorizeRoles
router.get('/', authMiddleware, authorizeRoles('admin'), getUsers); // Only admin can fetch all users
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateUser); // Only admin can update user details

module.exports = router;
