const express = require('express');

const indexController = require('../controllers/index');
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle');
const bygenreController = require('../controllers/genretitle');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', indexController.getIndex);

router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);

// Time for authentication!! // After the login always check if the user is authenticated using the authMiddleware
router.use(authMiddleware); 

// First Use Case: Search for a title / Search for a person / Search for a genre
router.get('/title/:titleID', titleController.getTitle);
router.get('/searchtitle',searchtitleController.getSearchTitle);
router.get('/bygenre',bygenreController.getGenreTitle);

// Second Use Case: Add a title to your watchlist / Edit your watchlist 

module.exports = router;