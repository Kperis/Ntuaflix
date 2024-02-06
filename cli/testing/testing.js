const { exec } = require('child_process');
const { expect } = require('chai');
const path = require('path');

describe('CLI Tests', function() {
    it('should return expected JSON response for healthcheck command', function(done) {
        const loginCommand = `cd.. && se2333 login --username DarkForest --password DeathEnds`;

        exec(loginCommand, (error, stdout, stderr) => {
            if (error) {
                done(error);
                return;
            }
            const expectedJson = "User successfully logged in\n";
            expect(stdout).to.equal(expectedJson);
            done();
        // });
        });
    });
});

describe('CLI Tests', function() {
    it('should return expected JSON response for healthcheck command', function(done) {

            // Execute healthcheck command
            exec('cd.. && se2333 healthcheck', (error, stdout, stderr) => {
                if (error) {
                    done(error);
                    return;
                }

                // Check healthcheck command output
                const expectedHealthcheckOutput ='{"status":"OK","message":{"host":"localhost","port":"3306","user":"root","database":"ntuaflix"}}';

                // Remove white spaces and newlines for comparison
                const actualHealthcheckOutput = stdout.trim().replace(/\s+/g, '');

                // Assert the actual output matches the expected JSON string
                expect(actualHealthcheckOutput).to.equal(expectedHealthcheckOutput);
                done();
            });
        });
    
});
