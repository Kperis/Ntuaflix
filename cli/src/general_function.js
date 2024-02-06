const route_request = require('../lib/send_request');
const url_constructor = require('../lib/construct_url');
const error_handler = require('../lib/error_handler');
const type_getter = require('../lib/type_getter');
const loginfunction = require('./login');
const resetallfunction = require('./resetall');
const searchtitlepart_fun = require('./searchtitlepart');
const bygenre_fun = require('./bygenre');
const searchname_fun = require('./searchname');

const e = require('express');

module.exports = function(name,o) {
    //var url = constructURL('/title/', o.titleID);
    //console.log("running...");
    if(!error_handler.errorhandler(name,o)){
        //console.log("url construction...");
        var url = url_constructor.urlconstructor(name,o);
        var type = type_getter.typegetter(name);
        if(type !== 'false'){
            //console.log("sending request...");
            //console.log(type);
            if(type == 'get'){
                if(name == 'searchtitle'){
                    if(o.format === undefined){
                        o.format = 'json';
                    }
                    //console.log("searching title...");
                    searchtitlepart_fun.searchtitlepart(o,o.format,url);
                }else if (name == 'bygenre'){
                    if(o.format === undefined){
                        o.format = 'json';
                    }
                    //console.log("bygenre...");
                    bygenre_fun.bygenre(o,o.format,url);
                }else if(name == 'searchname'){
                    if(o.format === undefined){
                        o.format = 'json';
                    }
                    //console.log("searching name...");
                    searchname_fun.searchname(o,o.format,url);
                }
                else{
                    if(o.format === undefined){
                        o.format = 'json';
                    }
                    route_request.request_function('get',url,o.format);
                }

            }
            else if(type == 'post'){
                if(name == 'login'){
                    //console.log("im heerererre");
                    loginfunction.login(o,url);
                }else if(name == 'resetall'){
                    //console.log("resetting all...");
                    resetallfunction.resetall(url);
                }
            }
        }
    }
}