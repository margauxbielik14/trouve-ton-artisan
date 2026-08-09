const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');
const transporter = require('../services/mailService');

// Récupérer les artisans du mois
exports.getTopArtisans = async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            where: {
                top: true
            },
            include: [
                {
                    model: Specialite,
                    attributes: ['nom'],
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom']
                        }
                    ]
                }
            ]
        });

        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans du mois'
        });
    }
};

// Récupérer les artisans d'une catégorie
exports.getArtisansByCategorie = async (req, res) => {
    try {
        const { id } = req.params;

        const artisans = await Artisan.findAll({
            include: [
                {
                    model: Specialite,
                    attributes: ['nom'],
                    required: true,
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom'],
                            where: {
                                id_categorie: id
                            },
                            required: true
                        }
                    ]
                }
            ]
        });

        res.status(200).json(artisans);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des artisans'
        });
    }
};

// Récupérer un artisan par son identifiant
exports.getArtisanById = async (req, res) => {
    try {
        const { id } = req.params;

        const artisan = await Artisan.findByPk(id, {
            include: [
                {
                    model: Specialite,
                    attributes: ['nom'],
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom']
                        }
                    ]
                }
            ]
        });

        if (!artisan) {
            return res.status(404).json({
                message: 'Artisan non trouvé'
            });
        }

        res.status(200).json(artisan);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l’artisan'
        });
    }
};

// Rechercher des artisans par nom
exports.searchArtisans = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({
                message: 'Veuillez saisir un terme de recherche'
            });
        }

        const artisans = await Artisan.findAll({
            where: {
                nom: {
                    [Op.like]: `%${search}%`
                }
            },
            include: [
                {
                    model: Specialite,
                    attributes: ['nom'],
                    include: [
                        {
                            model: Categorie,
                            attributes: ['nom']
                        }
                    ]
                }
            ]
        });

        res.status(200).json(artisans);

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la recherche des artisans'
        });
    }
};

// Envoyer un message à un artisan
exports.contactArtisan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, email, objet, message } = req.body;

        if (!nom || !email || !objet || !message) {
            return res.status(400).json({
                message: 'Tous les champs sont obligatoires'
            });
        }

        const artisan = await Artisan.findByPk(id);

        if (!artisan) {
            return res.status(404).json({
                message: 'Artisan non trouvé'
            });
        }

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: artisan.email,
            replyTo: email,
            subject: objet,
            text: `Nom : ${nom}
Email : ${email}

${message}`
        });

        res.status(200).json({
            message: 'Message envoyé avec succès'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Erreur lors de l’envoi du message'
        });
    }
};