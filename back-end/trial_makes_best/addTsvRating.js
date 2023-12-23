const fs = require('fs');
const path = require('path');
const pool = require('./connect_database'); // Assuming you export the setupDatabase function

async function addTsvToRatings(pool) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_title.ratings.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_Ratings = 'INSERT INTO Ratings (movie_id,average_rating,num_votes) VALUES (?, ?, ?)';
    // Iterate over the rows and execute the database query
    //for (let i = 1; i < rows.length; i++) {
    for (let i = 1 ; i < 6 ; i++) {
        try {
        // Adjust the values based on your TSV columns
        const values_for_ratings = [rows[i][0], rows[i][1], rows[i][2]];
        
        // Execute the query
        const [result] = await pool.query(insertQuery_Ratings, values_for_ratings);

        //console.log(rows[i][8]);
        //console.log('Row inserted:', result);
        } catch (error) {
        console.error('Error inserting row:', error);
        // Close the database connection pool on error
        //pool.end();
        continue;
        }
    }


    // Close the database connection pool when done
    //pool.end();
    
};

module.exports = addTsvToRatings;