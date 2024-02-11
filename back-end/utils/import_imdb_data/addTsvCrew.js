const fs = require('fs');
const path = require('path');
const pool = require('../database'); // Assuming you export the setupDatabase function

async function addTsvToCrew(pool,N) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_title.crew.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_Works = 'INSERT INTO Works (movie_id,contributor_id,category) VALUES (?, ?, ?)';
    // Iterate over the rows and execute the database query
    //for (let i = 1; i < rows.length; i++) {
    var number = 0;
    if (N){
        number = rows.length;
    }else{
        number = 10;
    }
    for (let i = 1 ; i < number ; i++) {
        try {
        // Adjust the values based on your TSV columns
        const values_for_works = [rows[i][0],rows[i][1],rows[i][2]];
        const nameid_directors = rows[i][1].split(',');
        const nameid_wirters = rows[i][2].split(',');
        
        // Execute the query
        for (let j = 0; j < nameid_directors.length; j++) {
            const values_for_works_1 = [rows[i][0],nameid_directors[j],'director'];
            const result = await pool.query(insertQuery_Works, values_for_works_1);
        }
        for (let j = 0; j < nameid_wirters.length; j++) {
            const values_for_works_2 = [rows[i][0],nameid_wirters[j],'writer'];
            const result = await pool.query(insertQuery_Works, values_for_works_1);
        }

        } catch (error) {
        console.error('Error inserting row:', error);
        continue;
        }
    }


    // Close the database connection pool when done
    //pool.end();
    
};

module.exports = addTsvToCrew;