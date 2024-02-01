const request= require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const {pool} = require('../utils/database');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Variables
let token_incorrect = 'incorrect_token';

// TEST for the auth middleware
describe('auth middleware', () => {
    it('should return 401 if the token is not valid', (done) => {
        request(app)
        .get('/ntuaflix_api/home')
        .set('Authorization', 'Bearer ' + token_incorrect)
        .end((err, res) => {
            //console.log('Response:', res.status, res.body);
            expect(res.status).to.equal(401); 
            done();
        });
    });
    it('should return 401 if the token is not provided', (done) => {
        request(app)
        .get('/ntuaflix_api/home')
        .end((err, res) => {
            //console.log('Response:', res.status, res.body);
            expect(res.status).to.equal(401); 
            done();
        });
    });
    it('should return 200 if the token is valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "existinguser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/home')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
});