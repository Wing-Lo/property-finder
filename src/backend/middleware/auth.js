const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (authentication)
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an agent
const isAgent = (req, res, next) => {
  if (req.user && req.user.isAgent) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized, user is not an agent' });
  }
};

module.exports = { protect, isAgent };
