const json2csv = require('json2csv').parse;
const convert = require('json-2-csv');


exports.formatData = (data,format) =>{
    // console.log("formatting data");
    if (format === 'csv') {
        //return data;
        return convertToCSV(data);
    }else if (format === 'json'){
        // console.log("json it is ..");
        const visited = new Set();

        var jason = JSON.stringify(data, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (visited.has(value)) {
                    return '[Circular]';
                }
                visited.add(value);
            }
            return value;
        }, 2); // 2 is for indentation level, you can adjust as needed
        //return jason;
        return jason;
    }
}

function convertToCSV(data) {
    // Assuming data is an array of objects
    const csvData =convert.json2csv(data) //parse(data); //json2csv(data);
    return csvData;
}


