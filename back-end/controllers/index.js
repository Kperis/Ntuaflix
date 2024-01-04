exports.getIndex = (req, res, next) => {
    res.status(200).json({ message: 'Hello! Welcome to NTUAflix' });
    //res.render("index"); load html page
}

/*
exports.postIndex = (req, res, next) => {
    url redirect στο επόμενο βασικό page?
}
*/ 
