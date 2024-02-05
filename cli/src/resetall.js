
const chalk = require('chalk');

const https = require('https')
const axios = require('axios');
const fs = require('fs');
const error_handler = require('../lib/error_handler');

exports.resetall = async () => {
    // try{
    //     const token = await fs.readFile('../cli/softeng23_33.token', 'utf8');

    //     const url = "http://localhost:9876/ntuaflix_api/admin/resetall";
    //     console.log(url);
    //     const config = {
    //         method: 'post',
    //         url: url,
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //         },
    //         httpsAgent: new https.Agent({ rejectUnauthorized: false }), 
    //     };

    //     const response = await axios(config);
    //     console.log(response.data);
    // } catch (error) {
    //     console.log("an error occured");
    //     errorHandler.generalerrors(error);
    // }
    
    fs.readFile('../cli/softeng23_33.token', 'utf8', (error, data) => {
        if (error) {
            console.log(chalk.red('Not authorized user!'))
            console.log(error);
        }
        else {
                //var url = constructURL('/auth/', 'login');
                const url = "http://localhost:9876/ntuaflix_api/admin/resetall";
                console.log(url);
                const config = {
                    method: 'post',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + data },
                    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), 
                };
                console.log(data);
                console.log(config);
                axios(config)
                    .then(res => {
                        console.log(res.data);
                        })
                    .catch(err => {
                        console.log("what an error");
                        error_handler.generalerrors(err);
                    })
            }
        });
};
