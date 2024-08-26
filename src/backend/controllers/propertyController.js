// server/controllers/propertyController.js
const Property = require("../models/Property");

// Create a property (for agents only)
exports.createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            address,
            suburb,
            sellOrRent,
            images,
        } = req.body;

        const property = new Property({
            title: title || "",
            description,
            price,
            address,
            suburb,
            sellOrRent,
            images,
            agent: req.user.id, // The logged-in agent
        });

        await property.save();
        res.status(201).json(property);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error, failed to create property",
        });
    }
};

// Get a single property by ID

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            "agent",
            "firstName lastName email mobileNumber"
        );

        if (!property)
            return res.status(404).json({ message: "Property not found" });
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate(
            "agent",
            "firstName lastName email"
        );
        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error, failed to fetch properties",
        });
    }
};

// Update a property (for agents or admins only)
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property)
            return res.status(404).json({ message: "Property not found" });

        // Ensure that only the agent who created the property or an admin can update it
        if (property.agent.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({
                message:
                    "Access denied, only the agent or admin can update this property",
            });
        }

        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error, failed to update property",
        });
    }
};

// Delete a property (for agents or admins only)
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property)
            return res.status(404).json({ message: "Property not found" });

        // Ensure that only the agent who created the property or an admin can delete it
        if (property.agent.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({
                message:
                    "Access denied, only the agent or admin can delete this property",
            });
        }

        await property.deleteOne();
        res.json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Server error, failed to delete property",
        });
    }
};

// Search properties
exports.searchProperties = async (req, res) => {
    try {
        const { price, address, suburb, sellOrRent } = req.query;

        const query = {};
        if (price) query.price = { $lte: price };
        if (address) query.address = new RegExp(address, 'i');
        if (suburb) query.suburb = new RegExp(suburb, 'i');
        if (sellOrRent) query.sellOrRent = sellOrRent;

        const properties = await Property.find(query);

        res.status(200).json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};