const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAgent, mobileNumber } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAgent,
      mobileNumber
    });

    // Save user to database
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Make an agent
exports.makeAgent = async (req, res) => {
  try {
    // Ensure the request is coming from an admin user
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user to be an agent
    user.isAgent = true;
    await user.save();

    res.status(200).json({ message: 'User is now an agent', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Make an admin
exports.makeAdmin = async (req, res) => {
  try {
    // Ensure the request is coming from an admin user
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user to be an admin
    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: 'User is now an admin', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
