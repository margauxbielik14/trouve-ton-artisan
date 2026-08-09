const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define(
    'Categorie',
    {
        id_categorie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'categorie',
        timestamps: false
    }
);

module.exports = Categorie;