const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const Property = require('../models/Property');
const User = require('../models/User');

jest.setTimeout(20000);

describe('Property and User Controllers', () => {
    let agentToken;
    let adminToken;
    let agentId;
    let propertyId;
    let agentResponse;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Register and login as an agent
        await User.deleteMany({});
        await Property.deleteMany({});

        agentResponse = await request(app)
        .post('/api/users/register')
        .send({
            firstName: 'John',
            lastName: 'Doe',
            email: `john.doe${Date.now()}@example.com`,
            password: 'password123',
            isAgent: true,
            isAdmin: false,
            mobileNumber: '1234567890',
        });

        agentId = agentResponse.body._id;

        const agentLoginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: agentResponse.body.email,
                password: 'password123',
            });

        agentToken = agentLoginResponse.body.token;

        // Register an admin user and get a token for authorization
        const adminResponse = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Admin',
                lastName: 'User',
                email: `adminuser${Date.now()}@example.com`,
                password: 'password123',
                mobileNumber: '1234567890',
                isAdmin: true,
            });

        const adminLoginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: adminResponse.body.email,
                password: 'password123',
            });

        adminToken = adminLoginResponse.body.token;

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

    // Cleanup after each test
    afterEach(async () => {
        await User.deleteMany({});
        await Property.deleteMany({});
    });

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
        expect(property.agent._id.toString()).toBe(agentId.toString()); 
        expect(property.agent).toHaveProperty('firstName', 'John');
        expect(property.agent).toHaveProperty('lastName', 'Doe');
        expect(property.agent).toHaveProperty('email', agentResponse.body.email);
    });

    
    it('should register a new user', async () => {
        const email = `janedoe${Date.now()}@example.com`;
        const response = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email,
                password: 'password123',
                mobileNumber: '0987654321',
            });
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('email', email);
        expect(response.body).toHaveProperty('password');
    }, 10000);

    it('should login a user', async () => {
        const email = `johnsmith${Date.now()}@example.com`;
        await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'John',
                lastName: 'Smith',
                email,
                password: 'password123',
                mobileNumber: '1234567890',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email,
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }, 10000);

    it('should get all users', async () => {
        const email = `alicewonder${Date.now()}@example.com`;
        await User.create({
            firstName: 'Alice',
            lastName: 'Wonder',
            email,
            password: 'password123',
            mobileNumber: '1122334455',
        });

        const response = await request(app).get('/api/users');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); 
    }, 10000);

    it('should get a user by ID', async () => {
        const email = `bobbuilder${Date.now()}@example.com`;
        const user = await User.create({
            firstName: 'Bob',
            lastName: 'Builder',
            email,
            password: 'password123',
            mobileNumber: '5566778899',
        });

        const response = await request(app).get(`/api/users/${user._id}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', email);
        expect(response.body).toHaveProperty('password'); 
    }, 10000);

    it('should not register a user with a duplicate email', async () => {
        const email = `janedoe${Date.now()}@example.com`;
        await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email,
                password: 'password123',
                mobileNumber: '0987654321',
            });
    
        const response = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Janet',
                lastName: 'Doe',
                email,
                password: 'password1234',
                mobileNumber: '1234567891',
            });
    
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should delete a user by ID', async () => {
        const email = `bobbuilder${Date.now()}@example.com`;
        const user = await User.create({
            firstName: 'Bob',
            lastName: 'Builder',
            email,
            password: 'password123',
            mobileNumber: '5566778899',
        });

        const response = await request(app)
            .delete(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }, 10000);

});