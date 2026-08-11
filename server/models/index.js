const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// Une catégorie possède plusieurs spécialités

Categorie.hasMany(Specialite, {
    foreignKey: 'id_categorie'
});

// Une spécialité appartient à une catégorie

Specialite.belongsTo(Categorie, {
    foreignKey: 'id_categorie'
});

// Une spécialité possède plusieurs artisans

Specialite.hasMany(Artisan, {
    foreignKey: 'id_specialite'
});

// Un artisan appartient à une spécialité

Artisan.belongsTo(Specialite, {
    foreignKey: 'id_specialite'
});

module.exports = {
    Categorie,
    Specialite,
    Artisan
};