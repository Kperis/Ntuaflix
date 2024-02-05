// Define your middleware function
const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    // The problem is here to check how to get the user role!
    // Until now the role is stored only in the database. In order to reach that info i have to get the json web token and decode it to get the user role.
    // Either that, or we can somehow store the admins in the API 

    // get role from the req.user
    const role = req.user.role;
    //console.log(req.user);
    //console.log(role);
    // Check if the user is an admin
    const is_admin = role === 'admin';
    // If the user is an admin, proceed to the next middleware
    if (is_admin) {
        console.log('Authorized as Admin');
        next();
    } else {
        // If the user is not an admin, return an error response
        res.status(401).json({ message: 'Not Authorized. Not Admin' });
    }
};

module.exports = isAdmin;