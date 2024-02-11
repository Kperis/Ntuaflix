const express = require('express');
const {pool} = require('../utils/database');
const { getNameObject } = require('../middlewares/getNameObject');
const json2csv = require('json2csv').parse;

exports.getName = async (req, res, next) => {
    // Check for Bad Request -> 400 status code
    if (Object.keys(req.params).length > 1) {
        return res.status(400).send('Bad Request');
    }

    if (req.params.nameID === '') {
        return res.status(400).send('Bad Request');
    }
    //console.log(req.params);
    let nameID = req.params.nameID;

    if (nameID.startsWith(':')) {
        nameID = nameID.substring(1);
    }

    getNameObject(nameID)
    .then((nameObject) => {
        //console.log(nameObject);
        if(req.query.format === 'csv') {
            const csv = json2csv(nameObject);
            res.set('Content-Type', 'text/csv; charset=utf-8');
            res.status(200).send(csv);
            return;
        }
        res.status(200).json(nameObject);
    })
    .catch((error) => {
        //console.error(error);
        res.status(error.status).json({ message: error.message });
    });
    //console.log(nameID);
};