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
let titleID_correct = 'tt0000001';
let titleID_wrong = 'tt0000002';
let titlePart_correct = 'Avatar';
let titlePart_wrong = 'Avatar2';
let genre_correct = 'Action';
let genre_wrong = 'Action2';


// Titles
// TEST FOR [GET]/title/:titleID
describe('title', () => {
    it('should return the title with the given titleID', (done) => {
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
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                // Also expect res to be a json with titleID / type / originalTitle / titlePoster / startYear / endYear / genres / akasInfo / principals / rating
                expect(res.body).to.have.property('titleID');
                expect(res.body).to.have.property('type');
                expect(res.body).to.have.property('originalTitle');
                expect(res.body).to.have.property('titlePoster');
                expect(res.body).to.have.property('startYear');
                expect(res.body).to.have.property('endYear');
                expect(res.body).to.have.property('genres');
                expect(res.body).to.have.property('akasInfo');
                expect(res.body).to.have.property('principals');
                expect(res.body).to.have.property('rating');
                done();
            });
        })
    });
    it('should return 204 if the titleID is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/title/:' + titleID_wrong)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204); 
                done();
            });
        })
    });
    it('should return 400 if the titleID is missing', (done) => {
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
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400); 
                done();
            });
        })
    });
})

// TEST FOR [GET]/searchtitle
describe('searchtitle', () => {
    it('should return the titles with the given titlePart', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/searchtitle')
            .set('Authorization', 'Bearer ' + token)
            .send({
                titlePart: titlePart_correct
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 204 if the titlePart is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/searchtitle')
            .set('Authorization', 'Bearer ' + token)
            .send({
                titlePart: titlePart_wrong
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204); 
                done();
            });
        })
    });
});

// TEST FOR [GET]/bygenre
describe('bygenre', () => {
    it('should return the titles with the given genre', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/bygenre')
            .set('Authorization', 'Bearer ' + token)
            .send({
                genre: genre_correct
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 204 if the genre is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/bygenre')
            .set('Authorization', 'Bearer ' + token)
            .send({
                genre: genre_wrong
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204); 
                done();
            });
        })
    });
});
