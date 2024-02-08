/* Import Functions */
const addTsvToTitleObject = require('./addTsvToTitleObject');

const addTsvToEpisode = require('./addTsvEpisode');
const addTsvToRatings = require('./addTsvRating');
const addTsvToAkas = require('./addTsvAkas');
const addTsvToNameBasics = require('./addTsvNameBasics');
const addTsvToPrincipals = require('./addTsvPrincipals');

/* Import Libraries */
const mysql = require('mysql2/promise');
const chalk = require('chalk');

const database_name = 'ntuaflix';
var N = true;
if(database_name === 'ntuaflix'){
    N = true;
}else{
    N = false;
}

async function setupDatabase() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: database_name,//'ntuaflix_test',
        password: '',
        port: 3306, // Replace with your actual MySQL port
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
        });

    return pool;
}

async function main() {
  let pool;

  try {
    // Set up the database connection and other common information
    pool = await setupDatabase();

    console.log(chalk.yellow('Filling Database with TSV files...')); 
    // Run specific functionality for adding TSV files to tables
    console.log(chalk.yellow('Title object...'));
    await addTsvToTitleObject(pool,N);
    console.log(chalk.yellow('Name basics...'));
    await addTsvToNameBasics(pool,N);
    console.log(chalk.yellow('Αkas...'));
    await addTsvToAkas(pool,N);
    console.log(chalk.yellow('Episode...'));
    await addTsvToEpisode(pool,N);
    console.log(chalk.yellow('Ratings...'));
    await addTsvToRatings(pool,N);
    console.log(chalk.yellow('Principals...'));
    await addTsvToPrincipals(pool,N);
    console.log(chalk.green('Done with all TSV files! Database is ready! '));
    console.log(chalk.green('You can now run the server with "npm start"!'));
    // await addTsvToTable2(pool);
  } catch (error) {
    console.error('Error in main:', error);
  } finally {
    // Close the database connection when done
    if (pool) {
      pool.end();
    }
  }
}

// Run the main function
main();