const fs = require('fs');
const path = require('path');
const pool = require('./connect_database'); // Assuming you export the setupDatabase function

async function addTsvToAkas(pool) {
    const currentDir = __dirname;
    console.log(currentDir);


    const tsvFilePath = path.join(currentDir, '/tsv_files/', 'truncated_title.akas.tsv');
    console.log(tsvFilePath);
    //const tsvFilePath = 'C:/Users/ggeor/Desktop/trial_makes_best/truncated_title.basics.tsv';
    const data = fs.readFileSync(tsvFilePath, 'utf8');

    // Split the TSV data into rows and columns
    const rows = data.split('\n').map(row => row.split('\t'));

    // Define your database query
    const insertQuery_Akas = 'INSERT INTO Akas_info (movie_id,akas_title,region,language,is_original_title) VALUES (?, ?, ?, ?, ?)';
    const insertQuery_types = 'INSERT INTO Types (akas_id,type) VALUES (?, ?)';
    const insertQuery_attributes = 'INSERT INTO Attributes (akas_id,attribute) VALUES (?, ?)';
    // Iterate over the rows and execute the database query
    //for (let i = 1; i < rows.length; i++) {
    for (let i = 1 ; i < 6 ; i++) {
        try {
        // Adjust the values based on your TSV columns
        const values_for_Akas_info = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][6]];
        const types = rows[i][4].split(',');
        const attributes = rows[i][5].split(',');
        
        // Execute the query
        const [result] = await pool.query(insertQuery_Akas, values_for_Akas_info);

        for (let j = 0; j < types.length; j++) {
            const values_for_types = [rows[i][0], types[j]];
            const [result] = await pool.query(insertQuery_types, values_for_types);
        }
        for (let j = 0; j <attributes.length; j++) {
            const values_for_attributes = [rows[i][0], attributes[j]];
            const [result] = await pool.query(insertQuery_attributes, values_for_attributes);
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

module.exports = addTsvToAkas;