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
let nameID_correct = 'nm987654';
let nameID_wrong = 'nm0000002';
let namePart_correct = 'Contributor';
let namePart_wrong = 'Tom Hanks';

// Names
// TEST FOR [GET]/name/:nameID
describe('NAME', () => {
    it('should return the nameObject with the given nameID', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/name/:' + nameID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                // Also expect res to be a json with nameID / name / namePoster / birthYr / deathYr / profession / nameTitles
                expect(res.body).to.have.property('nameID');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('namePoster');
                expect(res.body).to.have.property('birthYr');
                expect(res.body).to.have.property('deathYr');
                expect(res.body).to.have.property('profession');
                expect(res.body).to.have.property('nameTitles');
                done();
            });
        })
    });
    it('should return 200 and a csv if the format is csv', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/name/:' + nameID_correct + '?format=csv')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                expect(res.header['content-type']).to.equal('text/csv; charset=utf-8');
                done();
            });
        })
    });
    it('should return 404 if the nameID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/name/:' + nameID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
    it('should return 404 if the nameID is missing (endpoint needs nameID)', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/title/')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
});

// TEST FOR [GET]/searchname
describe('SEARCHNAME', () => {
    it('should return an array of nameObjects with the given namePart', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/searchname')
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                namePart: namePart_correct
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                // Expect an array of nameObjects
                expect(res.body).to.be.an('array');
                done();
            });
        })
    });
    it('should return 404 if the namePart is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/searchname')
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                namePart: namePart_wrong
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
});