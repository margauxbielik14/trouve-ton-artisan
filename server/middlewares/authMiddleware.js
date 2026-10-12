const requireAdmin = (req, res, next) => {
    if (!req.session || !req.session.adminId) {
        return res.status(401).json({
            message: 'Vous devez être connecté pour accéder à cette fonctionnalité.'
        });
    }

    next();
};

module.exports = requireAdmin;
