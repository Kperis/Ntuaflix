

exports.typegetter = (name) => {
    if(name == 'title' || name == 'searchtitle' || name == 'user'
     || name == 'healthcheck' || name == 'name' || name == 'searchname'
     || name == 'bygenre' || name == 'profile' || name == "watchlater"
     || name == "favorites"){
        return 'get';
     }
     else if (name == 'resetall' || name == 'login' || name.substring(0,3) == 'new' || name == "adduser" ||
     name == "logout" || name == "addtofavorites" || name == "addtowatchlater"){
         return 'post';
     }else if(name == "createprofile" || name == "updateprofile"){
         return 'put';
     }else if (name == "deletefromfavorites" || name == "deletefromwatchlater"){
         return 'delete';
     }
     else {
        console.log("Error: Invalid type of command!");
        return 'false'
     }
}