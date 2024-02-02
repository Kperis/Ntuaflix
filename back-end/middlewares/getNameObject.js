const {pool} = require('../utils/database');

const getNameObject = async (nameID) => {
    const sqlQuery_nameInfo = `
        SELECT
            Contributors.contributor_id AS nameID,
            Contributors.primary_name AS name,
            Contributors.image_url AS namePoster,
            Contributors.birth_year AS birthYr,
            Contributors.death_year AS deathYr,
            Primary_profession.profession AS profession
        FROM
            Contributors
        INNER JOIN 
            Primary_profession
        ON
            Contributors.contributor_id = Primary_profession.contributor_id
        WHERE
            Contributors.contributor_id = ?;`;

    const sqlQuery_nameTitlesList = `
        SELECT
            Works.movie_id AS titleID,
            Works.category AS category
        FROM
            Works
        WHERE
            Works.contributor_id = ?;`;

    let connection;
    
    try {
        connection = await new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                }
                resolve(connection);
            });
        });

        const nameInfo = await new Promise((resolve, reject) => {
            connection.query(sqlQuery_nameInfo, [nameID], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results[0]);
            });
        });

        const nameTitlesList = await new Promise((resolve, reject) => {
            connection.query(sqlQuery_nameTitlesList, [nameID], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });

        // Check if the result is empty
        if (!nameInfo) {
            const error = new Error('Name not found');
            error.status = 204;
            throw error;
        }

        const nameObject = {
            nameID: nameInfo.nameID,
            name: nameInfo.name,
            namePoster: nameInfo.namePoster,
            birthYr: nameInfo.birthYr,
            deathYr: nameInfo.deathYr,
            profession: nameInfo.profession,
            nameTitles: nameTitlesList
        };

        return nameObject;
    } catch (error) {
        // Depending on the status code, throw the apropriate error
        if (error.status === 204) {
            throw error;
        } else {
            const newError = new Error('Internal Server Error');
            newError.status = 500;
            throw newError;
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = { getNameObject };

// Example of the JSON i want to create 
// {
//     "nameID": "example_nconst",
//     "name": "John Doe",
//     "namePoster": "https://example.com/johndoe.jpg",
//     "birthYr": "1990",
//     "deathYr": "null",
//     "profession": "Software Engineer",
//     "nameTitles": [
//       {
//         "titleID": "example_tconst_1",
//         "category": "director"
//       },
//       {
//         "titleID": "example_tconst_2",
//         "category": "actor"
//       },
//       {
//         "titleID": "example_tconst_3",
//         "category": "composer"
//       }
//     ]
//   }
  