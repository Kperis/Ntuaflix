const error_handler = require('./error_handler.js');

exports.urlconstructor = (name,parameters) => {
    const baseurl = "https://localhost:9876/ntuaflix_api/";
    if (name == "title"){
        return baseurl+"title/" + parameters.titleID;
    }else if(name == "resetall"){
        return baseurl +"admin/resetall";
    }else if(name == "healthcheck"){
        return baseurl +"admin/healthcheck";
    }else if(name == "user"){
        return baseurl+"admin/users/" + parameters.username;
    }else if (name == 'login'){
        return baseurl+"auth/login";
    }else if (name == 'name'){
        return baseurl+"name/" + parameters.nameid;
    }else if (name == 'bygenre'){
        return baseurl+"bygenre";
    }else if( name == 'searchtitle'){
        return baseurl+"searchtitle";
    }else if( name == 'searchname'){
        return baseurl+"searchname";
    }else if(name == 'newtitles'){
        return baseurl+"admin/upload/titlebasics";
    }else if(name == 'newnames'){
        return baseurl+"admin/upload/namebasics";
    }else if (name == 'newakas'){
        return baseurl+"admin/upload/titleakas";
    }else if (name == 'newcrew'){
        return baseurl+"admin/upload/titlecrew";
    }else if(name == 'newepisode'){
        return baseurl+"admin/upload/titleepisode";
    }else if(name == 'newprincipals'){
        return baseurl+"admin/upload/titleprincipals";
    }else if(name == 'newratings'){
        return baseurl+"admin/upload/titleratings";
    }else if(name == "adduser"){
        return baseurl+"admin/usermod/"+parameters.username+"/"+parameters.password;
    }else if (name == "logout"){
        return baseurl+"auth/logout";
    }else if ( name == "createprofile"){
        return baseurl+"user/createProfile";
    }else if (name == "profile"){
        return baseurl+"user/profile";
    }else if (name == "addtofavorites"){
        return baseurl+"user/addToFavorites/"+parameters.titleID;
    }else if (name == "addtowatchlater"){
        return baseurl+"user/addToWatchlist/"+parameters.titleID;
    }else if (name == "watchlater"){
        return baseurl+ "user/watchlist";
    }else if (name == "favorites"){
        return baseurl+ "user/favorites";
    }else if (name == "deletefromfavorites"){
        return baseurl+ "user/deleteFromFavorites/"+parameters.titleID;
    }else if (name == "deletefromwatchlater"){
        return baseurl+ "user/deleteFromWatchlist/"+parameters.titleID;
    }
    else if (name == "updateprofile"){
        return baseurl+ "user/updateProfile";
    }
}