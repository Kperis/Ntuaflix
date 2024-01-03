const express = require('express');

const indexController = require('../controllers/index');
const titleController = require('../controllers/title');
const searchtitleController = require('../controllers/searchtitle')
const bygenreController = require('../controllers/genretitle')

const router = express.Router();

router.get('/', indexController.getIndex);
router.get('/title/:titleID', titleController.getTitle);
router.get('/searchtitle',searchtitleController.getSearchTitle);
router.get('/bygenre',bygenreController.getGenreTitle);

module.exports = router;