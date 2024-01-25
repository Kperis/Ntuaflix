
// cli/yourCLIFile.js
const program = require('commander');
const axios = require('axios');
const e = require('express');

const BASE_URL = 'http://localhost:9876'; // Update with your backend server URL

program
  .version('0.0.1')
  .description('Your CLI Application');

program
  .command('searchtitle <title>')
  .description('searching title by titleid')
  .action(async (title) => { // Capture the 'title' parameter here
    try {
      const response = await axios.get(`${BASE_URL}/ntuaflix_api/title/${title}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }finally{
        runInteractiveCLI();
    }
  });

// Add an interactive loop to keep the CLI running
async function runInteractiveCLI() {
  while (true) {
    const userInput = await getUserInput();
    const args = userInput.split(' ');

    if (args.length === 0) {
      continue; // Empty input, continue to next iteration
    }else if (userInput === '') {
        continue;
    }

    const command = args[0];

    if (program.commands.map(cmd => cmd._name).includes(command)) {
      try {
        program.parse(['', '', ...args]);
        break;
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    } else {
      console.error(`Unknown command '${command}'. Try again.`);
    }
  }
}

// A function to get user input
function getUserInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question('Enter a command: ', (input) => {
      readline.close();
      resolve(input.trim());
    });
  });
}

// Run the interactive CLI
runInteractiveCLI();
