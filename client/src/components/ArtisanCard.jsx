import { Link } from 'react-router-dom';
import Rating from './Rating';

function ArtisanCard({ artisan }) {
  return (
    <article className="artisan-card">
      <Link
        to={`/artisan/${artisan.id_artisan}`}
        className="artisan-card__link"
      >
        <h2 className="artisan-card__name">
          {artisan.nom}
        </h2>

        <Rating note={artisan.note} />

        <p className="artisan-card__speciality">
          <strong>Spécialité :</strong> {artisan.Specialite?.nom}
        </p>

        <p className="artisan-card__location">
          <strong>Localisation :</strong> {artisan.ville}
        </p>
      </Link>
    </article>
  );
}

export default ArtisanCard;