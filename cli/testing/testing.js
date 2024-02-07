
const { expect } = require('chai');
const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const formating = require("../lib/format_data");
const { exec } = require('child_process');

var token;



describe('CLI Application test login command', async () => {
  it('a message should be printed in the console that informs the user \
  whether his is successfully logged in or not ', async () => {

      const cliCommand_1 = `se2333 login --username DarkForest  --password DeathEnds`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'User successfully logged in';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 login --username asdf  --password adsf`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'No user with these credentials found. Please try again.';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});

// Read the token file synchronously
try {
    token = fs.readFileSync('../softeng23_33.token', 'utf8').trim();
    process.chdir("../");
} catch (err) {
    console.error("Error reading token file:", err);
    process.exit(1); // Exit with error if unable to read the token file
}

describe('CLI Application test title command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
  \n if the titleid exists or it doesnt', async () => {
      const titleid = 'tt0015724';

      const cliCommand_1 = `se2333 title --titleID ${titleid}`;
      
      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/title/' + titleid,
              headers: { 'Authorization': 'Bearer ' + token }
          };

          axios(config_1)
              .then(response => {
                  const formattedData_1 = formating.formatData(response.data, "json");
                  expect(actualResponseFromCLI_1).to.equal(formattedData_1);
              })
              .catch(error => {
                  console.error(`Error fetching data from backend: ${error.message}`);
              });
      });

      const cliCommand_2 = `se2333 title --titleID notexistid`;
      
      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();

          var config_2 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/title/notexistid',
              headers: { 'Authorization': 'Bearer ' + token }
          };

          axios(config_2)
              .then(response => {
                  const formattedData_2 = formating.formatData(response.data, "json");
                  expect(actualResponseFromCLI_2).to.equal(formattedData_2);
              })
              .catch(error => {
                  console.error(`Error fetching data from backend: ${error.message}`);
              });
      });
  });
});


describe('CLI Application test adduser command', async () => {
  it('first test to adduser with username and password and second to update it ', async () => {
      var randomNumber_1 = Math.random().toFixed(4); // Generate a random number with 4 decimal places
      const cliCommand_1 = `se2333 adduser --username ${randomNumber_1} --password ${randomNumber_1}`;
      
      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = `{\n  "message": "Registration Completed. Please login"\n}`;
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 adduser --username ${randomNumber_1} --password ${randomNumber_1}`;
      
      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = '{\n  "message": "Password Updated"\n}';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});



describe('CLI Application test user command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
  \n if the username exists or it doesn\'t', async () => {
      const username = 'DarkForest';

      const cliCommand_1 = `se2333 user --username ${username}`;
      
      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/admin/users/' + username,
              headers: { 'Authorization': 'Bearer ' + token }
          };

          axios(config_1)
              .then(response => {
                  const formattedData_1 = formating.formatData(response.data, "json");
                  expect(actualResponseFromCLI_1).to.equal(formattedData_1);
              })
              .catch(error => {
                  console.error(`Error fetching data from backend: ${error.message}`);
              });
      });

      const cliCommand_2 = `se2333 user --username notexistuser`;
      
      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();

          var config_2 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/admin/users/notexistuser',
              headers: { 'Authorization': 'Bearer ' + token }
          };

          axios(config_2)
              .then(response => {
                  const formattedData_2 = formating.formatData(response.data, "json");
                  expect(actualResponseFromCLI_2).to.equal(formattedData_2);
              })
              .catch(error => {
                  console.error(`Error fetching data from backend: ${error.message}`);
              });
      });
  });
});




describe('CLI Application test healthcheck command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend', async () => {
      const cliCommand_1 = `se2333 healthcheck`;
      
      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/admin/healthcheck',
              headers: { 'Authorization': 'Bearer ' + token }
          };

          axios(config_1)
              .then(response => {
                  const formattedData_1 = formating.formatData(response.data, "json");
                  expect(actualResponseFromCLI_1).to.equal(formattedData_1);
              })
              .catch(error => {
                  console.error(`Error fetching data from backend: ${error.message}`);
              });
      });
  });
});



describe('CLI Application test uploadtsvprincipals command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
  whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newprincipals --filename ../back-end/test/testing_tsvs/truncated_title.principals_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newprincipals --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});


