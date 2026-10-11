const express = require('express');
const sequelize = require('./config/database');
require('./models');

const categorieRoutes = require('./routes/categorieRoutes');
const specialiteRoutes = require('./routes/specialiteRoutes');
const artisanRoutes = require('./routes/artisanRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sessionMiddleware = require('./config/session');

const app = express();

app.set('trust proxy', 1);

// Sécurisation des en-têtes HTTP

app.use(helmet());

// Autoriser uniquement l'application front-end

app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://trouve-ton-artisan-frontend-tmvc.onrender.com'
    ],
    credentials: true
  }));

// Gestion des sessions administrateur
app.use(sessionMiddleware);

// Limiter le nombre de requêtes vers l'API

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        message: 'Trop de requêtes, veuillez réessayer plus tard.'
    }
});

app.use('/api', limiter);

// Lecture des données JSON

app.use(express.json({ limit: '10kb' }));

const PORT = process.env.PORT || 3000;

app.get('/api/test', (req, res) => {
    res.json({ message: 'Route API test OK' });
  });

app.use('/api/categories', categorieRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

sequelize.authenticate()
.then(() => {
  console.log('✅ Connexion à MySQL réussie');
})
.catch((error) => {
  console.error('❌ Erreur de connexion à MySQL :', error);
});

app.get('/', (req, res) => {
    res.json({ message: 'API Trouve ton artisan' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});