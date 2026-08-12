import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Header() {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        fetch(`${API_URL}/api/categories`)
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des catégories :', error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const searchValue = search.trim();
      
        if (searchValue) {
          navigate(`/recherche?search=${encodeURIComponent(searchValue)}`);
          setSearch('');
        }
      };
  
      return (
        <header className="site-header">
          <div className="site-header__top">
            <Link to="/" className="site-header__logo-link">
              <img
                src="/Logo.png"
                alt="Trouve ton artisan !"
                className="site-header__logo"
                Width="1735"
                Height="979"
              />
            </Link>
      
            <button
  type="button"
  className="site-header__menu-button"
  aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
  aria-expanded={menuOpen}
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>
          </div>
      
          <form
            className="site-header__search"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search" className="visually-hidden">
  Rechercher un artisan
</label>
      
            <div className="site-header__search-row">
              <input
                type="search"
                id="search"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un artisan"
              />
      
      <button type="submit" aria-label="Rechercher">
  <img
    src="/search.png"
    alt=""
    className="site-header__search-icon"
    width="32"
    height="32"
  />
</button>
            </div>
          </form>
      
          <nav
  className={`site-header__nav ${
    menuOpen ? 'site-header__nav--open' : ''
  }`}
>
  {categories.map((categorie) => (
    <Link
      key={categorie.id_categorie}
      to={`/categorie/${categorie.id_categorie}`}
      onClick={() => setMenuOpen(false)}
    >
      {categorie.nom}
    </Link>
  ))}
</nav>
        </header>
      );
    }
export default Header;