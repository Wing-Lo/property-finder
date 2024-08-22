const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Make an agent
router.post('/makeAgent/:id', userController.makeAgent);

// Make an admin
router.post('/makeAdmin/:id', userController.makeAdmin);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Edit a user
router.put('/:id', userController.editUser);

module.exports = router;

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Get all users
router.get('/', userController.getAllUsers);