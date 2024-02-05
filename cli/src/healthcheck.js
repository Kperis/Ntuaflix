const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs').promises;  // Use fs.promises for promise-based file operations
const constructURL = require('../lib/construct_url');
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const https = require('https');

exports.healthcheck = async () => {
    try{
        const token = await fs.readFile('../cli/softeng23_33.token', 'utf8');

        const url = "http://localhost:9876/ntuaflix_api/admin/healthcheck";
        console.log(url);
        const config = {
            method: 'get',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), 
        };

        const response = await axios(config);
        console.log(response.data);
    } catch (error) {
        console.log("an error occured");
        errorHandler(error);
    }
};
