const json2csv = require('json2csv').parse;


exports.formatData = (data,format) =>{
    // console.log("formatting data");
    if (format === 'csv') {
        
        return convertToCSV(data);
    }else if (format === 'json'){
        // console.log("json it is ..");
        const visited = new Set();

        return JSON.stringify(data, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (visited.has(value)) {
                    return '[Circular]';
                }
                visited.add(value);
            }
            return value;
        }, 2); // 2 is for indentation level, you can adjust as needed
    }
}

function convertToCSV(data) {
    // Assuming data is an array of objects
    const csvData = json2csv(data, { header: true });
    return csvData;
}

