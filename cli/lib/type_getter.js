

exports.typegetter = (name) => {
    if(name == 'title' || name == 'searchtitle' || name == 'user'
     || name == 'healthcheck' || name == 'name' || name == 'searchname'
     || name == 'bygenre'){
        return 'get';
     }
     else if (name == 'resetall' || name == 'login' || name.substring(0,3) == 'new' || name == "adduser"){
         return 'post';
     }
     else {
        console.log("Error: Invalid type of command!");
        return 'false'
     }
}