const express = require('express');

const indexController = require('../controllers/launching');
const titleController = require('../controllers/title');

const router = express.Router();

router.get('/', indexController.getIndex);
router.get('/title/:titleID', titleController.getTitle);

module.exports = router;