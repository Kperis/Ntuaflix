
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
var qs = require('qs');
const error_handler = require('../lib/error_handler');
const constructURL = require('../lib/construct_url');
const formating = require('../lib/format_data');

exports.searchname = (o,format,url) => {
    
    fs.readFile('../cli/softeng23_33.token', 'utf8', (error, data) => {
        if (error) {
            console.log(chalk.red('Not authorized user!'))
            console.log(error);
        }
        else {
                //const url = constructURL.urlconstructor('searchname');
                const config = {
                    method: 'get',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + data },
                    data : { 'namePart': o.name },
                };
                axios(config)
                    .then(res => {
                        const formattedData = formating.formatData(res.data,format);
                        console.log(formattedData);
                        //console.log(res.data);
                        })
                    .catch(err => {
                        console.log("what an error");
                        error_handler.generalerrors(err);
                    })
            }
        });
};
