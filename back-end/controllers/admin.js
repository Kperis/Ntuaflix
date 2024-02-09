const {pool} = require('../utils/database');
const csvParser = require('csv-parser');
const fs = require('fs');


exports.getIndex = (req, res, next) => {
    res.status(200).json({ message: 'Hello Admin' });
}

exports.getHealthcheck = (req, res, next) => {
    const query = 'SELECT NOW()'; // Replace with your actual database connectivity check logic

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'failed', message: 'Error establishing database connection' });
        }

        connection.query(query, (err, result) => {
            connection.release();

            if (err) {
                console.error(err);
                return res.status(500).json({ status: 'failed', message: 'Error executing connection query' });
            }

            const connectionDetails = {
                host: pool.config.connectionConfig.host,
                port: pool.config.connectionConfig.port,
                user: pool.config.connectionConfig.user,
                database: pool.config.connectionConfig.database,
            };

            res.status(200).json({ status: 'OK', message: connectionDetails });
        });
    });
}


exports.uploadTitleBasics = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        const insertQuery_TitleObject = 'INSERT INTO TitleObject (movie_id,type,primary_title,original_title,is_adult,start_year,end_year,runtime_min,image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const insertQuery_Genres = 'INSERT INTO Genres (movie_id,genre) VALUES (?, ?)';

        for (let i = 1; i < rows.length; i++) {

            const values_for_TitleObject = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5], rows[i][6], rows[i][7], rows[i][9]];

            pool.getConnection((err, connection) => {
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                connection.query(insertQuery_TitleObject,values_for_TitleObject, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                        //console.error('Error executing query');
                    }
                });
                try{
                    const genres = rows[i][8].split(',');
                    for (let j = 0; j < genres.length; j++) {
                        const values_for_Genres = [rows[i][0], genres[j]];
                        
                        connection.query(insertQuery_Genres, values_for_Genres, (error, results) => {
                            if (error) {
                                return res.status(500).json({ error: 'Error executing query' });
                                //console.error('Error executing query');
                            }
                        });
                    }
                } catch (error) {
                    
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                connection.release();
            });
        }
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.uploadTitleAkas = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        const insertQuery_Akas = 'INSERT INTO Akas_info (movie_id,akas_title,region,language,is_original_title) VALUES (?, ?, ?, ?, ?)';
        const insertQuery_types = 'INSERT INTO Types (akas_id,type) VALUES (?, ?)';
        const insertQuery_attributes = 'INSERT INTO Attributes (akas_id,attribute) VALUES (?, ?)';

        for (let i = 1; i < rows.length; i++) {
            const values_for_Akas_info = [rows[i][0], rows[i][2], rows[i][3], rows[i][4], rows[i][7]];
        
            pool.getConnection((err, connection) => {
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
        
                connection.query(insertQuery_Akas, values_for_Akas_info, (error, results) => {
                    //connection.release();
        
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                        
                    }
                    const akas_id = results.insertId;   
                    try {
                        const types = rows[i][4].split(',');
                        const attributes = rows[i][5].split(',');
        
                        for (let j = 0; j < types.length; j++) {
                            const values_for_Types = [akas_id, types[j]];
        
                            connection.query(insertQuery_types, values_for_Types, (error, results) => {
                                if (error) {
                                    return res.status(500).json({ error: 'Error executing query' });
                                }
                            });
                        }
        
                        for (let j = 0; j < attributes.length; j++) {
                            const values_for_attributes = [akas_id, attributes[j]];
        
                            connection.query(insertQuery_attributes, values_for_attributes, (error, results) => {
                                if (error) {
                                    return res.status(500).json({ error: 'Error executing query' });
                                }
                            });
                        }
                        connection.release();
                    } catch (error) {
                        
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                });
            });
        }
        
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

