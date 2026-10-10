const express = require('express');
const router = express.Router();

const specialiteController = require('../controllers/specialiteController');

router.get('/', specialiteController.getAllSpecialites);

module.exports = router;