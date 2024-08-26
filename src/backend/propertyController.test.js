const request = require('supertest');
const app = require('../server'); // 
const mongoose = require('mongoose');
const Property = require('../models/Property');
const User = require('../models/User');

// Set up and teardown for the test database
beforeAll(async () => {
    const mongoUri = 'mongodb://127.0.0.1:27017/RealEstateDB_test'; 
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Property Controller', () => {
    let token; // Variable to store JWT for authenticated requests
    let agentId;
    let propertyId;

    // Register and login an agent for testing
    beforeAll(async () => {
        // Register an agent
        const agent = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Agent',
                lastName: 'Smith',
                email: 'agent@example.com',
                password: 'password123',
                isAgent: true,
            });

        // Login to get a token
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'agent@example.com',
                password: 'password123',
            });

        token = response.body.token;
        agentId = agent.body._id;
    });

    test('POST /api/properties - should create a new property', async () => {
        const response = await request(app)
            .post('/api/properties')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Beautiful House',
                description: 'A lovely house with a garden',
                price: 250000,
                address: '123 Elm St',
                suburb: 'Downtown',
                sellOrRent: 'sell',
                images: ['image1.jpg', 'image2.jpg'],
            });
        propertyId = response.body._id; // Store the property ID for further tests
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('title', 'Beautiful House');
    });

    test('GET /api/properties/:id - should get a property by ID', async () => {
        const response = await request(app).get(`/api/properties/${propertyId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', 'Beautiful House');
    });

    test('GET /api/properties - should get all properties', async () => {
        const response = await request(app).get('/api/properties');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.some(property => property.title === 'Beautiful House')).toBe(true);
    });

    test('PUT /api/properties/:id - should update a property', async () => {
        const response = await request(app)
            .put(`/api/properties/${propertyId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ price: 275000 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('price', 275000);
    });

    test('DELETE /api/properties/:id - should delete a property', async () => {
        const response = await request(app)
            .delete(`/api/properties/${propertyId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Property deleted successfully');
    });

    test('GET /api/properties/search - should search properties', async () => {
        // Create a property for searching
        const searchResponse = await request(app)
            .post('/api/properties')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Searchable Property',
                description: 'A property to search for',
                price: 300000,
                address: '456 Oak St',
                suburb: 'Uptown',
                sellOrRent: 'rent',
                images: ['image3.jpg'],
            });

        const searchPropertyId = searchResponse.body._id;

        const response = await request(app)
            .get('/api/properties/search')
            .query({ suburb: 'Uptown' });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.some(property => property._id.toString() === searchPropertyId)).toBe(true);
    });
});
