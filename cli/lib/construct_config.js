const type = require('./type_getter.js');
const url = require('./construct_url.js');


exports.configconstructor = (name,token,o,formdata) => {
    let upload = false;
    let data_exists = false;
    var data_post = {};
    if (name == "bygenre"){
        data_post = {
            'qgenre': o.genre,
            'minrating': o.min,
            'yrFrom': o.from, 
            'yrTo': o.to
        };
        data_exists = true;
    }else if (name == "searchname"){
        data_post = { 
            'namePart': o.name 
        };
        data_exists = true;
    }else if (name == "searchtitle"){
        data_post = {
            'titlePart': o.titlepart 
        };
        data_exists = true;
    }else if (name == "login"){
        data_post = {
            'username': o.username,
            'password': o.password
        };
        data_exists = true;
    }else if (name.substring(0, 3) === "new"){
        upload = true;
    }
    //console.log(name)
    if (upload){
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name),
            headers: {
                'Authorization': 'Bearer ' + token,
                ...(formdata ? formdata.getHeaders() : {}) // Handle null case for formdata//...formdata.getHeaders(),
            },
            data : formdata
        }
        //console.log("upload configuration ...");
        //console.log(config);
        return config;
    }else if(data_exists){
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name),
            headers : { 'Authorization': 'Bearer ' + token },
            data : data_post
        }
        //console.log(config);
        return config;
    }else{
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name,o),
            headers : { 'Authorization': 'Bearer ' + token }
        }
        //console.log(config);
        return config;
    }
    
}