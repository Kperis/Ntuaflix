
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {pool} = require('../utils/database');
const loadTest = require('../utils/import_imdb_data/importTestDatabase');

chai.use(chaiHttp);

let token;
let username_correct = "testuser";



describe('ADMIN LOGIN',() =>{
    // Login with a user that exist
    it('should login the admin', (done) => {
        request(app)
            .post('/ntuaflix_api/auth/login')
            .send({
                username : "testadmin",
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
});


describe('ADMIN - SEARCH USER', () => {
    it('should return the users info if the user exists', (done) => {
        request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testadmin",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .get('/ntuaflix_api/admin/users/:' + username_correct)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(200); 
                // Also expect res to be a json with titleID / type / originalTitle / titlePoster / startYear / endYear / genres / akasInfo / principals / rating
                expect(res.body).to.have.property('user_id');
                expect(res.body).to.have.property('username');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('first_name');
                expect(res.body).to.have.property('last_name');
                expect(res.body).to.have.property('birthdate');
                expect(res.body).to.have.property('role');
                done();
            });
        })
    });
    it('should return 404 if the user with this username doesnt exist', (done) => {
        chai.request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testadmin",
            password: "1234"
        })
        .end((err, res) => {
            username_incorrect = "testuser_incorrect";
            token = res.body.token;
            chai.request(app)
            .get('/ntuaflix_api/admin/users/' + username_incorrect)
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                expect(res.status).to.equal(404); 
                done();
            });
        })
    });
    it('should return 404 if the username is missing', (done) => {
        chai.request(app)
        .post('/ntuaflix_api/auth/login')
        .send({
            username: "testadmin",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            chai.request(app)
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



let responseHealthcheck;
describe('ADMIN HEALTHCHECK (GET {baseurl}/admin/healthcheck)', () => {
    it('should return with status 200', (done) => {
        request(app)
        .get("/ntuaflix_api/admin/healthcheck")
        .set('X-OBSERVATORY-AUTH', token)
        .end((err, res) => {
            //console.log('Response:', res.status, res.body);
            responseHealthcheck = res.body.message;
            expect(res.status).to.equal(200); // Update the expected status code if needed
            done();
        });
    
    });
    const connectionDetails = {
        host: pool.config.connectionConfig.host,
        port: pool.config.connectionConfig.port,
        user: pool.config.connectionConfig.user,
        database: pool.config.connectionConfig.database,
    };

    it('should return message: OK', (done) => {
        // Wait for the responseHealthcheck to be set before making the assertion
        expect(responseHealthcheck).to.deep.equal(connectionDetails);
        done();
    });
});


let resonseTitleObjecttsv;
describe('ADMIN IMPORT TitleBasics (POST {baseurl}/admin/upload/titlebasics', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/titlebasics")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_title.basics_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          resonseTitleObjecttsv = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });

    it('should return message: Title basics imported', (done) => {
        // Wait for the responseResetStatus to be set before making the assertion
        expect(resonseTitleObjecttsv).to.equal('File uploaded and processed successfully.');
        done();
    });
})

let responsetitleAkas;
describe('ADMIN IMPORT Title Akas (POST {baseurl}/admin/upload/titleakas)', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/titleakas")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_title.akas_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responsetitleAkas = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });

    it('should return message: Title akas imported', (done) => {
        // Wait for the responsetitleAkas to be set before making the assertion
        expect(responsetitleAkas).to.equal('File uploaded and processed successfully.');
        done();
    });
});

let responseNameBasics;
describe('ADMIN IMPORT Title Basics (POST {baseurl}/admin/upload/namebasics)', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/namebasics")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_name.basics_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseNameBasics = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });

    it('should return message: Name basics imported', (done) => {
        // Wait for the responseNameBasics to be set before making the assertion
        expect(responseNameBasics).to.equal('File uploaded and processed successfully.');
        done();
    });
});

let responseTitlePrincipals;
describe('ADMIN IMPORT Title Principals (POST {baseurl}/admin/upload/titleprincipals)', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/titleprincipals")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_title.principals_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitlePrincipals = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });
    it('should return message: Title principals imported', (done) => {
        // Wait for the responseTitlePrincipals to be set before making the assertion
        expect(responseTitlePrincipals).to.equal('File uploaded and processed successfully.');
        done();
    });
});

let responseTitleEpisode;
describe('ADMIN IMPORT Title Episode (POST {baseurl}/admin/upload/titleepisode)', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/titleepisode")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_title.episode_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitleEpisode = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });

    it('should return message: Title episode imported', (done) => {
        // Wait for the responseTitleEpisode to be set before making the assertion
        expect(responseTitleEpisode).to.equal('File uploaded and processed successfully.');
        done();
    });
});

let responseTitleRatings;
describe('ADMIN IMPORT Title Basics (POST {baseurl}/admin/upload/titleratings)', () => {
    it('should return with status 201', (done) => {
        request(app)
        .post("/ntuaflix_api/admin/upload/titleratings")
        .set('X-OBSERVATORY-AUTH', token)
        .attach('file', './test/testing_tsvs/truncated_title.ratings_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitleRatings = res.body.message;
          expect(res.status).to.equal(201);
          done();
        });
    
    });
    it('should return message: Title ratings imported', (done) => {
        // Wait for the responseTitleRatings to be set before making the assertion
        expect(responseTitleRatings).to.equal('File uploaded and processed successfully.');
        done();
    });
});



describe('ADMIN RESET DATABASE (POST {baseurl}/admin/resetall)', () => {
    let responseResetStatus;

    it('should return with status 201', function(done) {
        //this.timeout(10000); // Set the timeout to 10 seconds

        request(app)
        .post("/ntuaflix_api/auth/login")
        .send({
            username: "testadmin",
            password: "1234"
        })
        .end((err, res) => {
            token = res.body.token;
            request(app)
            .post("/ntuaflix_api/admin/resetall")
            .set('X-OBSERVATORY-AUTH', token)
            .end((err, res) => {
                //console.log('Response:', res.status, res.body);
                responseResetStatus = res.body.status;
                expect(res.status).to.equal(201); // Update the expected status code if needed
                done();
            });
        });
    });

    it('should return message: Database reset', (done) => {
        // Wait for the responseResetStatus to be set before making the assertion
        expect(responseResetStatus).to.equal('OK');
        done();
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
