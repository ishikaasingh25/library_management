const User = require('../models/userModel');

// Get all users (admin-only functionality)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update user information (admin-only functionality)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { email, role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

module.exports = { getUsers, updateUser };
