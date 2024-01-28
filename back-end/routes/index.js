const express = require('express');

const indexController = require('../controllers/index');
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle');
const bygenreController = require('../controllers/bygenre');
const authController = require('../controllers/auth');
const nameController = require('../controllers/name');
const searchnameController = require('../controllers/searchname');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', indexController.getIndex);

router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);

// Time for authentication!! // After the login always check if the user is authenticated using the authMiddleware
router.use(authMiddleware); 

// First Use Case: Search for a title / Search for a person / Search for a genre
// Titles
router.get('/title/:titleID', titleController.getTitle); // OK - Needs to be tested
router.get('/searchtitle',searchtitleController.getSearchTitle); // OK - Needs to be tested
router.get('/bygenre',bygenreController.getByGenre);  // OK - Needs to be tested
// People
router.get('/name/:nameID', nameController.getName); // OK - Needs to be tested
router.get('/searchname', searchnameController.getSearchName); // OK - Needs to be tested

// Second Use Case: Add a title to your watchlist / Edit your watchlist 

module.exports = router;