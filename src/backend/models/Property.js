// models/Property.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the property schema
const propertySchema = new Schema({
    title: { type: String, optional: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    suburb: { type: String, required: true },
    sellOrRent: { type: String, enum: ["sell", "rent"], required: true },
    images: [String],
    agent: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Create and export the model
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
