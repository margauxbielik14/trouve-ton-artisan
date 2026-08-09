const { Categorie } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            order: [['nom', 'ASC']]
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des catégories'
        });
    }
};