exports.uploadNameBasics = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        const insertQuery_Contributors = 'INSERT INTO Contributors (contributor_id,primary_name,birth_year,death_year,image_url) VALUES (?, ?, ?, ?, ?)';
        const insertQuery_Professions = 'INSERT INTO Primary_profession (contributor_id,profession) VALUES (?, ?)';
        const insertQuery_KnownForTitles = 'INSERT INTO Known_for (contributor_id,movie_id) VALUES (?, ?)';

        for (let i = 1; i < rows.length; i++) {
            const values_for_Contributors = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][6]];

            pool.getConnection((err, connection) => {
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                connection.query(insertQuery_Contributors,values_for_Contributors, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                    }
                
                    try{
                        const pri_prof = rows[i][4].split(',');
                        const known_for = rows[i][5].split(',');
                        for (let j = 0; j < pri_prof.length; j++) {
                            const values_for_pri_prof = [rows[i][0], pri_prof[j]];
                            
                            connection.query(insertQuery_Professions, values_for_pri_prof, (error, results) => {
                                if (error) {
                                    return res.status(500).json({ error: 'Internal Server Error' });
                                }
                            });
                        }
                        for (let j = 0; j < known_for.length; j++) {
                            const values_for_known_for = [rows[i][0], known_for[j]];
                            
                            connection.query(insertQuery_KnownForTitles, values_for_known_for, (error, results) => {
                                if (error) {
                                    return res.status(500).json({ error: 'Internal Server Error' });
                                }
                            });
                        }
                    } catch (error) {
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                });
                connection.release();
            });
        }
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

exports.uploadTitlePrincipals = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        ////
        const insertQuery_Works = 'INSERT INTO Works (movie_id,contributor_id,category,job,characters,image_url) VALUES (?, ?, ?, ?, ?, ?)';
        ////

        for (let i = 1; i < rows.length; i++) {
            ////
            const values_for_Works = [rows[i][0], rows[i][2], rows[i][3], rows[i][4], rows[i][5], rows[i][6]];
            ////

            pool.getConnection((err, connection) => {
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                connection.query(insertQuery_Works,values_for_Works, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                    }
                
                });
                connection.release();
            });
        }
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};
exports.uploadTitleEpisode = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        ////
        const insertQuery_Episodes = 'INSERT INTO Episode_info (movie_id,parent_id,season_num,episode_num) VALUES (?, ?, ?, ?)';
        ////

        for (let i = 1; i < rows.length; i++) {
            ////
            const values_for_episodes = [rows[i][0],rows[i][1],rows[i][2],rows[i][3]];
            ////

            pool.getConnection((err, connection) => {
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                connection.query(insertQuery_Episodes,values_for_episodes, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                    }
                
                });
                connection.release();
            });
        }
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

exports.uploadTitleRatings = (req, res) => {
    try {
        const tsvFilePath = req.file.path;
        const data = fs.readFileSync(tsvFilePath, 'utf8');
        const rows = data.split('\n').map(row => row.split('\t'));

        // Define your database query
        ////
        const insertQuery_Ratings = 'INSERT INTO Ratings (movie_id,average_rating,num_votes) VALUES (?, ?, ?)';
        ////

        for (let i = 1; i < rows.length; i++) {
            ////
            const values_for_ratings = [rows[i][0], rows[i][1], rows[i][2]];
            ////

            pool.getConnection((err, connection) => {
            
                if (err) {
                    //console.error('Error getting connection:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                connection.query(insertQuery_Ratings,values_for_ratings, (error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Error executing query' });
                    }
                
                });
                connection.release();
            });
        }
        fs.unlinkSync(tsvFilePath);

        // Send a response
        res.status(201).json({ message: 'File uploaded and processed successfully.' });
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};


exports.resetAll = (req, res) => {
    try {
        const reset_query = [
            'SET FOREIGN_KEY_CHECKS=0',
            'TRUNCATE TABLE Akas_info',
            'TRUNCATE TABLE Attributes',
            'TRUNCATE TABLE Contributors',
            'TRUNCATE TABLE Episode_info',
            'TRUNCATE TABLE Favorites_list',
            'TRUNCATE TABLE Genres',
            'TRUNCATE TABLE Known_for',
            'TRUNCATE TABLE Primary_profession',
            'TRUNCATE TABLE Ratings',
            'TRUNCATE TABLE TitleObject',
            'TRUNCATE TABLE Types',
            'TRUNCATE TABLE Watchlist',
            'TRUNCATE TABLE Works',
            'SET FOREIGN_KEY_CHECKS=1'
        ];
        
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection:', err);
                return res.status(500).json({ "status": "failed", "reason": err });
            }
        
            // Execute each statement sequentially
            reset_query.forEach((query, index) => {
                connection.query(query, (error, results) => {
                    if (error) {
                        connection.release();
                        console.error(`Error executing query ${index + 1}`, error);
                        return res.status(500).json({ "status": "failed", "reason": error });
                    }
        
                    if (index === reset_query.length - 1) {
                        // If it's the last query, release the connection and send the response
                        connection.release();
                        res.status(201).json({ "status": "OK" });
                    }
                });
            });
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({"status":"failed", "reason":error});
    }
};

