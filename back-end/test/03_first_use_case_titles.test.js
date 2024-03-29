const request= require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const {pool} = require('../utils/database');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Variables
let token;
let titleID_correct = 'tt123456';
let titleID_wrong = 'tt0000002';
let titlePart_correct = 'Existing';
let titlePart_wrong = 'Avatar';
let genre_correct = 'Action';
let genre_wrong = 'Drama';

// The database contains the following title:
// tt123456 - Existing Original Title - Action
// The database contains the following user:
// testuser - 1234

// Home
// TEST FOR [GET]/home
describe('HOME', () => {
    it('should return 200 OK and some random titles from the database', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/home')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
});

// Titles
// TEST FOR [GET]/title/:titleID
describe('TITLE', () => {
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
            .set('X-OBSERVATORY-AUTH', token)
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
            .get('/ntuaflix_api/title/:' + titleID_correct + '?format=csv')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                expect(res.header['content-type']).to.equal('text/csv; charset=utf-8');
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
            .get('/ntuaflix_api/title/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
    it('should return 404 if the titleID is missing (endpoint needs titleID)', (done) => {
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
})

// TEST FOR [GET]/searchtitle
describe('SEARCHTITLE', () => {
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
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                titlePart: titlePart_correct
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                expect(res.body).to.be.an('array');
                // also expect to not be an empty array
                expect(res.body).to.not.be.empty;
                done();
            });
        })
    });
    it('should return 404 if the titlePart is not found', (done) => {
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
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                titlePart: titlePart_wrong
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
});

// TEST FOR [GET]/bygenre
describe('BYGENRE', () => {
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
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                qgenre: genre_correct,
                minrating: 5
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                done();
            });
        })
    });
    it('should return 200 and a csv if the genre is valid and the format is csv', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testuser",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/bygenre?format=csv')
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                qgenre: genre_correct,
                minrating: 5,
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                expect(res.header['content-type']).to.equal('text/csv; charset=utf-8');
                done();
            });
        })
    });
    it('should return 404 if the genre is not found', (done) => {
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
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                qgenre: genre_wrong,
                minrating: 5
            })
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
});
