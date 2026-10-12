// Vérifier la validité de l'identifiant d'un artisan
const validateArtisanId = (req, res, next) => {
    const { id } = req.params;

    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({
            message: 'L’identifiant de l’artisan est invalide.'
        });
    }

    next();
};

module.exports = validateArtisanId;
