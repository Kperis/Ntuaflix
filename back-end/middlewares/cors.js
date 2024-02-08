const corsMiddleware = (req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-OBSERVATORY-AUTH'); // Which headers are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Which methods are allowed
    next();
}
module.exports = corsMiddleware;