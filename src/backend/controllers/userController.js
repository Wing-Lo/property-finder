const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, isAgent, mobileNumber, profilePic, savedProperties } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isAgent: isAgent || false, // Default to false if not provided
            mobileNumber,
            profilePic: profilePic || "",
            savedProperties: savedProperties || []
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
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Make an agent
exports.makeAgent = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user to be an agent
        user.isAgent = true;
        await user.save();

        res.status(200).json({ message: "User is now an agent", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a saved property to the user profile
exports.addSavedProperty = async (req, res) => {
    const { propertyId } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the property is already saved
        if (!user.savedProperties.includes(propertyId)) {
            // Add the property ID to the savedProperties array
            user.savedProperties.push(propertyId);
            await user.save();
        }

        res.status(200).json({
            message: "Property has been added to the user profile",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a saved property from the user profile
exports.removeSavedProperty = async (req, res) => {
    const { propertyId } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user to be an agent
        user.savedProperties = user.savedProperties.filter((property) => property !== propertyId);

        await user.save();

        res.status(200).json({
            message: "Property has been removed from the user profile",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove agent
exports.removeAgent = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user to be an agent
        user.isAgent = false;
        await user.save();

        res.status(200).json({
            message: "User is now no longer an agent",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Make an admin
exports.makeAdmin = async (req, res) => {
    try {
        // Ensure the request is coming from an admin user
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user to be an admin
        user.isAdmin = true;
        await user.save();

        res.status(200).json({ message: "User is now an admin", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit a user
exports.editUser = async (req, res) => {
    const { firstName, lastName, email, password, isAgent, isAdmin, mobileNumber, savedProperties, profilePic } =
        req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (email !== undefined) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (isAgent !== undefined) user.isAgent = isAgent;
        if (isAdmin !== undefined) user.isAdmin = isAdmin;
        if (mobileNumber !== undefined) user.mobileNumber = mobileNumber;
        if (profilePic !== undefined) user.profilePic = profilePic;
        if (savedProperties !== undefined) user.savedProperties = savedProperties;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};