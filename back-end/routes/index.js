const express = require('express');

const indexController = require('../controllers/index');
const authController = require('../controllers/auth');
// TitleObjects
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle');
const bygenreController = require('../controllers/bygenre');
const listsController = require('../controllers/lists');
const titleInfoController = require('../controllers/titleInfo');
// People
const nameController = require('../controllers/name');
const searchnameController = require('../controllers/searchname');

//Middlewares
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', indexController.getIndex);

router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);

// Time for authentication!! // After the login always check if the user is authenticated using the authMiddleware
router.use(authMiddleware); 

//
// First Use Case: Search for a title / Search for a person / Search for a genre
//
// Titles
router.get('/title/:titleID', titleController.getTitle); // OK - Needs to be tested
router.get('/searchtitle',searchtitleController.getSearchTitle); // OK - Needs to be tested
router.post('/searchtitle', searchtitleController.getSearchTitle); // OK - Needs to be tested
router.get('/bygenre',bygenreController.getByGenre);  // OK - Needs to be tested
router.post('/bygenre',bygenreController.getByGenre);  // OK - Needs to be tested

router.get('/listsInfo/:titleID', titleInfoController.getListsInfo); // OK - Needs to be tested
router.get('/seriesInfo/:titleID', titleInfoController.getSeriesInfo); // OK - Needs to be tested
// Lists (Βοηθητικά γιατι θέλουμε να δείχνουμε στο Frontend να μπορεί να γίνει η εισαγωγή σε λίστες)
router.post('/addToFavorites/:titleID', listsController.postAddToFavorites); // OK - Needs to be tested
router.post('/addToWatchlist/:titleID', listsController.postAddToWatchlist); // OK - Needs to be tested
// People
router.get('/name/:nameID', nameController.getName); // OK - Needs to be tested
router.get('/searchname', searchnameController.getSearchName); // OK - Needs to be tested
router.post('/searchname', searchnameController.getSearchName); // OK - Needs to be tested

//
// Second Use Case: See your watchlist / Edit your watchlist 
//
router.get('/watchlist', listsController.getWatchlist); // OK - Needs to be tested
router.get('/favorites', listsController.getFavorites); // OK - Needs to be tested



module.exports = router;

