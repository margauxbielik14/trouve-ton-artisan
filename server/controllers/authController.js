const bcrypt = require('bcrypt');
const { Administrateur } = require('../models');

// Connexion de l'administrateur
const login = async (req, res) => {
    try {
        // Récupérer les identifiants envoyés par le formulaire
        const { email, mot_de_passe } = req.body;

        // Vérifier que les deux champs sont remplis
        if (
            typeof email !== 'string' ||
            typeof mot_de_passe !== 'string' ||
            !email.trim() ||
            !mot_de_passe
        ) {
            return res.status(400).json({
                message: 'Veuillez renseigner votre e-mail et votre mot de passe.'
            });
        }

        // Rechercher l'administrateur dans la base de données
        const administrateur = await Administrateur.findOne({
            where: {
                email: email.trim().toLowerCase()
            }
        });

        // Vérifier le mot de passe avec bcrypt
        const motDePasseValide = administrateur
            ? await bcrypt.compare(mot_de_passe, administrateur.mot_de_passe)
            : false;

        // Refuser la connexion si les identifiants sont incorrects
        if (!administrateur || !motDePasseValide) {
            return res.status(401).json({
                message: 'E-mail ou mot de passe incorrect.'
            });
        }

        // Renouveler la session pour sécuriser la connexion
        req.session.regenerate((error) => {
            if (error) {
                console.error('Erreur de création de session :', error);

                return res.status(500).json({
                    message: 'Une erreur est survenue lors de la connexion.'
                });
            }

            // Enregistrer l'identifiant de l'administrateur dans la session
            req.session.adminId = administrateur.id_admin;

            req.session.save((error) => {
                if (error) {
                    console.error('Erreur d’enregistrement de session :', error);

                    return res.status(500).json({
                        message: 'Une erreur est survenue lors de la connexion.'
                    });
                }

                return res.status(200).json({
                    message: 'Connexion réussie.',
                    administrateur: {
                        id_admin: administrateur.id_admin,
                        email: administrateur.email
                    }
                });
            });
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue sur le serveur.'
        });
    }
};

// Vérification de la session

// Vérifier si l'administrateur est connecté
const me = async (req, res) => {
    try {
        // Vérifier si une session administrateur existe
        if (!req.session.adminId) {
            return res.status(401).json({
                message: 'Vous devez être connecté.'
            });
        }

        // Retrouver l'administrateur dans la base de données
        const administrateur = await Administrateur.findByPk(req.session.adminId, {
            attributes: ['id_admin', 'email']
        });

        // Vérifier que le compte existe toujours
        if (!administrateur) {
            return res.status(401).json({
                message: 'Session invalide.'
            });
        }

        // Renvoyer les informations de l'administrateur connecté
        return res.status(200).json({
            administrateur
        });
    } catch (error) {
        console.error('Erreur de vérification de session :', error);

        return res.status(500).json({
            message: 'Une erreur est survenue sur le serveur.'
        });
    }
};

// Déconnexion de l'administrateur
// Déconnexion de l'administrateur
const logout = async (req, res) => {
    // Détruire la session de l'administrateur
    req.session.destroy((error) => {
        if (error) {
            console.error('Erreur lors de la déconnexion :', error);

            return res.status(500).json({
                message: 'Une erreur est survenue lors de la déconnexion.'
            });
        }

        // Supprimer le cookie de session du navigateur
        res.clearCookie('trouve-ton-artisan.sid', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });

        return res.status(200).json({
            message: 'Déconnexion réussie.'
        });
    });
};

module.exports = {
    login,
    me,
    logout
};
