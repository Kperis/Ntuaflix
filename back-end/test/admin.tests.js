
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

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

