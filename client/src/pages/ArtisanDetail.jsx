import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Rating from '../components/Rating';

function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/artisans/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Artisan non trouvé');
        }

        return response.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          'Erreur lors du chargement de l’artisan :',
          error
        );
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!artisan) {
      return;
    }
  
    document.title = `${artisan.nom} | Trouve ton artisan !`;
  
    const metaDescription = document.querySelector(
      'meta[name="description"]'
    );
  
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        `Découvrez ${artisan.nom}, artisan spécialisé en ${artisan.Specialite?.nom || 'artisanat'} à ${artisan.ville}.`
      );
    }
  }, [artisan]);

  if (loading) {
    return (
      <section className="page-loading">
        <p>Chargement...</p>
      </section>
    );
  }

  if (!artisan) {
    return <p>Artisan non trouvé.</p>;
  }

  return (
    <section className="artisan-detail">
      <div className="artisan-detail__intro">
        <div className="artisan-detail__infos">
          <span className="artisan-detail__marker"></span>

          <h1>{artisan.nom}</h1>

          <Rating note={artisan.note} />

          <p>{artisan.Specialite?.nom}</p>
          <p>{artisan.ville}</p>
        </div>

        <div className="artisan-detail__image">
          <img
            src="/artisan.webp"
            alt={`Illustration de ${artisan.nom}`}
            width="600"
            height="400"
          />
        </div>
      </div>

      <section className="artisan-detail__about">
        <h2>À propos</h2>
        <p>{artisan.a_propos}</p>
      </section>

      <section className="artisan-detail__contact-info">
        <h2>Contact</h2>

        <p>
          <strong>Email</strong><br />
          {artisan.email}
        </p>

        {artisan.site_web && (
          <p>
            <strong>Site internet</strong><br />
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noreferrer"
            >
              {artisan.site_web}
            </a>
          </p>
        )}
      </section>

      <ContactForm artisanId={artisan.id_artisan} />
    </section>
  );
}

export default ArtisanDetail;