const type = require('./type_getter.js');
const url = require('./construct_url.js');
const https = require('https');


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
    }else if (name == "createprofile"){
        data_post = {
            "firstname": o.firstname,
            "lastname": o.lastname,
            "birthDate": o.birthDate,
            "email": o.email
        }
        data_exists = true;
    }else if(name == "updateprofile"){
        data_post = {
            "username" : o.username,
            "password" : o.password
        }
        data_exists = true;
    }
    else if (name.substring(0, 3) === "new"){
        upload = true;
    }
    //console.log(name)
    if (upload){
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name),
            headers: {
                'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token,
                ...(formdata ? formdata.getHeaders() : {}) // Handle null case for formdata//...formdata.getHeaders(),
            },
            data : formdata,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
        //console.log("upload configuration ...");
        //console.log(config);
        return config;
    }else if(data_exists){
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name),
            headers : { 
                'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token 
            },
            data : data_post,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
        //console.log(config);
        return config;
    }else{
        var config = {
            method : type.typegetter(name),
            url : url.urlconstructor(name,o),
            headers : { 
                'X-OBSERVATORY-AUTH': token,//'Authorization': 'Bearer ' + token 
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }
        //console.log(config);
        return config;
    }
    
}