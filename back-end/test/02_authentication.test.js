const request= require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const {pool} = require('../utils/database');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Variables
let token_incorrect = 'fdfhadsklfjllasdfhfdsaaskdjfasdfhkjas';
let titleID_correct = 'tt123456';

// TEST for the auth middleware
describe('Authentication Middleware not valid', () => {
    it('should return 401 if the token is not valid', (done) => {
        request(app)
        .get('/ntuaflix_api/home')
        .set('X-OBSERVATORY-AUTH', token_incorrect)
        .end((err, res) => {
            //console.log('Response:', res.status, res.body);
            expect(res.status).to.equal(401); 
            done();
        });
    });
});

describe('Authentication Middleware not provided', () => {
    it('should return 401 if the token is not provided', (done) => {
        request(app)
        .get('/ntuaflix_api/title/:' + titleID_correct)
        .end((err, res) => {
            //console.log('Response:', res.status, res.body);
            expect(res.status).to.equal(400); // Bad Request
            expect(res.body).to.have.property('message'); 
            done();
        });
    });
});

describe('Authentication Middleware valid', () => {
    it('should return 200 if the token is valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/title/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        });
    });
});