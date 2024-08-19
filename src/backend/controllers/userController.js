const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  // login logic (authentication, token generation, etc.) to be Implemented 
};

// Make an agent
exports.makeAgent = async (req, res) => {
  //  logic for making a user an agent (check if admin) to be Implemented 
};

// Make an admin
exports.makeAdmin = async (req, res) => {
  //  logic for making a user an admin (check if admin) to be Implemented 
};
