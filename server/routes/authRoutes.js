const express = require('express');
const router = express.Router();
const {
    login,
    me,
    logout
} = require('../controllers/authController');
const loginLimiter = require('../middlewares/loginLimiter');
const verifyOrigin = require('../middlewares/verifyOrigin');

// Connexion de l'administrateur
router.post('/login', loginLimiter, verifyOrigin, login);

// Vérification de la session
router.get('/me', me);

// Déconnexion de l'administrateur
router.post('/logout', verifyOrigin, logout);

module.exports = router;