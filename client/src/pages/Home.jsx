import { useEffect, useState } from 'react';
import ArtisanCard from '../components/ArtisanCard';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    document.title = 'Trouve ton artisan ! | Auvergne-Rhône-Alpes';

const metaDescription = document.querySelector('meta[name="description"]');

if (metaDescription) {
  metaDescription.setAttribute(
    'content',
    'Trouvez facilement un artisan en Auvergne-Rhône-Alpes selon son métier et sa localisation.'
  );
}
fetch(`${API_URL}/api/artisans/top`)
      .then((response) => response.json())
      .then((data) => {
        setArtisans(data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors du chargement des artisans du mois :',
          error
        );
      });
  }, []);

  return (
    <>
      <section className="how-to">
        <h1>Comment trouver mon artisan ?</h1>

        <ol className="how-to__steps">
          <li>
            <span>1</span>
            <p>Choisir la catégorie d'artisanat dans le menu.</p>
          </li>

          <li>
            <span>2</span>
            <p>Choisir un artisan.</p>
          </li>

          <li>
            <span>3</span>
            <p>Le contacter via le formulaire de contact.</p>
          </li>

          <li>
            <span>4</span>
            <p>Une réponse sera apportée sous 48h.</p>
          </li>
        </ol>
      </section>

      <section className="top-artisans">
        <h2>Les artisans du mois</h2>

        <div className="artisans-grid">
          {artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id_artisan}
              artisan={artisan}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;