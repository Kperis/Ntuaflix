const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', adminController.getIndex);
router.get('/healthcheck', adminController.getHealthcheck);
router.post('/upload/titlebasics', upload.single('file'), adminController.uploadTitleBasics);
router.post('/upload/titleakas', upload.single('file'), adminController.uploadTitleAkas);
router.post('/upload/namebasics', upload.single('file'), adminController.uploadNameBasics);
router.post('/upload/titleprincipals', upload.single('file'), adminController.uploadTitlePrincipals);
router.post('/upload/titleepisode', upload.single('file'), adminController.uploadTitleEpisode);
router.post('/upload/titleratings', upload.single('file'), adminController.uploadTitleRatings);
router.post('/resetall', adminController.resetAll);

module.exports = router;