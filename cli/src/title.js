const constructURL = require('../lib/construct_url');
const errorHandler = require('../lib/error_handler');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
const https = require('https');

module.exports = function(o) {
    
    isWrong = false;

    if (o.titleID == undefined || o.titleID == '') {
        isWrong = true;
    }

    if (!isWrong) {

        var url = constructURL('/title/', o.titleID);
        // var url = "http://localhost:9876/ntuaflix_api/title/tt0068494";
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
                    errorHandler(err, 'User could not be created or modified!');
                })
            }
        })
    }
    else{
        console.log(chalk.red('Error: mandatory parameters omitted\n'));
        console.log(chalk.yellow('Mandatory Parameters: \n --usermod \n --username [username] \n --password [password]'));
        console.log(chalk.yellow('Optional Parameter: \n --isStationAdm [true/false] \n'));
        console.log(chalk.yellow('ex: ev_group03 Admin --usermod --username [username] --password [password] (--isStationAdm [true/false])\n'));
    }
}