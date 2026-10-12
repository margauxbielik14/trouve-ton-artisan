const { Specialite } = require('../models');

// Récupérer toutes les spécialités
const getAllSpecialites = async (req, res) => {
    try {
        const specialites = await Specialite.findAll({
            attributes: ['id_specialite', 'nom', 'id_categorie'],
            order: [['nom', 'ASC']]
        });

        return res.status(200).json(specialites);
    } catch (error) {
        console.error('Erreur lors de la récupération des spécialités :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des spécialités.'
        });
    }
};

module.exports = {
    getAllSpecialites
};
