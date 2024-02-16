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
    //(customMessage === undefined) ? console.log(chalk.red(errMessage)) : console.log(chalk.red(errMessage + '\n' + customMessage))

}

exports.errorhandler = (status,name) =>{
    if(status === 404){
        if(name == "title"){
            return 'No title found';
        }else if(name == "user"){
            return 'User not found';
        }else if (name == 'bygenre'){
            return 'No data';
        }else if( name == "name"){
            return 'Name not found';
        }else if(name == "bygenre"){
            return  'No data';
        }else if(name == "searchname"){
            return 'No data';
        }else if (name == "logout"){
            return 'User not logged in';
        }
    }else if(status === 401){
        return chalk.red('Not Authorized , please login');
    }
    return;
}
