const chalk = require('chalk');
const https = require('https')
const axios = require('axios');
const fs = require('fs');
var qs = require('qs');
const constructURL = require('../lib/construct_url');
const error_handler = require('../lib/error_handler');
const { error } = require('console');

exports.login =  (o,url) =>{
    fs.access('../cli/softeng23_33.token', fs.F_OK, (error_not_exist) => {
                //var url = "http://localhost:9876/ntuaflix_api/auth/login";
                var data = qs.stringify({
                    'username': o.username,
                    'password': o.password
                });
                //console.log(data);
                var config = {
                    method: 'post',
                    url: url,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: data,
                    //httpsAgent: new https.Agent({ rejectUnauthorized: false })
                };

                axios(config)
                    .then(res => {
                        fs.writeFile('../cli/softeng23_33.token', res.data.token, error_create_file => {
                            if (error_create_file) throw error_create_file;
                            console.log(chalk.green('User successfully logged in'));
                            //console.log(chalk.yellow('Token: ' + res.data.token) + '\n');
                        })
                    })
                    .catch(err => {
                        error_handler(err);
                    })
            }
    )
}
