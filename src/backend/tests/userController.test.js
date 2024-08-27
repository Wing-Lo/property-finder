const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const User = require('../models/User');

jest.setTimeout(20000);

describe('User Controller', () => {
    let adminToken;
    let regularUser;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Register an admin user and get a token for authorization
        const adminResponse = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Admin',
                lastName: 'User',
                email: 'adminuser@example.com',
                password: 'password123',
                mobileNumber: '1234567890',
                isAdmin: true, // Ensure the user is an admin for this test
            });

        const adminLoginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'adminuser@example.com',
                password: 'password123',
            });

        adminToken = adminLoginResponse.body.token; // Extract token for authorized requests

        // Create a regular user for update testing
        regularUser = await User.create({
            firstName: 'Bob',
            lastName: 'Builder',
            email: 'bobbuilder@example.com',
            password: 'password123',
            mobileNumber: '5566778899',
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await new Promise(resolve => setTimeout(resolve, 500)); // Give time for connections to close
    });

    beforeEach(async () => {
        await User.deleteMany();
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    // Test user registration
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'janedoe@example.com',
                password: 'password123',
                mobileNumber: '0987654321',
            });

        console.log('Response body:', response.body); 

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('email', 'janedoe@example.com');
        expect(response.body).toHaveProperty('password'); 
    }, 10000);

    // Test user login
    it('should login a user', async () => {
        await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'John',
                lastName: 'Smith',
                email: 'johnsmith@example.com',
                password: 'password123',
                mobileNumber: '1234567890',
            });

        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'johnsmith@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }, 10000);

    // Test get all users
    it('should get all users', async () => {
        await User.create({
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'alicewonder@example.com',
            password: 'password123',
            mobileNumber: '1122334455',
        });

        const response = await request(app).get('/api/users');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Ensure there is at least one user
    }, 10000);

    // Test get a single user by ID
    it('should get a user by ID', async () => {
        const user = await User.create({
            firstName: 'Bob',
            lastName: 'Builder',
            email: 'bobbuilder@example.com',
            password: 'password123',
            mobileNumber: '5566778899',
        });

        const response = await request(app).get(`/api/users/${user._id}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'bobbuilder@example.com');
        expect(response.body).toHaveProperty('password'); // Ensure password is included
    }, 10000);

    // Test duplicate email registration
    it('should not register a user with a duplicate email', async () => {
        // Register the first user
        await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'janedoe@example.com',
                password: 'password123',
                mobileNumber: '0987654321',
            });
    
        // Attempt to register a second user with the same email
        const response = await request(app)
            .post('/api/users/register')
            .send({
                firstName: 'Janet',
                lastName: 'Doe',
                email: 'janedoe@example.com',
                password: 'password1234',
                mobileNumber: '1234567891',
            });
    
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty('message', 'User already exists'); // Check for the message property
    });

    // Test delete a user by ID
    it('should delete a user by ID', async () => {
        // Create a user to delete
        const user = await User.create({
            firstName: 'Bob',
            lastName: 'Builder',
            email: 'bobbuilder@example.com',
            password: 'password123',
            mobileNumber: '5566778899',
        });

        // Perform delete request with admin authorization
        const response = await request(app)
            .delete(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${adminToken}`); // Use admin token

        console.log('Response status:', response.status); 
        console.log('Response body:', response.body); 

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }, 10000);

    // Test update user details without admin authorization
    it('should not update user details without admin authorization', async () => {
        // Create a user to attempt updating
        const user = await User.create({
            firstName: 'Alice',
            lastName: 'Wonder',
            email: 'alicewonder@example.com',
            password: 'password123',
            mobileNumber: '0987654321',
        });

        // Perform update request without authorization
        const response = await request(app)
            .put(`/api/users/${user._id}`)
            .send({
                firstName: 'Alice',
                lastName: 'Wonder Updated',
            });

        console.log('Response status:', response.status); 
        console.log('Response body:', response.body); 

        expect(response.status).toBe(401); // Expecting unauthorized status
        expect(response.body).toHaveProperty('message', 'Not authorized, no token');
    });

});
