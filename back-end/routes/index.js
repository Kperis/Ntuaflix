const express = require('express');

const indexController = require('../controllers/index');
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle');
const bygenreController = require('../controllers/genretitle');
const signUpController = require('../controllers/signup');
const loginController = require('../controllers/login');

const router = express.Router();

router.get('/', indexController.getIndex);

// signup and login 
router.get('/signup',signUpController.getSignUp);
router.post('/signup', signUpController.postSignUp);
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.get('/title/:titleID', titleController.getTitle);
router.get('/searchtitle',searchtitleController.getSearchTitle);
router.get('/bygenre',bygenreController.getGenreTitle);

module.exports = router;