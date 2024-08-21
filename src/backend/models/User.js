const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAgent: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    profilePic: { type: String },
    mobileNumber: { type: String },
});

// Create and export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;