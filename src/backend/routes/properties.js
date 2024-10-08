const express = require("express");
const router = express.Router();
const { protect, isAgent } = require("../middleware/authMiddleware");
const {
    createProperty,
    getAllProperties,
    updateProperty,
    deleteProperty,
    getPropertyById,
    searchProperties, 
} = require("../controllers/propertyController");

// Route to search properties
router.get('/search', searchProperties); 

// Route to create a property (agents only)
router.post("/create", protect, isAgent, createProperty);

// Route to get all properties
router.get("/", getAllProperties);

// Route to get a single property by ID
router.get("/:id", getPropertyById);

// Route to update a property (agents or admins only)
router.put("/update/:id", protect, isAgent, updateProperty);

// Route to delete a property (agents or admins only)
router.delete("/delete/:id", protect, isAgent, deleteProperty);

module.exports = router;