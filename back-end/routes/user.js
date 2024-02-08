const express = require('express');

/* Import Controllers */
// Users - Profile
const createProfileController = require('../controllers/createProfile');
const userProfileController = require('../controllers/userProfile');
const updateProfileController = require('../controllers/updateUserProfile')
// Lists
const listsController = require('../controllers/lists');

/* Import Middlewares*/
const authMiddleware = require('../middlewares/auth');


/* Define the routes */
const router = express.Router();

// Time for authentication!! // Always check if the user is authenticated using the authMiddleware
router.use(authMiddleware); 

/*
// Second Use Case: User Profile / See your watchlist / Edit your watchlist 
*/
// User Profile
router.put('/createProfile', createProfileController.createProfile);
router.get('/profile', userProfileController.getUserInfo);
router.put('/updateProfile', updateProfileController.updateProfile);
// User Lists 
router.post('/addToFavorites/:titleID', listsController.postAddToFavorites); 
router.post('/addToWatchlist/:titleID', listsController.postAddToWatchlist);
router.get('/watchlist', listsController.getWatchlist); 
router.get('/favorites', listsController.getFavorites); 
router.delete('/deleteFromFavorites/:titleID', listsController.deleteFromFavorites); 
router.delete('/deleteFromWatchlist/:titleID', listsController.deleteFromWatchlist); 

module.exports = router;