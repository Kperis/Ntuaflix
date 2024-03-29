const express = require('express');
const {pool} = require('../utils/database');
const {getTitleObject} = require('../middlewares/getTitleObject');


exports.getSearchTitle = (req, res, next) => {
    const titlePart = req.body.titlePart;
    console.log(titlePart);
    SQLQuery = `
        SELECT
            TitleObject.movie_id AS titleID
        FROM
            TitleObject
        WHERE
            TitleObject.original_title LIKE ?;`; // Maybe use %? or ?% or %?% instead of ? 
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            res.sendStatus(500);
            return;
        }
        connection.query(SQLQuery,[`%${titlePart}%`], (err, results) => {
            //connection.release();
            if (err) {
                console.error('Error executing query:', err);
                res.sendStatus(500);
                return;
            }

            const titleIDs = results.map(result => result.titleID);
            const titleObjects = [];

            if (titleIDs.length === 0) {
                res.status(404).send(); 
                return;
            }

            const getTitleObjects = async () => {
                for (const titleID of titleIDs) {
                    try {
                        const response = await getTitleObject(titleID);
                        titleObjects.push(response);
                    } catch (error) {
                        console.error('Error getting title object:', error);
                        res.sendStatus(500).json({message: 'Internal Server Error'});
                        return;
                    }
                }
                if (req.query.format === 'csv') {
                    try {
                        const csv = json2csv(titleObjects);
                        res.set('Content-Type', 'text/csv; charset=utf-8');
                        res.status(200).send(csv);
                        return;
                    } catch (error) {
                        console.error('Error converting to CSV:', error);
                        res.sendStatus(500).json({message: 'Internal Server Error'});
                        return;
                    }
                }
                res.status(200).json(titleObjects);
                // Καθώς θέλω να επιστρέψω μια λίστα και όχι ενα json που περιέχει μια λιστα!!
                // 200 και οχι 201 (παρ'οτι post) γιατι δεν δημιουργουμε-ανανεωνουμε καποιο resource
            };

            getTitleObjects();
            connection.release();
        });
    })
};