const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const request = supertest(app);

// Variables
let token;
let response;


// TEST FOR [POST]/auth/register
describe('Register', () => {
    it('should register a new user', async () => {
        const response = await request.post('ntuaflix_api/auth/register').send({
            firstname: "testuserFN",
            lastname: "testuserLN",
            birthDate: "1990-05-15",
            username: "testuser",
            email: "testuser@example.com",
            password: "1234"
          }
          );

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User registered successfully');
    });
    it('should not register a new user with missing email', async () => {
        const response = await request.post('ntuaflix_api/auth/register').send({
            firstname: "testuserFN",
            lastname: "testuserLN",
            birthDate: "1990-05-15",
            username: "testuser",
            password: "1234"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing required attribute: email');
    });
    it('should not register a new user with the same email as another user', async () => {
        const response = await request.post('ntuaflix_api/auth/register').send({
            firstname: "testuser2FN",
            lastname: "testuser2LN",
            birthDate: "1990-05-15",
            username: "testuser2",
            email: "testuser@example.com",
            password: "1234"
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email already in use');
    });
    it('should not register a new user with the same username as another user', async () => {
        const response = await request.post('ntuaflix_api/auth/register').send({
            firstname: "testuser2FN",
            lastname: "testuser2LN",
            birthDate: "1990-05-15",
            username: "testuser",
            email: "testuser2@example.com",
            password: "1234"
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Username already in use');
    });
});


// TEST FOR [POST]/auth/login
describe('Login', () => {
    it('should login with valid credentials and return a token', async () => {
        const response = await request.post('ntuaflix_api/auth/login').send({
            username: 'testuser',
            password: 'testpassword',
        }).end((err,res) => {
            token = res.body.token;
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeDefined();
    });

    it('should not login with invalid credentials', async () => {
        const response = await request.post('ntuaflix_api/auth/login').send({
            username: 'testuser',
            password: 'wrongpassword',
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid username or password');
    });
});
