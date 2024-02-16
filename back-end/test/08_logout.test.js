const request = require('supertest');
const chai = require('chai')
const expect = chai.expect;
const app = require('../app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const loadTest = require('../utils/import_imdb_data/importTestDatabase');
const {pool} = require('../utils/database');

// Variables
let token;

// TEST FOR [POST]/auth/logout
describe('LOGOUT',() =>{
    // Logout a user
    it('should logout a user', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/login')
            .send(existing_user)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                token = res.body.token;
                request(app)
                    .post('/ntuaflix_api/auth/logout')
                    .set('X-OBSERVATORY-AUTH', token)
                    .end((err, res) => {
                        //console.log('Response:', res.status, res.body);
                        expect(res.status).to.equal(200); // Update the expected status code if needed
                        done();
                    });
            });
    });

    it('should not allow a user to login with a deactivated Token', (done) => {
        request(app)
            .get('/ntuaflix_api/home')
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(401); // Update the expected status code if needed
                expect(res.body.message).to.equal('You are logged out. Try logging in'); // Update the expected message if needed
                done();
            });
    });
});

// Finish testing!
after(async ()=> {
    // Run loadTestData to load the test data again
    await loadTest();
    pool.end((err) => {
        if (err) {
            console.error('Error ending the pool', err);
        } else {
            console.log('Testing has ended!');

        }
    });
});