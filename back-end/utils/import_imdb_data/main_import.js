
//const addTsvToTable2 = require('./addTsvToTable2');
const addTsvToTitleObject = require('./addTsvToTitleObject');

const addTsvToEpisode = require('./addTsvEpisode');
const addTsvToRatings = require('./addTsvRating');
const addTsvToAkas = require('./addTsvAkas');
const addTsvToNameBasics = require('./addTsvNameBasics');
const addTsvToPrincipals = require('./addTsvPrincipals');
//const mysql = require('mysql');
const mysql = require('mysql2/promise');

const database_name = 'ntuaflix_test';
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

    // Run specific functionality for adding TSV files to tables
    await addTsvToTitleObject(pool,N);
    console.log('Done with title object');
    await addTsvToNameBasics(pool,N);
    console.log('Done with name basics');
    await addTsvToAkas(pool,N);
    console.log('Done with akas');
    await addTsvToEpisode(pool,N);
    console.log('Done with episode');
    await addTsvToRatings(pool,N);
    console.log('Done with ratings');
    await addTsvToPrincipals(pool,N);
    console.log('Done with principals');

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