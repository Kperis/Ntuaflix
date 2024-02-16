const request= require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const {pool} = require('../utils/database');

// Variables
let token;
let random = Math.floor(Math.random() * 1000);
new_user = {
    firstname: "testuserFN_new" + random,
    lastname: "testuserLN_new" + random,
    birthDate: "1990-05-15",
    username: "testuser_new" + random,
    email: "testuser_new" + random + "@example.com",
    password: "1234"
}
new_user_sameemail = {
    firstname: "testuserFN_new2" + random,
    lastname: "testuserLN_new2" + random,
    birthDate: "1990-05-15",
    username: "testuser_new2" + random,
    email: "testuser_new" + random + "@example.com",
    password: "1234"
}
new_user_sameusername = {
    firstname: "testuserFN_new3" + random,
    lastname: "testuserLN_new3" + random,
    birthDate: "1990-05-15",
    username: "testuser_new" + random,
    email: "testuser_new3" + random + "@example.com",
    password: "1234"
}
new_user_noemail = {
    firstname: "testuserFN_new4" + random,
    lastname: "testuserLN_new4" + random,
    birthDate: "1990-05-15",
    username: "testuser_new4" + random,
    password: "1234"
}
new_user_login = {
    username: "testuser_new" + random,
    password: "1234"
}
new_user_wronglogin = {
    username: "testuser_new" + random,
    password: "12345"
}

// The ntuaflix_test database contains:
// 1. A user with username "testuser" and password "1234"
// 2. A user with username "testadmin" and password "1234" with role "admin"

existing_user = {
    username: "testuser",
    password: "1234"
}
existing_user_wrongpassword = {
    username: "testuser",
    password: "12345"
}
existing_admin = {
    username: "testadmin",
    password: "1234"
}


// TEST FOR WRONG ENDPOINT
describe('WRONG ENDPOINT', () => {
    it('should return 404', (done) => {
        request(app)
            .get('/wrongendpoint')
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); // Update the expected status code if needed
                done();
            });
    });
});

// TEST FOR [POST]/auth/register
describe('REGISTER', () => {
    // Register a new user
    it('should register a new user if not existed', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send(new_user)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                // User successfully registered
                expect(res.status).to.equal(201);
                done();
            });
    });
    // Try to register a new user with the same username
    it('should return 400 if the username already exists', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send(new_user_sameusername)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); // Update the expected status code if needed
                done();
            });
    });
    // Try to register a new user without email
    it('should not register a new user with missing email' , (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send(new_user_noemail)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); // Update the expected status code if needed
                done();
            });
    });
    // Try to register a new user with the same email
    it('should not register a new user with the same email as another user' , (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send(new_user_sameemail)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); // Update the expected status code if needed
                done();
            });
    });
});

// TEST FOR [POST]/auth/login
describe('LOGIN',() =>{
    // Login with a user that exist
    it('should login a user', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/login')
            .send(existing_user)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                token = res.body.token;
                expect(res.status).to.equal(200); // Update the expected status code if needed
                done();
            });
    });
    // Login with a user that doesn't exist
    it('should not login with invalid credentials', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/login')
            .send(existing_user_wrongpassword)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(401); // Update the expected status code if needed
                done();
            });
    });
});
