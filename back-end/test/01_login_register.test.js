const request= require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const {pool} = require('../utils/database');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Variables
let token;
let response;

// TEST FOR [POST]/auth/register
describe('Register', () => {
    // Register a new user
    it('should register a new user', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send({
                firstname: "testuserFN",
                lastname: "testuserLN",
                birthDate: "1990-05-15",
                username: "testuser",
                email: "testuser@example.com",
                password: "1234"
            })
            .end((err, res) => {
            //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); // Update the expected status code if needed
                done();
            });
    });
    // Try to register a new user with the same username
    it('should return 400 if the username already exists', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send({
                firstname: "testuserFN_sameusername",
                lastname: "testuserLN_sameusername",
                birthDate: "1990-05-15",
                username: "testuser",
                email: "testuser_sameusername@example.com",
                password: "1234"
            })
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
            .send({
                firstname: "testuserFN2_noemail",
                lastname: "testuserLN_noemail",
                birthDate: "1990-05-15",
                username: "testuser_noemail",
                password: "1234"
            })
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
            .send({
                firstname: "testuserFN_sameemail",
                lastname: "testuserLN_sameemail",
                birthDate: "1990-05-15",
                username: "testuser_sameemail",
                email: "testuser@example.com",
                password: "1234"
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); // Update the expected status code if needed
                done();
            });
    });
});

// TEST FOR [POST]/auth/login
describe('Login',() =>{
    // Login with a user that exist
    it('should login a user', (done) => {
        chai.request(app)
            .post('/ntuaflix_api/auth/login')
            .send({
                username : "testuser",
                password : "1234"
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                token = res.body.token;
                expect(res.status).to.equal(200); // Update the expected status code if needed
                done();
            });
    });
    // Login with a user that doesn't exist
    it('should not login with invalid credentials', (done) => {
        chai.request(app)
            .post('/ntuaflix_api/auth/login')
            .send({
                username : "testuser",
                password : "12345"
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); // Update the expected status code if needed
                done();
            });
    });
});