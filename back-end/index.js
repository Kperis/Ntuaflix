require('dotenv').config(); // using the dotenv package in a Node.js environment
const https = require('https');
const fs = require('fs');
const app = require('./app');

const options = {
    key: fs.readFileSync('../cert/key.pem'),
    cert: fs.readFileSync('../cert/certificate.pem')
};

const server = https.createServer(options, app);
const PORT = process.env.PORT || 9876;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}!`);
});