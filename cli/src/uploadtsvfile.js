const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs').promises;  // Use fs.promises for promise-based file operations
const constructURL = require('../lib/construct_url');
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const https = require('https');
const configuration = require('../lib/construct_config');

exports.uploadtsvs = async (path,name,o) => {
    try {
        if (!path.filename || path.filename === '') {
            throw new Error('File path is not provided.');
        }

        //console.log(path.filename);
        const fileData = await fs.readFile(path.filename);
        const formData = new FormData();
        formData.append('file', fileData, { filename: 'filename' });  // Adjust the filename if needed

        const token = await fs.readFile('../cli/softeng23_33.token', 'utf8');

        var config = {};
        config = configuration.configconstructor(name,token,o,formData);
        const response = await axios(config);
        console.log("status : ",response.status ,"message : ",response.data.message);
    } catch (error) {
        console.log("an error occured");
        errorHandler.generalerrors(error, 'File could not be uploaded!');
    }
};
