
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
var qs = require('qs');
const error_handler = require('../lib/error_handler');
const constructURL = require('../lib/construct_url');
const formating = require('../lib/format_data');

exports.bygenre = (o,format,url) => {
    //const { qgenre, minrating, yrFrom, yrTo } = req.body;

    fs.readFile('../cli/softeng23_33.token', 'utf8', (error, data) => {
        if (error) {
            console.log(chalk.red('Not authorized user!'))
            console.log(error);
        }
        else {
                //const url = constructURL.urlconstructor('bygenre');
                // console.log(url);
                // console.log(o);
                const config = {
                    method: 'get',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + data },
                    data : {'qgenre': o.genre, 'minrating': o.min, 'yrFrom': o.from, 'yrTo': o.to},
                };
                axios(config)
                    .then(res => {
                        //console.log(format);
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
