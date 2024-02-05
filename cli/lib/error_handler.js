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
        console.log("what is happening");
        if (parameters.length > 0){
            console.log("error heerer maybe");
            console.log(chalk.red('Error: resetall does not require any parameters!'));
            return true;
        }
    }else if (name == 'login') {
        if (parameters.username === undefined || parameters.password === undefined
            || parameters.length > 2){
            console.log(chalk.red('Error: login requires the following parameters: \n --username [username] \n --password [password]'));
            return true;
        }
    }else if(name == 'title'){
        if (parameters.titleID === undefined || parameters.length > 1){
            console.log(chalk.red('Error: title requires the following parameters: \n --titleID [titleID]'));
            return true;
        }
    } else if (name == 'searchtitle'){
        if (parameters.titlepart === undefined || parameters.length > 1){
            console.log(chalk.red('Error: titlepart requires the following parameters: \n --titlepart [titlepart]'));
            return true;
        }
    } else if (name == 'user'){
        if (parameters.username === undefined || parameters.length > 1){
            console.log(chalk.red('Error: user requires the following parameters: \n --username [username]'));
            return true;
        }
    } 
    else if(name == 'name'){
        if (parameters.nameid === undefined || parameters.length > 1){
            console.log(chalk.red('Error: name requires the following parameters: \n --nameid [nameid]'));
            return true;
        }
    }
    return false;
}