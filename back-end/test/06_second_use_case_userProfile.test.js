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
// Create a random number to append to the username to avoid conflicts
let random = Math.floor(Math.random() * 1000);
let _username = "testuser" + random;
let _password = "1234";
let _username_changed = "testuser_changed" + random;
let _password_changed = "12345678";

// Create the new random user
describe('Register a new user', () => {
    // [POST] /auth/register
    it('should register a new user if not existed', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/register')
            .send({
                firstname: "testuserFF"+random,
                lastname: "testuserLN"+random,
                birthDate: "1990-05-15",
                username: _username,
                email: "testuser"+random+"@example.com",
                password: _password
            })
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                if (res.status === 400) {
                    // User already exists in the database
                    expect(res.status).to.equal(400);
                    // Check if the error message is correct
                    expect(res.body.message).to.equal('Email already in use');
                } else {
                    // User successfully registered
                    expect(res.status).to.equal(201);
                }
                done();
            });
    });
});

// Load user profile
describe('Load User profile', () => {
    // [GET] /profile
    it('should return the user profile with the given username', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/user/profile')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                // Also expect res to be a json with firstname / lastname / birthDate / email / username
                expect(res.body).to.have.property('firstname');
                expect(res.body).to.have.property('lastname');
                expect(res.body).to.have.property('birthDate');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('username');
                done();
            });
        })
    });
    /*it('should return 401 if the user does not exist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "nonexistentuser",
            password: "1234"
        })
        .end((err, res) => {
            expect(res.status).to.equal(401);
            done();});
    })*/
});


// Add a title to the favorites of the random user 
describe('Add to Favorites', () => {
    it('should return 201 if the title is added to the favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToFavorites/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(201);
                done();
            });
        })
    });
    it('should return 200 if the title is already in the favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToFavorites/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); // Eite perimeno ena 200 (me message: already in list) eite 204 (no data) without message
                done();
            });
        })
    });
    it('should return 404 if the titleID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToFavorites/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
});

// Add a title to the watchlist of the random user 
describe('Add to WatchList', () => {
    it('should return 201 if the title is added to the watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToWatchlist/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(201);
                done();
            });
        })
    });
    it('should return 200 if the title is already in the watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToWatchlist/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                done();
            });
        })
    });
    it('should return 404 if the titleID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post('/ntuaflix_api/user/addToWatchlist/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
});

// Load favorites
describe('Load favorites', () => {
    // from testuser -> none
    it('should return 204 if the user has no favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/user/favorites')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204);
                done();
            });
        })
    });
    // from randomuser_changed -> 1
    it('should return an array of titleObjects if the user has favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/user/favorites')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                // Expect an array of titleObjects
                expect(res.body).to.be.an('array');
                done();
            });
        })
    });
});

// Load watchlist
describe('Load Watchlist', () => {
    // from testuser -> none
    it('should return 204 if the user has no watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/user/watchlist')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204);
                done();
            });
        })
    });
    // from randomuser_changed -> 1
    it('should return an array of titleObjects if the user has watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/user/watchlist')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200);
                // Expect an array of titleObjects
                expect(res.body).to.be.an('array');
                done();
            });
        })
    });
});

// Remove a title from the favorites
describe('Remove a title from Favorites', () => {
    it('should return 204 if the title is removed from the favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromFavorites/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204);
                done();
            });
        })
    });
    it('should return 404 if the title is not in the favorites', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromFavorites/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
    it('should return 404 if the titleID is not found', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromFavorites/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
});

// Remove a title from the watchlist
describe('Remove a title from Watchlist', () => {
    it('should return 204 if the title is removed from the watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromWatchlist/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(204);
                done();
            });
        })
    });
    it('should return 404 if the title is not in the watchlist', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromWatchlist/:' + titleID_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
    it('should return 404 if the titleID is not valid', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .delete('/ntuaflix_api/user/deleteFromWatchlist/:' + titleID_wrong)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404);
                done();
            });
        })
    });
});


// Change the username of the random user
describe('Update Profile', () => {
    // Change the username of the random user to testuser -> should fail
    // [PUT] /updateProfile
    it('should return 400 if the username already exists', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: _username,
            password: _password
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .put('/ntuaflix_api/user/updateProfile') // updateUserProfile.js
            .set('X-OBSERVATORY-AUTH', token)
            .send({
                username: "testuser" // This username already exists!
            })
            .end((err, res) => {
                console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(400);
                done();
            });
        })
    });
    // Change the username of the random user to random_testuser_changed -> should succeed
    // [PUT] /updateProfile
     it('[PROBLEM] should return 201 if the username is changed', (done) => {
         request(app)
         .post('/ntuaflix_api/auth/login')
         .send({
             username: _username,
             password: _password
         })
         .end((err, res) => {
             token = res.body.token;
             request(app)
             .put('/ntuaflix_api/updateProfile')
             .set('X-OBSERVATORY-AUTH', token)
             .send({
                 username: _username_changed
             })
             .end((err, res) => {
                 console.log('Response:', res.status, res.body);
                 expect(res.status).to.equal(201);
                 done();
             });
         })
     });
});