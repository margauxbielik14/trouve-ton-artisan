import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ArtisansList from './pages/ArtisansList';
import ArtisanDetail from './pages/ArtisanDetail';
import LegalPage from './pages/LegalPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/categorie/:id"
            element={<ArtisansList />}
          />

          <Route
            path="/recherche"
            element={<ArtisansList />}
          />

          <Route
            path="/artisan/:id"
            element={<ArtisanDetail />}
          />

          <Route
            path="/mentions-legales"
            element={<LegalPage />}
          />

          <Route
            path="/donnees-personnelles"
            element={<LegalPage />}
          />

          <Route
            path="/accessibilite"
            element={<LegalPage />}
          />

          <Route
            path="/cookies"
            element={<LegalPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;