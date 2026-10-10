const express = require('express');
const router = express.Router();
const validateArtisanId = require('../middlewares/validateArtisanId');
const requireAdmin = require('../middlewares/authMiddleware');
const verifyOrigin = require('../middlewares/verifyOrigin');
const {
    getAllArtisans,
    createArtisan,
    updateArtisan,
    deleteArtisan
} = require('../controllers/adminArtisanController');

// Toutes les routes de ce fichier nécessitent une connexion administrateur
router.use(requireAdmin);

// Route temporaire pour tester la protection
router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Accès administrateur autorisé.'
    });
});

// Récupérer la liste de tous les artisans
router.get('/artisans', getAllArtisans);

// Ajouter un nouvel artisan
router.post('/artisans', verifyOrigin, createArtisan);

// Modifier un artisan existant
router.put('/artisans/:id', verifyOrigin, validateArtisanId, updateArtisan);

// Supprimer un artisan
router.delete('/artisans/:id', verifyOrigin, validateArtisanId, deleteArtisan);

module.exports = router;