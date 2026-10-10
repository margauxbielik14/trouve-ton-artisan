const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Trop de tentatives de connexion. Veuillez réessayer dans 15 minutes.'
    }
});

module.exports = loginLimiter;