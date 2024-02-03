

module.exports = function (scope, param1, param2, param3, format, apikey) {
    let base = 'http://localhost:9876/ntuaflix_api';
    // create url with scope
    base = base + scope;

    // create url for SessionsPerPoint, SessionsPerStation, SessionsPerEV, SessionsPerProvider
    // if (scope === '/SessionsPerPoint/' || scope === '/SessionsPerStation/' || scope === '/SessionsPerEV/' || scope === '/SessionsPerProvider/') {
    //     base = base + param1 + '/' + param2 + '/' + param3 + '?format=' + format;
    // }
    console.log("base + scope: ", base + scope);
    console.log("param1: ", param1);


    if (scope === '/admin/') {
        // if (param1 === 'sessionsupd') base = base + 'system/' + param1;
        // else if (param1 === 'usermod') base = base + param1 + '/' + param2 + '/' + param3 + '?isAdministrator=' + format;
        // else if (param1 === 'users') base = base + param1 + '/' + param2 + '?isAdministrator=' + param3;
        // else base = base + param1;
        base = base + param1;
    }else{
        base = base + param1;
    }
    return base;
}