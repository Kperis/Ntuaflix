const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/', adminController.getIndex);
router.get('/healthcheck', adminController.getHealthcheck);

module.exports = router;