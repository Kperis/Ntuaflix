const fs = require('fs');
const path = require('path');
const pool = require('../database'); // Assuming you export the setupDatabase function

async function addTsvToEpisode(pool,N) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_title.episode.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_Episodes = 'INSERT INTO Episode_info (movie_id,parent_id,season_num,episode_num) VALUES (?, ?, ?, ?)';
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
        const values_for_episodes = [rows[i][0],rows[i][1],rows[i][2],rows[i][3]];
        
        // Make null values 0
        for (let k = 2; k < values_for_episodes.length; k++) {
            const stringValue = values_for_episodes[k];
            const intValue = parseInt(stringValue, 10);
        
            if (!isNaN(intValue)) {
                // Handle the case where the string can be converted to an int
                //console.log(`${stringValue} can be converted to int: ${intValue}`);
            } else {
                // Handle the case where the string cannot be converted to an int
                //console.log(`${stringValue} cannot be converted to int`);
                values_for_episodes[k] = '0';
            }
        }

        // Execute the query
        const result = await pool.query(insertQuery_Episodes, values_for_episodes);

        //console.log(rows[i][8]);
        //console.log('Row inserted:', result);
        } catch (error) {
        // Check if it is the last row and if it is blank
        if (i == rows.length-1 && rows[i] == ''){
            console.log('Error in last row (blank row)');
            continue;
        }
        console.error('Error inserting row:', error);
        // Close the database connection pool on error
        //pool.end();
        continue;
        }
    }


    // Close the database connection pool when done
    //pool.end();
    
};

module.exports = addTsvToEpisode;