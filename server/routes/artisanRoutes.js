const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const artisanController = require('../controllers/artisanController');

router.get('/top', artisanController.getTopArtisans);
router.get('/categorie/:id', artisanController.getArtisansByCategorie);
router.get('/search', artisanController.searchArtisans);
router.get('/:id', artisanController.getArtisanById);

router.post(
    '/:id/contact',
    [
        body('nom')
            .trim()
            .notEmpty()
            .isLength({ max: 100 }),

        body('email')
            .trim()
            .isEmail()
            .normalizeEmail(),

        body('objet')
            .trim()
            .notEmpty()
            .isLength({ max: 150 }),

        body('message')
            .trim()
            .notEmpty()
            .isLength({ max: 2000 })
    ],
    artisanController.contactArtisan
);

module.exports = router;