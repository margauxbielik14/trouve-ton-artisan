import { useLocation } from 'react-router-dom';

function LegalPage() {
  const location = useLocation();

  const titles = {
    '/mentions-legales': 'Mentions légales',
    '/donnees-personnelles': 'Données personnelles',
    '/accessibilite': 'Accessibilité',
    '/cookies': 'Cookies'
  };

  const title = titles[location.pathname] || 'Informations légales';
  document.title = `${title} | Trouve ton artisan !`;

  return (
    <section className="legal-page">
      <span className="legal-page__marker"></span>

      <h1>{title}</h1>

      <p>Page en construction</p>
    </section>
  );
}

export default LegalPage;