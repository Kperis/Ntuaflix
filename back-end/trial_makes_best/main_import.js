const setupDatabase = require('./connect_database');

//const addTsvToTable2 = require('./addTsvToTable2');
const addTsvToTitleObject = require('./addTsvToTitleObject');
const addTsvToEpisode = require('./addTsvEpisode');
const addTsvToRatings = require('./addTsvRating');
const addTsvToAkas = require('./addTsvAkas');
const addTsvToNameBasics = require('./addTsvNameBasics');
const addTsvToPrincipals = require('./addTsvPrincipals');

async function main() {
  let pool;

  try {
    // Set up the database connection and other common information
    pool = await setupDatabase();

    // Run specific functionality for adding TSV files to tables
    await addTsvToTitleObject(pool);
    console.log('Done with title object');
    await addTsvToNameBasics(pool);
    console.log('Done with name basics');
    await addTsvToAkas(pool);
    console.log('Done with akas');
    await addTsvToEpisode(pool);
    console.log('Done with episode');
    await addTsvToRatings(pool);
    console.log('Done with ratings');
    await addTsvToPrincipals(pool);
    console.log('Done with principals');

    //await addTsvToTable2(pool);
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