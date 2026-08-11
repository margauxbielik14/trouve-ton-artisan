const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

const artisanController = require('../controllers/artisanController');

router.get('/top', artisanController.getTopArtisans);
router.get('/categorie/:id',param('id').isInt({ min: 1 }),artisanController.getArtisansByCategorie);
router.get('/search',query('search').trim().notEmpty().isLength({ max: 100 }),artisanController.searchArtisans);
router.get('/:id',param('id').isInt({ min: 1 }),artisanController.getArtisanById);

router.post(
    '/:id/contact',
    [
      param('id').isInt({ min: 1 }),
  
      body('nom')
        .trim()
        .notEmpty()
        .isLength({ max: 100 }),
  
      body('email')
        .trim()
        .notEmpty()
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