-- Sélection de la base de données

USE trouve_ton_artisan;

-- Insertion des catégories

INSERT INTO categorie (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- Insertion des spécialités

INSERT INTO specialite (nom, id_categorie) VALUES
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),

('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),

('Bijoutier', 3),
('Couturier', 3),
('Ferronnier', 3),

('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- Insertion des artisans

INSERT INTO artisan
(nom, note, ville, a_propos, email, site_web, top, id_specialite)
VALUES

('Boucherie Dumont', 4.5, 'Lyon',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'boucherie.dumont@gmail.com',
NULL, FALSE, 1),

('Au pain chaud', 4.8, 'Montélimar',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'aupainchaud@hotmail.com',
NULL, TRUE, 2),

('Chocolaterie Labbé', 4.9, 'Lyon',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'chocolaterie-labbe@gmail.com',
'https://chocolaterie-labbe.fr', TRUE, 3),

('Traiteur Truchon', 4.1, 'Lyon',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'contact@truchon-traiteur.fr',
'https://truchon-traiteur.fr', FALSE, 4),

('Orville Salmons', 5.0, 'Évian',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'o-salmons@live.com',
NULL, TRUE, 5),

('Mont Blanc Électricité', 4.5, 'Chamonix',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'contact@mont-blanc-electricite.com',
'https://mont-blanc-electricite.com', FALSE, 6),

('Boutot & fils', 4.7, 'Bourg-en-Bresse',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'boutot-menuiserie@gmail.com',
'https://boutot-menuiserie.com', FALSE, 7),

('Vallis Bellemare', 4.0, 'Vienne',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'v.bellemare@gmail.com',
'https://plomberie-bellemare.com', FALSE, 8),

('Claude Quinn', 4.2, 'Aix-les-Bains',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'claude.quinn@gmail.com',
NULL, FALSE, 9),

('Amitee Lécuyer', 4.5, 'Annecy',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'a.amitee@hotmail.com',
'https://lecuyer-couture.com', FALSE, 10),

('Ernest Carignan', 5.0, 'Le Puy-en-Velay',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'e-carignan@hotmail.com',
NULL, FALSE, 11),

('Royden Charbonneau', 3.8, 'Saint-Priest',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'r.charbonneau@gmail.com',
NULL, FALSE, 12),

('Lelala Dennis', 3.8, 'Chambéry',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'l.dennos@hotmail.fr',
'https://coiffure-lelala-chambery.fr', FALSE, 12),

('C''est sup''hair', 4.1, 'Romans-sur-Isère',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'sup-hair@gmail.com',
'https://sup-hair.fr', FALSE, 12),

('Le monde des fleurs', 4.6, 'Annonay',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'contact@le-monde-des-fleurs-annonay.fr',
'https://le-monde-des-fleurs-annonay.fr', FALSE, 13),

('Valérie Laderoute', 4.5, 'Valence',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'v-laredoute@gmail.com',
NULL, FALSE, 14),

('CM Graphisme', 4.4, 'Valence',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante.',
'contact@cm-graphisme.com',
'https://cm-graphisme.com', FALSE, 15);