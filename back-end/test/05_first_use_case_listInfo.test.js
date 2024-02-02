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

// TEST FOR [GET]/listsInfo/:titleID
describe('listsInfo', () => {
    it('should return the json object with the boolean values, with the given titleID', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "existinguser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/listsInfo/:tt0000001')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 204 if the titleID is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "existinguser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/listsInfo/:tt0000002')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204); 
                done();
            });
        })
    });
});

// TEST FOR [GET]/seriesInfo/:titleID
describe('seriesInfo', () => {
    it('should return the json object with the boolean values, with the given titleID', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "existinguser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/seriesInfo/:tt0000001')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 204 if the titleID is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "existinguser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/seriesInfo/:tt0000002')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204); 
                done();
            });
        })
    });
});