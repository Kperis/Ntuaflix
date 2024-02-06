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
    }
}