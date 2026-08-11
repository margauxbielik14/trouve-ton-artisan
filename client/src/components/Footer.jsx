import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors du chargement des catégories :',
          error
        );
      });
  }, []);

  return (
    <footer className="site-footer">
      <section className="site-footer__section">
        <h2>Adresse et contacts</h2>

        <p>
          101 cours Charlemagne<br />
          CS 20033<br />
          69269 LYON CEDEX 02<br />
          France<br />
          +33 (0)4 26 73 40 00
        </p>
      </section>

      <section className="site-footer__section">
        <h2>Informations</h2>

        <nav className="site-footer__nav">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/donnees-personnelles">Données personnelles</Link>
          <Link to="/accessibilite">Accessibilité</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>
      </section>

      <section className="site-footer__section">
        <h2>Navigation</h2>

        <nav className="site-footer__nav">
          {categories.map((categorie) => (
            <Link
              key={categorie.id_categorie}
              to={`/categorie/${categorie.id_categorie}`}
            >
              {categorie.nom}
            </Link>
          ))}
        </nav>
      </section>
    </footer>
  );
}

export default Footer;