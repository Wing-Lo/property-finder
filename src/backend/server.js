const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const propertyRoutes = require("./routes/properties");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);

// Error handling middleware
app.use(errorHandler);

// Serve profile pictures
app.use("/uploads/profilePics", express.static("uploads/profilePics"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
