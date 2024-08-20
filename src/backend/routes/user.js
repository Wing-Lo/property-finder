const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

// Make an agent
router.post('/makeAgent', userController.makeAgent);

// Make an admin
router.post('/makeAdmin', userController.makeAdmin);

module.exports = router;
