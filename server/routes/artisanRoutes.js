const express = require('express');
const router = express.Router();

const artisanController = require('../controllers/artisanController');

router.get('/top', artisanController.getTopArtisans);
router.get('/categorie/:id', artisanController.getArtisansByCategorie);
router.get('/search', artisanController.searchArtisans);
router.get('/:id', artisanController.getArtisanById);

router.post('/:id/contact', artisanController.contactArtisan);

module.exports = router;