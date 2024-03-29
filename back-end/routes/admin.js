const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const isAdmin = require('../middlewares/isAdmin');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);
router.use(isAdmin); // If the user is not an admin, the middleware will return an error response! (401 Not Authorized)

router.get('/', adminController.getIndex);
router.get('/healthcheck', adminController.getHealthcheck);
router.get('/users/:username', adminController.readUser);
router.post('/upload/titlebasics', upload.single('file'), adminController.uploadTitleBasics);
router.post('/upload/titleakas', upload.single('file'), adminController.uploadTitleAkas);
router.post('/upload/namebasics', upload.single('file'), adminController.uploadNameBasics);
router.post('/upload/titleprincipals', upload.single('file'), adminController.uploadTitlePrincipals);
router.post('/upload/titleepisode', upload.single('file'), adminController.uploadTitleEpisode);
router.post('/upload/titleratings', upload.single('file'), adminController.uploadTitleRatings);
router.post('/resetall', adminController.resetAll);
router.post('/upload/titlecrew',upload.single('file'), adminController.uploadTitleCrew);
router.post('/usermod/:username/:password',adminController.usermod);
//to be done i dont know

module.exports = router;