// Define your middleware function
const isAdmin = (req, res, next) => {
    // Check if the user is an admin

    // get role from the req.user
    const role = req.user.role;

    // Check if the user is an admin
    const is_admin = role === 'admin';
    
    // If the user is an admin, proceed to the next middleware
    if (is_admin) {
        res.status(200).json({ message: 'admin authorized' });
        console.log('Authorized as Admin');
        next();
    } else {
        // If the user is not an admin, return an error response
        res.status(401).json({ message: 'Not Authorized. Not Admin' });
    }
};

module.exports = isAdmin;