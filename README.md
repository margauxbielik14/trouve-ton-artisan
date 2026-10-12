# Trouve ton artisan

Application web permettant aux particuliers de rechercher un artisan en Auvergne-Rhône-Alpes, de consulter sa fiche et de le contacter via un formulaire.

## Application en ligne

Front-end :
https://trouve-ton-artisan-frontend-tmvc.onrender.com

API :
https://trouve-ton-artisan-1-893b.onrender.com

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

- Node.js 24.x
- npm
- MySQL
- Git

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/margauxbielik14/trouve-ton-artisan.git
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

Le script `create_database.sql` crée également les tables nécessaires à l'administration et au stockage des sessions de connexion.

Le script `insert_data.sql` permet d'initialiser les catégories, les spécialités et les artisans nécessaires au fonctionnement de l'application. Il doit être exécuté sur une base de données vide.

## Administration

L'application dispose d'un espace d'administration permettant de gérer les artisans.

Les fonctionnalités disponibles sont :

- Connexion et déconnexion sécurisées
- Consultation et recherche des artisans
- Ajout d'un artisan
- Modification des informations d'un artisan
- Suppression d'un artisan

## Création d'un compte administrateur

La création d'un compte administrateur n'est pas accessible depuis l'interface publique.

Un script de génération de hash bcrypt est disponible dans le dossier `server`. Il permet de générer un mot de passe sécurisé avant son enregistrement dans la base de données.

Depuis le dossier `server`, exécuter :

```bash
node generate-admin-hash.cjs
```

Saisir un mot de passe d'au moins 12 caractères, puis récupérer le hash généré.

Créer ensuite un compte dans la table administrateur en renseignant une adresse e-mail et le hash bcrypt dans la colonne `mot_de_passe`.

L'interface d'administration est accessible à l'adresse `/admin/connexion`.

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
npm start
```

L'API est accessible par défaut à l'adresse :

```text
http://localhost:3000
```

## Configuration du front-end

Dans un nouveau terminal, depuis la racine du projet, se rendre dans le dossier client :

```bash
cd client
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` dans le dossier `client` et renseigner l'adresse de l'API :

```env
VITE_API_URL=http://localhost:3000
```

Cette variable permet au front-end de communiquer avec le serveur API en développement local.

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
- Connexion sécurisée à l'administration
- Tableau de bord administrateur
- Ajout, modification et suppression des artisans
- Recherche d'artisans dans le tableau de bord
- Gestion des sessions administrateur

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