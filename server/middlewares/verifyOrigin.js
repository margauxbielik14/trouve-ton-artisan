const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://trouve-ton-artisan-frontend-tmvc.onrender.com'
];

const verifyOrigin = (req, res, next) => {
    const origin = req.get('Origin');

    // Refuser les requêtes sans origine ou provenant d'un site inconnu
    if (!origin || !allowedOrigins.includes(origin)) {
        return res.status(403).json({
            message: 'Origine de la requête non autorisée.'
        });
    }

    next();
};

module.exports = verifyOrigin;