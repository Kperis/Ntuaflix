const route_request = require('../lib/send_request');
const url_constructor = require('../lib/construct_url');
const error_handler = require('../lib/error_handler');
const type_getter = require('../lib/type_getter');
const loginfunction = require('./login');
const resetallfunction = require('./resetall');

const e = require('express');

module.exports = function(name,o) {
    //var url = constructURL('/title/', o.titleID);
    console.log("running...");
    if(!error_handler.errorhandler(name,o)){
        console.log("url construction...");
        var url = url_constructor.urlconstructor(name,o);
        var type = type_getter.typegetter(name);
        if(type !== 'false'){
            console.log("sending request...");
            console.log(type);
            if(type == 'get'){
                route_request.request_function('get',url, name);
            }
            else if(type == 'post'){
                if(name == 'login'){
                    console.log("im heerererre");
                    loginfunction.login(o);
                }else if(name == 'resetall'){
                    console.log("resetting all...");
                    resetallfunction.resetall();
                }
            }
        }
    }
}