exports.readUser = (req, res, next) => {//needs fixing
    const username = req.params.username;
    const query = 'SELECT * FROM Users\
                INNER JOIN Authentication ON Users.user_id = Authentication.user_id\
                WHERE Authentication.username = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 'failed', message: 'Error establishing database connection' });
        }
        connection.query(query, [username], (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                return res.status(500).json({ status: 'failed', message: 'Error executing connection query' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            else{
                //console.log(result[0]);
                userObject = {
                    user_id: result[0].user_id,
                    username: result[0].username,
                    email: result[0].email,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name,
                    birthdate: result[0].birthdate,
                    role: result[0].role,
                };
                //console.log(userObject);
                res.status(200).json(userObject);
            }
        });
    });
};


// Inserts user with null characteristics. We need these characteristics for the second usecase!
exports.usermod = (req, res, next) => {
    const username = req.params.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('SELECT user_id FROM Authentication WHERE username = ?', [username], async (error, results) => {
            if (error) {
                connection.release();
                console.error('Error executing query:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (results.length !== 0) {
                // Username exists -> Change password
                const userId = results[0].user_id;
                let new_password_hashed = await bcrypt.hashSync(password, 8);
                connection.query('UPDATE Authentication SET password = ? WHERE user_id = ?', [new_password_hashed, userId], (error, results) => {
                    connection.release();
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Password updated successfully' });
                });
            }
            const userId = results[0].user_id;
            // Username does not exist -> Create new user
            // Insert into Authentication table
            // Insert into Users table
            let hashedPassword = await bcrypt.hash(password, 8);
            [firstname, lastname, birthDate, email] = [null, null, null, null];
            connection.query('INSERT INTO Users (first_name, last_name, birthdate, email) VALUES (?, ?, ?, ?)', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'Internal Server Error 4' });
                } else { //need to change password to hashedpassword, havent completed yet hashing logic
                    const userId = insertUserResults.insertId; // Get the auto-generated user_id
                    console.log("User ID:", userId);
                    connection.query('INSERT INTO Authentication (user_id, username, password) VALUES (?,?,?)', [userId, username, hashedPassword], (error, insertAuthResults) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ message: 'Registration failed' });
                        } else {
                            console.log(insertAuthResults);
                            return res.status(200).json({ message: 'Registration Completed. Please login'});
                        }
                    })                          
                }
            });
        });
    });
};

exports.adminmod = (req, res, next) => {
    const username = req.params.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        connection.query('SELECT user_id FROM Authentication WHERE username = ?', [username], async (error, results) => {
            if (error) {
                connection.release();
                console.error('Error executing query:', error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (results.length !== 0) {
                // Username exists -> Change password
                const userId = results[0].user_id;
                let new_password_hashed = await bcrypt.hashSync(password, 8);
                connection.query('UPDATE Authentication SET password = ? WHERE user_id = ?', [new_password_hashed, userId], (error, results) => {
                    connection.release();
                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).json({ message: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Password updated successfully' });
                });
            }
            const userId = results[0].user_id;
            // Username does not exist -> Create new user
            // Insert into Authentication table
            // Insert into Users table
            let hashedPassword = await bcrypt.hash(password, 8);
            [firstname, lastname, birthDate, email] = [null, null, null, null];
            connection.query('INSERT INTO Users (first_name, last_name, birthdate, email,role) VALUES (?, ?, ?, ?,"admin")', [firstname, lastname, birthDate, email], (error, insertUserResults) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: 'Internal Server Error 4' });
                } else { //need to change password to hashedpassword, havent completed yet hashing logic
                    const userId = insertUserResults.insertId; // Get the auto-generated user_id
                    console.log("User ID:", userId);
                    connection.query('INSERT INTO Authentication (user_id, username, password) VALUES (?,?,?)', [userId, username, hashedPassword], (error, insertAuthResults) => {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ message: 'Registration failed' });
                        }
                        console.log(insertAuthResults);
                        return res.status(200).json({ message: 'Registration Completed. Please login'});
                    });
                }
            });
        });
    });
};