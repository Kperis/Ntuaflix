
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {pool} = require('../utils/database');

chai.use(chaiHttp);
let responseHealthcheck;
describe('Test admin healthcheck (GET {baseurl}/admin/healthcheck)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .get("/ntuaflix_api/admin/healthcheck")
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
describe('Test admin import title object (POST {baseurl}/admin//upload/titlebasics', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/titlebasics")
        .attach('file', './test/testing_tsvs/truncated_title.basics_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          console.log('Response:', res.body); // Log the response body
          resonseTitleObjecttsv = res.body.message;
          expect(res.status).to.equal(200);
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
describe('Test admin import title akas (POST {baseurl}/admin/upload/titleakas)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/titleakas")
        .attach('file', './test/testing_tsvs/truncated_title.akas_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responsetitleAkas = res.body.message;
          expect(res.status).to.equal(200);
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
describe('Test admin import name basics (POST {baseurl}/admin/upload/namebasics)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/namebasics")
        .attach('file', './test/testing_tsvs/truncated_name.basics_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseNameBasics = res.body.message;
          expect(res.status).to.equal(200);
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
describe('Test admin import title principals (POST {baseurl}/admin/upload/titleprincipals)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/titleprincipals")
        .attach('file', './test/testing_tsvs/truncated_title.principals_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitlePrincipals = res.body.message;
          expect(res.status).to.equal(200);
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
describe('Test admin import title episode (POST {baseurl}/admin/upload/titleepisode)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/titleepisode")
        .attach('file', './test/testing_tsvs/truncated_title.episode_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitleEpisode = res.body.message;
          expect(res.status).to.equal(200);
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
describe('Test admin import title ratings (POST {baseurl}/admin/upload/titleratings)', () => {
    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/upload/titleratings")
        .attach('file', './test/testing_tsvs/truncated_title.ratings_10_rows.tsv')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done(err);
            return;
          }
      
          //console.log('Response:', res.body); // Log the response body
          responseTitleRatings = res.body.message;
          expect(res.status).to.equal(200);
          done();
        });
    
    });
    it('should return message: Title ratings imported', (done) => {
        // Wait for the responseTitleRatings to be set before making the assertion
        expect(responseTitleRatings).to.equal('File uploaded and processed successfully.');
        done();
    });
});



describe('Test admin reset database (POST {baseurl}/admin/resetall)', () => {
    let responseResetStatus;

    it('should return with status 200', (done) => {
        chai.request(app)
        .post("/ntuaflix_api/admin/resetall")
        .end((err, res) => {
            console.log('Response:', res.status, res.body);
            responseResetStatus = res.body.status;
            expect(res.status).to.equal(200); // Update the expected status code if needed
            done();
        });
    
    });

    it('should return message: Database reset', (done) => {
        // Wait for the responseResetStatus to be set before making the assertion
        expect(responseResetStatus).to.equal('OK');
        done();
    });
});

