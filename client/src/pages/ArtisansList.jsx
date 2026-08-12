import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';

const API_URL = import.meta.env.VITE_API_URL;

function ArtisansList() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const categorieNom =
  artisans[0]?.Specialite?.Categorie?.nom;

  useEffect(() => {
    const title = search
      ? `Recherche : ${search} | Trouve ton artisan !`
      : `${categorieNom || 'Artisans'} | Trouve ton artisan !`;
  
    document.title = title;
  
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );
  
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        search
          ? `Découvrez les artisans correspondant à votre recherche « ${search} » en Auvergne-Rhône-Alpes.`
          : `Découvrez les artisans de la catégorie ${categorieNom || ''} en Auvergne-Rhône-Alpes.`
      );
    }
  }, [search, categorieNom]);

  useEffect(() => {
    let url;

    if (search) {
        url = `${API_URL}/api/artisans/search?search=${encodeURIComponent(search)}`;
    } else {
        url = `${API_URL}/api/artisans/categorie/${id}`;
    }

    setLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArtisans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          'Erreur lors du chargement des artisans :',
          error
        );
        setLoading(false);
      });
  }, [id, search]);

  if (loading) {
    return (
      <section className="page-loading">
        <p>Chargement...</p>
      </section>
    );
  }

  return (
    <section className="artisans-list">
      <div className="artisans-list__heading">
        <span className="artisans-list__marker"></span>

        <div>
            <h1>
                {search
                ? `Résultats pour « ${search} »`
                : categorieNom || 'Artisans'}
            </h1>
            
            <p>
                {artisans.length} {artisans.length > 1 ? 'artisans trouvés' : 'artisan trouvé'}
            </p>
            </div>
      </div>

      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé.</p>
      ) : (
        <div className="artisans-grid artisans-grid--list">
          {artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id_artisan}
              artisan={artisan}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ArtisansList;