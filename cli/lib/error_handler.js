const fs = require('fs');
const chalk = require('chalk');

exports.generalerrors =  (err, customMessage) => {

    let serverStatus = err.message.split(' ').slice(0,2).join(' ');
    if (serverStatus == 'connect ECONNREFUSED') {
        console.log(chalk.red("Sorry the server is facing some problems right now.\nPlease try again later!"));
        return;
    }

    let errMessage = err.response;

    if (errMessage == 'Invalid Token.') {

        fs.unlink('../cli/softeng23_33.token', (err) => {
            if (err) throw err;
            console.log(chalk.green('User need to relog!'));
        })

    }
    (customMessage === undefined) ? console.log(chalk.red(errMessage)) : console.log(chalk.red(errMessage + '\n' + customMessage))

}

exports.errorhandler = (name, parameters) => {
    if (name == 'resetall') {
        //console.log("what is happening");
        if (parameters.length > 0 || !validateParameters(parameters, []) ){
            console.log("error heerer maybe");
            console.log(chalk.red('Error: resetall does not require any parameters!'));
            return true;
        }
    }else if (name == 'login') {
        if (!validateParameters(parameters, ['username', 'password'])){
            console.log(chalk.red('Error: login requires the following parameters: \n --username [username] \n --password [password]'));
            return true;
        }
    }else if(name == 'title'){
        if (!validateParameters(parameters, ['titleID'])){
            console.log(chalk.red('Error: title requires the following parameters: \n --titleID [titleID]'));
            return true;
        }
    } else if (name == 'searchtitle'){
        if (!validateParameters(parameters, ['titlepart'])){
            console.log(chalk.red('Error: titlepart requires the following parameters: \n --titlepart [titlepart]'));
            return true;
        }
    } else if (name == 'user'){
        if (!validateParameters(parameters, ['username'])){
            console.log(chalk.red('Error: user requires the following parameters: \n --username [username]'));
            return true;
        }
    } 
    else if(name == 'name'){
        if (!validateParameters(parameters, ['nameid'])){
            console.log(chalk.red('Error: name requires the following parameters: \n --nameid [nameid]'));
            return true;
        }
    }else if(name == 'bygenre'){
        if (!validateParameters(parameters, ['genre', 'min', 'from', 'to'])){
            console.log(chalk.red('Error: bygenre requires the following parameters: \n --genre [genre]'));
            return true;
        }
    }else if(name == 'searchname'){
        if (!validateParameters(parameters, ['name'])){
            console.log(chalk.red('Error: searchname requires the following parameters: \n --name [namepart]'));
            return true;
        }
    }
    return false;
}
function validateParameters(options, expectedParams) {
    const providedParams = Object.keys(options).filter(key => options[key]);
    return (providedParams.length === expectedParams.length || (providedParams.length === expectedParams.length+1 && options.format !== undefined)) &&
           expectedParams.every(param => providedParams.includes(param));
  }