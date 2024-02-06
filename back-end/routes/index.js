const express = require('express');
/* Import Controllers */
// General Controllers
const indexController = require('../controllers/index');
const authController = require('../controllers/auth');
// TitleObjects
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle');
const bygenreController = require('../controllers/bygenre');
const titleInfoController = require('../controllers/titleInfo');
// Contributors / NameObjects
const nameController = require('../controllers/name');
const searchnameController = require('../controllers/searchname');
// Users - Profile
const userProfileController = require('../controllers/userProfile');
const updateProfileController = require('../controllers/updateUserProfile')
// Lists
const listsController = require('../controllers/lists');


/* Import Middlewares*/
const authMiddleware = require('../middlewares/auth');


/* Define the routes */
const router = express.Router();

// General Routes
router.get('/', indexController.getIndex);
router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);

// Time for authentication!! // After the login always check if the user is authenticated using the authMiddleware
router.use(authMiddleware); 

/*
// First Use Case: Search for a title / Search for a person / Search for a genre
*/
router.get('/home', indexController.getHome); 
// Titles
router.get('/title/:titleID', titleController.getTitle); 
router.get('/searchtitle',searchtitleController.getSearchTitle); 
router.post('/searchtitle', searchtitleController.getSearchTitle); 
router.get('/bygenre',bygenreController.getByGenre);  
router.post('/bygenre',bygenreController.getByGenre);  

router.get('/listsInfo/:titleID', titleInfoController.getListsInfo); 
router.get('/seriesInfo/:titleID', titleInfoController.getSeriesInfo); 

// People
router.get('/name/:nameID', nameController.getName); 
router.get('/searchname', searchnameController.getSearchName); 
router.post('/searchname', searchnameController.getSearchName); 

/*
// Second Use Case: User Profile / See your watchlist / Edit your watchlist 
*/
// User Profile
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