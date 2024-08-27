const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const Property = require('../models/Property');
const User = require('../models/User');

jest.setTimeout(20000);

describe('Property Controller', () => {
    let agentToken;
    let agentId;
    let propertyId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Register and login as an agent
        await User.deleteMany({});
        await Property.deleteMany({});

        const agentResponse = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john11.doe@example.com',
                password: 'password123',
                isAgent: true,
                isAdmin: false,
                mobileNumber: '1234567890',
            });

        agentId = agentResponse.body._id;

        const agentLoginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'john11.doe@example.com',
                password: 'password123',
            });

        agentToken = agentLoginResponse.body.token;

        // Create a property to use in tests
        const property = await Property.create({
            title: 'Modern Apartment in the City Center',
            description: 'A spacious 2-bedroom apartment with a stunning view of the city.',
            price: 350000,
            address: '123 Main St',
            suburb: 'Downtown',
            sellOrRent: 'sell',
            images: ['image1.jpg', 'image2.jpg'],
            agent: agentId,
        });

        propertyId = property._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await new Promise(resolve => setTimeout(resolve, 500)); 
    });

    // Test get all properties
    it('should get all properties and include agent details', async () => {
        const response = await request(app)
            .get('/api/properties')
            .set('Authorization', `Bearer ${agentToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const property = response.body[0];
        expect(property).toHaveProperty('title', 'Modern Apartment in the City Center');
        expect(property).toHaveProperty('agent');
        expect(property.agent).toHaveProperty('_id');
        expect(property.agent._id.toString()).toBe(agentId.toString()); // Compare IDs dynamically
        expect(property.agent).toHaveProperty('firstName', 'John');
        expect(property.agent).toHaveProperty('lastName', 'Doe');
        expect(property.agent).toHaveProperty('email', 'john11.doe@example.com');
    });

    // Test delete a property
it('should delete a property', async () => {
    // Ensure the property exists before deletion
    const getResponse = await request(app)
        .get('/api/properties')
        .set('Authorization', `Bearer ${agentToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

    const propertyBeforeDelete = getResponse.body.find(prop => prop._id.toString() === propertyId.toString());
    expect(propertyBeforeDelete).toBeDefined();

    // Delete the property
    await request(app)
        .delete(`/api/properties/delete/${propertyId}`) 
        .set('Authorization', `Bearer ${agentToken}`)
        .expect(200); 

    // Verify that the property was deleted
    const getAfterDeleteResponse = await request(app)
        .get('/api/properties')
        .set('Authorization', `Bearer ${agentToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

    const deletedProperty = getAfterDeleteResponse.body.find(prop => prop._id.toString() === propertyId.toString());
    expect(deletedProperty).toBeUndefined(); 
});

});
