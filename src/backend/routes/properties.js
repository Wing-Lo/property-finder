const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Get all properties
router.get('/', propertyController.getAllProperties);

// Create a property (only agents can do this)
router.post('/create', auth, agentAuth, propertyController.createProperty);

// Update a property (agents or admins)
router.put('/update/:id', auth, agentAuth, adminAuth, propertyController.updateProperty);

// Delete a property (agents or admins)
router.delete('/delete/:id', auth, agentAuth, adminAuth, propertyController.deleteProperty);

module.exports = router;