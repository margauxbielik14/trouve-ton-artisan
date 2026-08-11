# Trouve ton artisan

Application web permettant aux particuliers de rechercher un artisan en Auvergne-Rhône-Alpes, de consulter sa fiche et de le contacter via un formulaire.

## Technologies utilisées

### Front-end

- ReactJS
- React Router
- Bootstrap
- Sass
- Vite

### Back-end

- Node.js
- Express
- Sequelize
- MySQL
- Nodemailer

### Outils

- Figma
- Git
- GitHub
- Visual Studio Code

## Prérequis

Avant de lancer le projet, il faut disposer de :

- Node.js
- npm
- MySQL
- Git

## Installation

Cloner le dépôt :

```bash
git clone URL_DU_DEPOT
```

Puis entrer dans le dossier du projet :

```bash
cd trouve-ton-artisan
```
## Configuration de la base de données

Les scripts SQL nécessaires se trouvent dans le dossier `database`.

Créer la base de données à l'aide du script :

```text
database/create_database.sql
```

Puis insérer les données à l'aide du script :

```text
database/insert_data.sql
```

## Configuration du serveur

Se rendre dans le dossier du serveur :

```bash
cd server
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` à partir du fichier `.env.example`.

Le fichier doit contenir les variables suivantes :

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=trouve_ton_artisan
DB_PORT=3306

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=
MAIL_PASSWORD=
```

Renseigner les informations correspondant à votre environnement local.

Lancer l'API :

```bash
node app.js
```

L'API est accessible par défaut à l'adresse :

```text
http://localhost:3000
```

## Configuration du front-end

Depuis la racine du projet, se rendre dans le dossier client :

```bash
cd client
```

Installer les dépendances :

```bash
npm install
```

Lancer l'application en développement :

```bash
npm run dev
```

Le front-end est accessible par défaut à l'adresse :

```text
http://localhost:5173
```

## Version de production

Créer le build de production :

```bash
npm run build
```

Puis prévisualiser le build :

```bash
npm run preview
```

La prévisualisation est accessible par défaut à l'adresse :

```text
http://localhost:4173
```

## Fonctionnalités principales

- Recherche d'artisans par nom
- Navigation par catégorie
- Affichage des artisans du mois
- Fiches détaillées des artisans
- Formulaire de contact avec envoi d'e-mail
- Pages légales
- Page 404
- Interface responsive mobile first
- Données récupérées dynamiquement depuis une API

## Sécurité

Le projet met notamment en place :

- Helmet pour sécuriser les en-têtes HTTP
- CORS pour limiter les origines autorisées
- express-rate-limit pour limiter le nombre de requêtes
- express-validator pour valider les données entrantes
- Limitation de la taille des requêtes JSON
- Variables d'environnement pour protéger les informations sensibles
- `.gitignore` pour empêcher l'envoi des secrets sur GitHub

## Auteur

Margaux Bielik