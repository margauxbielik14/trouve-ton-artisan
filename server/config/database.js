require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

// Vérifier si nous utilisons MySQL Aiven ou MySQL local
const isAiven = process.env.DB_HOST?.endsWith('.aivencloud.com');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,

    // Utiliser le certificat SSL uniquement pour Aiven
    ...(isAiven && {
        dialectOptions: {
            ssl: {
                ca: process.env.DB_SSL_CA
                    ? process.env.DB_SSL_CA.replace(/\\n/g, '\n')
                    : fs.readFileSync(path.join(__dirname, '../certs/ca.pem'), 'utf8'),
                rejectUnauthorized: true
            }
        }
    })
});

module.exports = sequelize;
