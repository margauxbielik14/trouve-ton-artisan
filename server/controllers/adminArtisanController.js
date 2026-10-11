const { Artisan, Specialite, Categorie } = require('../models');
const validateArtisan = require('../validators/artisanValidator');

// Récupérer tous les artisans
const getAllArtisans = async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            include: [
                {
                    model: Specialite,
                    include: [
                        {
                            model: Categorie
                        }
                    ]
                }
            ],
            order: [['id_artisan', 'ASC']]
        });

        return res.status(200).json(artisans);

    } catch (error) {
        console.error('Erreur lors de la récupération des artisans :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des artisans.'
        });
    }
};

// Ajouter un nouvel artisan
const createArtisan = async (req, res) => {
    try {
        const {
            nom,
            note,
            ville,
            a_propos,
            email,
            site_web,
            top,
            id_specialite
        } = req.body;

        // Vérifier les données envoyées
const errors = validateArtisan(req.body);

if (errors.length > 0) {
    return res.status(400).json({
        message: 'Les informations de l’artisan sont invalides.',
        errors
    });
}

// Vérifier que la spécialité existe dans MySQL
const specialite = await Specialite.findByPk(id_specialite);

if (!specialite) {
    return res.status(400).json({
        message: 'La spécialité sélectionnée n’existe pas.'
    });
}

        const nouvelArtisan = await Artisan.create({
            nom,
            note,
            ville,
            a_propos,
            email,
            site_web,
            top,
            id_specialite
        });

        return res.status(201).json({
            message: 'Artisan ajouté avec succès.',
            artisan: nouvelArtisan
        });

    } catch (error) {
        console.error('Erreur lors de la création de l’artisan :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue lors de la création de l’artisan.'
        });
    }
};

// Modifier un artisan existant
const updateArtisan = async (req, res) => {
    try {
        const { id } = req.params;

        const artisan = await Artisan.findByPk(id);

        if (!artisan) {
            return res.status(404).json({
                message: 'Artisan introuvable.'
            });
        }

        const {
            nom,
            note,
            ville,
            a_propos,
            email,
            site_web,
            top,
            id_specialite
        } = req.body;

        // Vérifier les données envoyées
const errors = validateArtisan(req.body);

if (errors.length > 0) {
    return res.status(400).json({
        message: 'Les informations de l’artisan sont invalides.',
        errors
    });
}

// Vérifier que la spécialité existe dans MySQL
const specialite = await Specialite.findByPk(id_specialite);

if (!specialite) {
    return res.status(400).json({
        message: 'La spécialité sélectionnée n’existe pas.'
    });
}

        await artisan.update({
            nom,
            note,
            ville,
            a_propos,
            email,
            site_web,
            top,
            id_specialite
        });

        return res.status(200).json({
            message: 'Artisan modifié avec succès.',
            artisan
        });

    } catch (error) {
        console.error('Erreur lors de la modification de l’artisan :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue lors de la modification de l’artisan.'
        });
    }
};

// Supprimer un artisan
const deleteArtisan = async (req, res) => {
    try {
        const { id } = req.params;

        const artisan = await Artisan.findByPk(id);

        if (!artisan) {
            return res.status(404).json({
                message: 'Artisan introuvable.'
            });
        }

        await artisan.destroy();

        return res.status(200).json({
            message: 'Artisan supprimé avec succès.'
        });

    } catch (error) {
        console.error('Erreur lors de la suppression de l’artisan :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression de l’artisan.'
        });
    }
};

module.exports = {
    getAllArtisans,
    createArtisan,
    updateArtisan,
    deleteArtisan
};