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
let titleID_correct = "tt123456"
let titleID_wrong = "tt000006"

// These Tests concern the file: back-end/controllers/titleInfo.js

// TEST FOR [GET]/listsInfo/:titleID
describe('ListsInfo', () => {
    it('should return the json object with the boolean values, with the given titleID', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/listsInfo/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 404 if the titleID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/listsInfo/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
});

// TEST FOR [GET]/seriesInfo/:titleID
describe('SeriesInfo', () => {
    it('should return 204 if the parentID is null or the parentTitleObject does not exits and 200 if the parentObject exists', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/seriesInfo/:'+titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                // Check if the response has status 200 or 204
                if (res.status === 200 ){
                    expect(res.status).to.equal(200); 
                } else {
                    expect(res.status).to.equal(204); 
                }
                done();
            });
        })
    });
    it('should return 404 if the titleID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/seriesInfo/:'+titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
});