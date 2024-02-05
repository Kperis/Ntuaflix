const fs = require('fs');
const path = require('path');
const pool = require('../database'); // Assuming you export the setupDatabase function

async function addTsvToTitleObject(pool) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_title.basics.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_TitleObject = 'INSERT INTO TitleObject (movie_id,type,primary_title,original_title,is_adult,start_year,end_year,runtime_min,image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const insertQuery_Genres = 'INSERT INTO Genres (movie_id,genre) VALUES (?, ?)';
    // Iterate over the rows and execute the database query
    //for (let i = 1; i < rows.length; i++) {
    for (let i = 1 ; i < rows.length ; i++) {
        try {
        // Adjust the values based on your TSV columns
        const values_for_TitleObject = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5], rows[i][6], rows[i][7], rows[i][9]];
        const genres = rows[i][8].split(',');
        console.log(values_for_TitleObject);
        for (let k = 5; k < values_for_TitleObject.length-1; k++) {
            const stringValue = values_for_TitleObject[k];
            const intValue = parseInt(stringValue, 10);
        
            if (!isNaN(intValue)) {
                // Handle the case where the string can be converted to an int
                console.log(`${stringValue} can be converted to int: ${intValue}`);
            } else {
                // Handle the case where the string cannot be converted to an int
                console.log(`${stringValue} cannot be converted to int`);
                values_for_TitleObject[k] = '0';
            }
        }
        
        // Execute the query
        const result = await pool.query(insertQuery_TitleObject, values_for_TitleObject);

        for (let j = 0; j < genres.length; j++) {
            const values_for_Genres = [rows[i][0], genres[j]];
            const result = await pool.query(insertQuery_Genres, values_for_Genres);
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

module.exports = addTsvToTitleObject;