// Mongoose schema for users

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAgent: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    profilePic: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    savedProperties: { type: [String], optional: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
