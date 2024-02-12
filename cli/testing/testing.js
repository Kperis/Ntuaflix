
const { expect } = require('chai');
const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const formating = require("../lib/format_data");
const { exec } = require('child_process');
const chalk = require('chalk');
const { promisify } = require('util');
const execPromise = promisify(exec);
const http = require('http');
const configuration = require('../lib/construct_config');
var token;
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA)");
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
try{
    process.chdir("../");
}catch(err){
    console.error("Error reading token file:", err);
}


describe('CLI Application test login command', () => {
    it('a message should be printed in the console that informs the user \
    whether his is successfully logged in or not ',() => {
  
        const cliCommand_1 = `se2333 login --username DarkForest  --password DeathEnds`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'User successfully logged in'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
        
        console.log("OMG KAI TRIA LOL");
        const cliCommand_2 = `se2333 login --username asdf  --password adsf`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'No user with this credentials found. Please try again.'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });

// Read the token file synchronously
try {
    token = fs.readFileSync('./softeng23_33.token', 'utf8').trim();
} catch (err) {
    console.error("Error reading token file:", err);
    process.exit(1); // Exit with error if unable to read the token file
}


describe('CLI Application test adduser command', () => {
    var randomNumber_1 = Math.random(); // Generate a random number between 0 (inclusive) and 1 (exclusive)
    randomNumber_1 = randomNumber_1.toFixed(4);
    it('first test to adduser with username and password and second to update it ', async () => {
        const cliCommand_1 = `se2333 adduser --username ${randomNumber_1} --password ${randomNumber_1}`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = `{\n  "message": "Registration Completed. Please login"\n}`;
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });
    it( 'second test to update the password of the user', async () => {
        const cliCommand_2 = `se2333 adduser --username ${randomNumber_1} --password ${randomNumber_1}`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = '{\n  "message": "Password Updated"\n}';
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });


describe('CLI Application test user command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the username exists',async () => {
        const username = 'DarkForest';
  
        const cliCommand_1 = `se2333 user --username ${username}`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();

        //console.log(actualResponseFromCLI_1);
        var config_1 = {
            method : 'get',
            url : 'http://localhost:9876/ntuaflix_api/admin/users/' + username,
            headers : {
              'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
            }
        }
        //console.log(config);
        var formattedData_1 = {};
        const response_1 = await axios(config_1);
  
        formattedData_1 = formating.formatData(response_1.data,"json");
  
        expect(actualResponseFromCLI_1).to.equal(formattedData_1);
    });
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the username doesnt exists',async () => {
        const cliCommand_2 = `se2333 user --username notexistuser`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expected_response = "User not found";
        expect(actualResponseFromCLI_2).to.equal(expected_response);
    });
  });


describe('CLI Application test healthcheck command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
  ', async () => {
  
        const cliCommand_1 = `se2333 healthcheck`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
  
        var config_1 = {
            method : 'get',
            url : 'http://localhost:9876/ntuaflix_api/admin/healthcheck',
            headers : {
              'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
            }
        }
  
        //console.log(config);
        var formattedData_1 = {};
  
        const response_1 = await axios(config_1);
  
        formattedData_1 = formating.formatData(response_1.data,"json");
  
        expect(actualResponseFromCLI_1).to.equal(formattedData_1);
    });
  });


describe('CLI Application test uploadtsvprincipals command',() => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not',() => {
  
        const cliCommand_1 = `se2333 newprincipals --filename ../back-end/test/testing_tsvs/truncated_title.principals_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
  
        const cliCommand_2 = `se2333 newprincipals --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });


describe('CLI Application test newtitles command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newtitles --filename ../back-end/test/testing_tsvs/truncated_title.basics_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA) LOOOOKK")
        const cliCommand_2 = `se2333 newtitles --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });


describe('CLI Application test newakas command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newakas --filename ../back-end/test/testing_tsvs/truncated_title.akas_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
        console.log("OMG KAI TRIA LOL");
        const cliCommand_2 = `se2333 newakas --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });



describe('CLI Application test newnames command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newnames --filename ../back-end/test/testing_tsvs/truncated_name.basics_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
  
        const cliCommand_2 = `se2333 newnames --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });


describe('CLI Application test newcrew command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newcrew --filename ../back-end/test/testing_tsvs/truncated_title.crew_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
  
        const cliCommand_2 = `se2333 newcrew --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });



