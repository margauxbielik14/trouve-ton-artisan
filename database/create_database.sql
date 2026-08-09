-- Création de la base de données
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Sélection de la base de données
USE trouve_ton_artisan;


-- Création de la table categorie
CREATE TABLE categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
);


-- Création de la table specialite
CREATE TABLE specialite (
    id_specialite INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    id_categorie INT NOT NULL,

    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES categorie(id_categorie)
);


-- Création de la table artisan
CREATE TABLE artisan (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    note DECIMAL(2,1) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255),
    top BOOLEAN NOT NULL DEFAULT FALSE,
    id_specialite INT NOT NULL,

    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite)
        REFERENCES specialite(id_specialite)
);