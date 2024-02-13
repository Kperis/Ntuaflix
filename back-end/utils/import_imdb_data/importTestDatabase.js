/* Import Libraries */
const mysql = require('mysql2/promise');
const database_name = 'ntuaflix_test';

async function loadTestData() {

  try {
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
        
    //const pool = await pool.connect();

    await pool.query('BEGIN');

    // Insert testAdmin
    // await pool.query(`INSERT INTO Users (first_name, last_name, birthdate, email, role) 
    //                     VALUES ('testadminFN', 'testadminLN', '1990-01-01', 'testadmin@example.com', 'admin')`);

    // await pool.query(`INSERT INTO Authentication (user_id, password, username) 
    //                     VALUES (1, '$2a$08$NRJ0rUt2NnGosoWtgu3vyuSZQDZhRcGNBOmhuBpthqLsb8efR2rjS', 'testadmin')`);

    // // Insert testUser
    // await pool.query(`INSERT INTO Users (first_name, last_name, birthdate, email) 
    //                     VALUES ('testuserFN', 'testuserLN', '1990-01-01', 'testuser@example.com')`);

    // await pool.query(`INSERT INTO Authentication (user_id, password, username) 
    //                     VALUES (2, '$2a$08$NRJ0rUt2NnGosoWtgu3vyuSZQDZhRcGNBOmhuBpthqLsb8efR2rjS', 'testuser')`);

    // Insert existing data
    await pool.query(`INSERT INTO TitleObject (movie_id, original_title, primary_title, start_year, end_year, is_adult, runtime_min, image_url, type)
                        VALUES ('tt123456', 'Existing Original Title', 'Existing Primary Title', 2000, 2022, FALSE, 120, 'https://example.com/image.jpg', 'Movie')`);

    await pool.query(`INSERT INTO Akas_info (akas_title, region, language, is_original_title, movie_id)
                        VALUES ('Existing Aka Title', 'US', 'English', TRUE, 'tt123456')`);

    await pool.query(`INSERT INTO Genres (movie_id, genre)
                        VALUES ('tt123456', 'Action')`);

    await pool.query(`INSERT INTO Episode_info (movie_id, season_num, episode_num, parent_id)
                        VALUES ('tt123456', 1, 1, NULL)`);

    await pool.query(`INSERT INTO Ratings (movie_id, average_rating, num_votes)
                        VALUES ('tt123456', 8.5, 100)`);

    await pool.query(`INSERT INTO Types (akas_id, type)
                        VALUES (1, 'Feature Film')`);

    await pool.query(`INSERT INTO Attributes (akas_id, attribute)
                        VALUES (1, 'Action')`);

    await pool.query(`INSERT INTO Contributors (contributor_id, primary_name, birth_year, death_year, image_url)
                        VALUES ('nm987654', 'Existing Contributor', 1970, NULL, 'https://example.com/contributor.jpg')`);

    await pool.query(`INSERT INTO Primary_profession (contributor_id, profession)
                        VALUES ('nm987654', 'Actor')`);

    await pool.query(`INSERT INTO Works (contributor_id, movie_id, category, job, characters, image_url)
                        VALUES ('nm987654', 'tt123456', 'Actor', 'Lead', 'Character Name', 'https://example.com/actor.jpg')`);

    await pool.query(`INSERT INTO Known_for (contributor_id, movie_id)
                        VALUES ('nm987654', 'tt123456')`);

    await pool.query('COMMIT');

    console.log('Test data loaded successfully');

    pool.end();
  } catch (err) {
    console.error('Error loading test data', err);
  }
};

module.exports = loadTestData;