describe('CLI Application test newepisode command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newepisode --filename ../back-end/test/testing_tsvs/truncated_title.episode_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
  
        const cliCommand_2 = `se2333 newepisode --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });


describe('CLI Application test newratings command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', () => {
  
        const cliCommand_1 = `se2333 newratings --filename ../back-end/test/testing_tsvs/truncated_title.ratings_10_rows.tsv`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        const expectedresponse = 'status :  201 message :  File uploaded and processed successfully.'
        expect(actualResponseFromCLI_1).to.equal(expectedresponse);
  
        const cliCommand_2 = `se2333 newratings --filename falsepath`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expectedresponse_2 = 'an error occurred'
        expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
    });
  });

describe('CLI Application test title command', () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
  \n if the titleid exists or it doesnt',async () => {
      const titleid = 'tt0000929';

      const cliCommand_1 = `se2333 title --titleID ${titleid}`;
      const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();

      var config_1 = {
          method : 'get',
          url : 'http://localhost:9876/ntuaflix_api/title/' + titleid,
          headers : {
            'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
          }
      }
      //console.log(config);
      var formattedData_1 = {};
      const response_1 = await axios(config_1);

      formattedData_1 = formating.formatData(response_1.data,"json");

      expect(actualResponseFromCLI_1).to.equal(formattedData_1);

  });
  it('the returned values from the cli should equal the responses immediately from the backend\
  \n if the titleid doesnt exists',async () => {
      const cliCommand_2 = `se2333 title --titleID notexistid`;
      const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
      const expected_response = "No title found"
      expect(actualResponseFromCLI_2).to.equal(expected_response);
  
  });
});


describe('CLI Application test bygenre command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
    ',async () => {
        const genre = 'Short';
        const min = "0";
        const from = "1980";
        const to = "2022";
        const cliCommand_1 = `se2333 bygenre --genre ${genre} --min ${min} --from ${from} --to ${to} --format json`
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
        var config_1 = {
            method : 'get',
            url : 'http://localhost:9876/ntuaflix_api/bygenre',
            headers : {
              'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
            },
            data : {
              'qgenre': genre,
              'minrating': min,
              'yrFrom': from, 
              'yrTo': to
            },
        }
        await delay(500);
        //console.log("OMG KAI TRIA LOL");
        //console.log(config);
        var formattedData_1 = {};
        const response_1 =await axios(config_1);
  
  
        formattedData_1 = formating.formatData(response_1.data,"json");
  
        expect(actualResponseFromCLI_1).to.equal(formattedData_1);
    } );
  });


describe('CLI Application test name command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the nameid exists',async () => {
        const nameid = 'nm0000001';
  
        const cliCommand_1 = `se2333 name --nameid ${nameid}`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
  
  
        var config_1 = {
            method : 'get',
            url : 'http://localhost:9876/ntuaflix_api/name/' + nameid,
            headers : {
              'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
            }
        }
        //console.log(config);
        var formattedData_1 = {};
        const response_1 = await axios(config_1);
  
        formattedData_1 = formating.formatData(response_1.data,"json");
        
  
        expect(actualResponseFromCLI_1).to.equal(formattedData_1);
        
    });
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the nameid doesnt exists',async () => {
        const cliCommand_2 = `se2333 name --nameid fakenameid`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expected_response = 'Name not found';
        expect(actualResponseFromCLI_2).to.equal(expected_response);
    });
  });


describe('CLI Application test searchname command', () => {
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the namepart exists',async () => {
        const namepart = "Astaire" ;
  
        const cliCommand_1 = `se2333 searchname --name "${namepart}"`;
        const actualResponseFromCLI_1 = execSync(cliCommand_1).toString().trim();
  
        var config_1 = {
            method : 'get',
            url : 'http://localhost:9876/ntuaflix_api/searchname',
            headers : {
              'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
            },
            data:{namePart:namepart}
        }
        //console.log(config);
        var formattedData_1 = {};
        const response_1 = await axios(config_1);
        
  
        formattedData_1 = formating.formatData(response_1.data,"json");
  
        expect(actualResponseFromCLI_1).to.equal(formattedData_1);
    });
    it('the returned values from the cli should equal the responses immediately from the backend\
    \n if the namepart doesnt exists',async () => {
        const cliCommand_2 = `se2333 searchname --name fakenamepart`;
        const actualResponseFromCLI_2 = execSync(cliCommand_2).toString().trim();
        const expected_response = 'No data';
        expect(actualResponseFromCLI_2).to.equal(expected_response);
    });
  });

  describe('CLI Application test unit resetall command', () => {
    it('it should send a request to reset the database to the back-end',async () => {
        const cliCommand_1 = `se2333 resetall`;
        const actualResponseFromCLI_1 = configuration.configconstructor('resetall',token,null);
        const expectedconfiguration = {
          method : 'post',
          url : 'http://localhost:9876/ntuaflix_api/admin/resetall',
          headers : {
            'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token
          }
        }
        expect(actualResponseFromCLI_1.toString()).to.equal(expectedconfiguration.toString());
    });
  });
