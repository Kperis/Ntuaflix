const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', adminController.getIndex);
router.get('/healthcheck', adminController.getHealthcheck);
router.post('/upload/titleepisode', upload.single('file'), adminController.uploadTitleEpisode);

module.exports = router;