const constructURL = require('../lib/construct_url');
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
const https = require('https');

module.exports = function(o) {
    
    isWrong = false;

    if (o.username == undefined || o.username == '') {
        isWrong = true;
    }

    if (!isWrong) {

        //var url = constructURL('/admin/', o.username);
        var url = "http://localhost:9876/ntuaflix_api/admin/users/" + o.username;
        fs.readFile('../cli/softeng23_33.token', 'utf8', (error, data) => {
            if (error) {
                console.log(chalk.red('Not authorized user!'))
            }
            else {
                var config = {
                    method: 'get',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + data },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                };
                axios(config)
                .then(res => {                    
                    console.log(res.data);
                })
                .catch(err => {
                    errorHandler(err);
                })
            }
        })
    }
    else{
        console.log(chalk.red('Error: mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --username [username] \n'));
    }
}