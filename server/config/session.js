const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Détecter si nous utilisons MySQL Aiven
const isAiven = process.env.DB_HOST?.endsWith('.aivencloud.com');

// Connexion MySQL dédiée aux sessions
const sessionConnection = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(isAiven && {
        ssl: {
            ca: process.env.DB_SSL_CA
                ? process.env.DB_SSL_CA.replace(/\\n/g, '\n')
                : fs.readFileSync(path.join(__dirname, '../certs/ca.pem'), 'utf8'),
            rejectUnauthorized: true
        }
    })
});

// Stockage des sessions dans MySQL
const sessionStore = new MySQLStore(
    {
        createDatabaseTable: false
    },
    sessionConnection
);

sessionStore.on('error', (error) => {
    console.error('Erreur du stockage des sessions :', error.message);
});

sessionStore
    .onReady()
    .then(() => {
        console.log('✅ Stockage des sessions MySQL initialisé');
    })
    .catch((error) => {
        console.error('❌ Erreur d’initialisation des sessions :', error.message);
    });

// Configuration des sessions
const sessionMiddleware = session({
    name: 'trouve-ton-artisan.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
});

module.exports = sessionMiddleware;
