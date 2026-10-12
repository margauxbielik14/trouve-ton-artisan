const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Administrateur = sequelize.define(
    'Administrateur',
    {
        id_admin: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        mot_de_passe: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'administrateur',
        timestamps: false
    }
);

module.exports = Administrateur;
