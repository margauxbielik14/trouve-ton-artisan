import { Link } from 'react-router-dom';

function NotFound() {
    document.title = 'Page non trouvée | Trouve ton artisan !';

  return (
    <section className="not-found">
      <div className="not-found__content">
        <span className="not-found__marker"></span>

        <h1>404</h1>

        <h2>Page non trouvée</h2>

        <p>
          La page que vous avez demandée n’existe pas ou n’est plus disponible.
        </p>

        <Link to="/" className="not-found__button">
          Retour à la page d’accueil
        </Link>
      </div>

      <div className="not-found__image">
        <img
          src="/404.jpg"
          alt="Illustration d’une page non trouvée"
        />
      </div>
    </section>
  );
}

export default NotFound;