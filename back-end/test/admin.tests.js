
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

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

