const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs').promises;  // Use fs.promises for promise-based file operations
const constructURL = require('../lib/construct_url');
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const https = require('https');

exports.uploadtsvs = async (path,filetype) => {
    try {
        if (!path.filename || path.filename === '') {
            throw new Error('File path is not provided.');
        }

        //console.log(path.filename);
        const fileData = await fs.readFile(path.filename);

        const formData = new FormData();
        formData.append('file', fileData, { filename: 'filename' });  // Adjust the filename if needed

        const token = await fs.readFile('../cli/softeng23_33.token', 'utf8');

        const url = "http://localhost:9876/ntuaflix_api/admin/upload/" + filetype;
        console.log(url);
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + token,
                ...formData.getHeaders(),
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            data: formData,  // Send formData as the request data
        };

        const response = await axios(config);
        console.log(response.data);
    } catch (error) {
        console.log("an error occured");
        errorHandler(error, 'File could not be uploaded!');
    }
};
