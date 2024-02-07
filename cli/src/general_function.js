const route_request = require('../lib/send_request');
const error_handler = require('../lib/error_handler');
const login_fun = require('./login');


module.exports = function(name,o) {
    // if(!error_handler.errorhandler(name,o)){
    if(o.format === undefined){
        o.format = 'json';
    }
    if(name == "login"){
        login_fun.login(o);
        return;
    }
    else{
        route_request.request_function(name,o,o.format);
    }
    // }
}
