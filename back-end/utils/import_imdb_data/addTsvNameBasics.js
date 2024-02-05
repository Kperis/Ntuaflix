const fs = require('fs');
const path = require('path');
const pool = require('../database'); // Assuming you export the setupDatabase function

async function addTsvToNameBasics(pool,N) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_name.basics.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_Contributors = 'INSERT INTO Contributors (contributor_id,primary_name,birth_year,death_year,image_url) VALUES (?, ?, ?, ?, ?)';
    const insertQuery_Professions = 'INSERT INTO Primary_profession (contributor_id,profession) VALUES (?, ?)';
    const insertQuery_KnownForTitles = 'INSERT INTO Known_for (contributor_id,movie_id) VALUES (?, ?)';
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
        const values_for_Contributors = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][6]];
        const pri_prof = rows[i][4].split(',');
        const known_for = rows[i][5].split(',');
        
        // Execute the query
        const result = await pool.query(insertQuery_Contributors, values_for_Contributors);

        for (let j = 0; j < pri_prof.length; j++) {
            const values_for_pri_prof = [rows[i][0], pri_prof[j]];
            const result = await pool.query(insertQuery_Professions, values_for_pri_prof);
        }
        for (let j = 0; j <known_for.length; j++) {
            const values_for_known_for = [rows[i][0], known_for[j]];
            const result = await pool.query(insertQuery_KnownForTitles, values_for_known_for);
        }
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

module.exports = addTsvToNameBasics;