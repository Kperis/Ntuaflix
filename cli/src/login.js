const chalk = require('chalk');
const https = require('https')
const axios = require('axios');
const fs = require('fs');
var qs = require('qs');
const constructURL = require('../lib/construct_url');
const error_handler = require('../lib/error_handler');
const { error } = require('console');
const configuration = require('../lib/construct_config');

exports.login =  (o) =>{
    fs.access('../cli/softeng23_33.token', fs.F_OK, (error_not_exist) => {
                //var url = "http://localhost:9876/ntuaflix_api/auth/login";
                var data = qs.stringify({
                    'username': o.username,
                    'password': o.password
                });
                //console.log(data);
                var config = {};
                config = configuration.configconstructor('login',data,o);

                axios(config)
                    .then(res => {
                        fs.writeFile('../cli/softeng23_33.token', res.data.token, error_create_file => {
                            if (error_create_file) throw error_create_file;
                            console.log(chalk.green('User successfully logged in'));
                            //console.log(chalk.yellow('Token: ' + res.data.token) + '\n');
                        })
                    })
                    .catch(err => {
                        console.log(chalk.red("No user with this credentials found. Please try again."));
                        error_handler.generalerrors(err);
                    })
            }
    )
}
