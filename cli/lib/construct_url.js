const error_handler = require('./error_handler.js');

exports.urlconstructor = (name,parameters) => {
    if (name == "title"){
        return "http://localhost:9876/ntuaflix_api/title/" + parameters.titleID;
    }else if(name == "resetall"){
        return "http://localhost:9876/ntuaflix_api/admin/resetall";
    }else if(name == "healthcheck"){
        return "http://localhost:9876/ntuaflix_api/admin/healthcheck";
    }else if(name == "user"){
        return "http://localhost:9876/ntuaflix_api/admin/users/" + parameters.username;
    }else if (name == 'login'){
        return "http://localhost:9876/ntuaflix_api/auth/login";
    }else if (name == 'name'){
        return "http://localhost:9876/ntuaflix_api/name/" + parameters.nameid;
    }else if (name == 'bygenre'){
        return "http://localhost:9876/ntuaflix_api/bygenre";
    }else if( name == 'searchtitle'){
        return "http://localhost:9876/ntuaflix_api/searchtitle";
    }else if( name == 'searchname'){
        return "http://localhost:9876/ntuaflix_api/searchname";
    }else if(name == 'newtitles'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titlebasics";
    }else if(name == 'newnames'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/namebasics";
    }else if (name == 'newakas'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titleakas";
    }else if (name == 'newcrew'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titlecrew";
    }else if(name == 'newepisode'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titleepisode";
    }else if(name == 'newprincipals'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titleprincipals";
    }else if(name == 'newratings'){
        return "http://localhost:9876/ntuaflix_api/admin/upload/titleratings";
    }else if(name == "adduser"){
        return "http://localhost:9876/ntuaflix_api/admin/usermod/"+parameters.username+"/"+parameters.password;
    }
}