describe('CLI Application test newtitles command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newtitles --filename ../back-end/test/testing_tsvs/truncated_title.basics_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newtitles --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});


describe('CLI Application test newakas command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newakas --filename ../back-end/test/testing_tsvs/truncated_title.akas_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newakas --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});



describe('CLI Application test newnames command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newnames --filename ../back-end/test/testing_tsvs/truncated_name.basics_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newnames --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});


describe('CLI Application test newcrew command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newcrew --filename ../back-end/test/testing_tsvs/truncated_title.crew_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newcrew --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});



describe('CLI Application test newepisode command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
      whether the filepath is correct or not', async () => {
      const cliCommand_1 = `se2333 newepisode --filename ../back-end/test/testing_tsvs/truncated_title.episode_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.';
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newepisode --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occurred';
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});

describe('CLI Application test newratings command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\
  whether the filepath is correct or not', async () => {

      const cliCommand_1 = `se2333 newratings --filename ../back-end/test/testing_tsvs/truncated_title.ratings_10_rows.tsv`;

      exec(cliCommand_1, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_1 = stdout.trim();
          const expectedresponse = 'status :  200 message :  File uploaded and processed successfully.'
          expect(actualResponseFromCLI_1).to.equal(expectedresponse);
      });

      const cliCommand_2 = `se2333 newratings --filename falsepath`;

      exec(cliCommand_2, (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }
          const actualResponseFromCLI_2 = stdout.trim();
          const expectedresponse_2 = 'an error occured'
          expect(actualResponseFromCLI_2).to.equal(expectedresponse_2);
      });
  });
});



describe('CLI Application test bygenre command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend', async () => {
      const genre = 'Horror';
      const min = "8";
      const from = "1990";
      const to = "2022";
      const cliCommand_1 = `se2333 bygenre --genre ${genre} --min ${min} --from ${from} --to ${to} --format json`;

      exec(cliCommand_1, async (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }

          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/bygenre',
              headers: { 'Authorization': 'Bearer ' + token },
              data: {
                  'qgenre': genre,
                  'minrating': min,
                  'yrFrom': from,
                  'yrTo': to
              },
          };

          const response_1 = await axios(config_1);
          const formattedData_1 = formating.formatData(response_1.data, "json");

          expect(actualResponseFromCLI_1).to.equal(formattedData_1);
      });
  });
});

describe('CLI Application test name command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\nif the nameid exists or it doesnt', async () => {
      const nameid = 'nm0000001';

      const cliCommand_1 = `se2333 name --nameid ${nameid}`;
      exec(cliCommand_1, async (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }

          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/name/' + nameid,
              headers: { 'Authorization': 'Bearer ' + token }
          };

          const response_1 = await axios(config_1);
          const formattedData_1 = formating.formatData(response_1.data, "json");

          expect(actualResponseFromCLI_1).to.equal(formattedData_1);
      });

      const fakeNameid = 'fakenameid';

      const cliCommand_2 = `se2333 name --nameid ${fakeNameid}`;
      exec(cliCommand_2, async (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }

          const actualResponseFromCLI_2 = stdout.trim();

          var config_2 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/name/' + fakeNameid,
              headers: { 'Authorization': 'Bearer ' + token }
          };

          const response_2 = await axios(config_2);
          const formattedData_2 = formating.formatData(response_2.data, "json");

          expect(actualResponseFromCLI_2).to.equal(formattedData_2);
      });
  });
});


describe('CLI Application test searchname command', async () => {
  it('the returned values from the cli should equal the responses immediately from the backend\nif the namepart exists or it doesnt', async () => {
      const namepart = "john Coo";

      const cliCommand_1 = `se2333 searchname --name "${namepart}"`;
      exec(cliCommand_1, async (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }

          const actualResponseFromCLI_1 = stdout.trim();

          var config_1 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/searchname',
              headers: { 'Authorization': 'Bearer ' + token },
              data: { namePart: namepart }
          };

          const response_1 = await axios(config_1);
          const formattedData_1 = formating.formatData(response_1.data, "json");

          expect(actualResponseFromCLI_1).to.equal(formattedData_1);
      });

      const fakeNamepart = "fakenamepart";

      const cliCommand_2 = `se2333 searchname --name "${fakeNamepart}"`;
      exec(cliCommand_2, async (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing command: ${error.message}`);
              return;
          }

          const actualResponseFromCLI_2 = stdout.trim();

          var config_2 = {
              method: 'get',
              url: 'http://localhost:9876/ntuaflix_api/searchname',
              headers: { 'Authorization': 'Bearer ' + token },
              data: { namePart: fakeNamepart }
          };

          const response_2 = await axios(config_2);
          const formattedData_2 = formating.formatData(response_2.data, "json");

          expect(actualResponseFromCLI_2).to.equal(formattedData_2);
      });
  });
});
