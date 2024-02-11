
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
const formating = require('../lib/format_data');
const configuration = require('../lib/construct_config');

exports.request_function =  (name,o,format) => {
    fs.readFile('../cli/softeng23_33.token', 'utf8', (error, data) => {
        if (error) {
            console.log(chalk.red('Not authorized user!'))
            console.log(error);
        }
        else {
            //console.log(url_string);
            var config = {
                // method: method,
                // url: url_string,
                // headers: { 'Authorization': 'Bearer ' + data },
                // //httpsAgent: new https.Agent({ rejectUnauthorized: false })
            };
            config = configuration.configconstructor(name,data,o);

            //console.log(config);
            axios(config)
            .then(res => {  
                //console.log(format);                  
                const formattedData = formating.formatData(res.data,format);
                console.log(formattedData);
                //console.log(res.data);
            })
            .catch(err => {
                errorHandler.generalerrors(err, 'User could not be created or modified!');
            })
        }
    })
}