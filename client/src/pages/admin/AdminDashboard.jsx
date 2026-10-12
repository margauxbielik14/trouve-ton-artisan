import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const [chargement, setChargement] = useState(true);
    const [artisans, setArtisans] = useState([]);
    const [erreurArtisans, setErreurArtisans] = useState('');
    const [recherche, setRecherche] = useState('');

    // Vérifier que l'administrateur est connecté
    useEffect(() => {
        const verifierSession = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    navigate('/admin/connexion', { replace: true });
                    return;
                }

                setChargement(false);
            } catch (error) {
                console.error('Erreur de vérification de session :', error);
                navigate('/admin/connexion', { replace: true });
            }
        };

        verifierSession();
    }, [navigate]);

    // Récupérer la liste des artisans depuis l'API
    useEffect(() => {
        const chargerArtisans = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/artisans`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Impossible de récupérer les artisans.');
                }

                const data = await response.json();

                setArtisans(data);
            } catch (error) {
                console.error('Erreur de chargement :', error);
                setErreurArtisans('Impossible de charger la liste des artisans.');
            }
        };

        chargerArtisans();
    }, []);

    // Filtrer les artisans selon la recherche
    const artisansFiltres = artisans.filter((artisan) => {
        const texteRecherche = recherche.toLowerCase().trim();

        return (
            artisan.nom.toLowerCase().includes(texteRecherche) ||
            artisan.Specialite?.nom?.toLowerCase().includes(texteRecherche) ||
            artisan.ville.toLowerCase().includes(texteRecherche)
        );
    });

    // Déconnexion de l'administrateur
    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('La déconnexion a échoué.');
            }

            navigate('/admin/connexion', { replace: true });
        } catch (error) {
            console.error('Erreur de déconnexion :', error);
            alert('Impossible de se déconnecter. Veuillez réessayer.');
        }
    };

    // Supprimer un artisan après confirmation
    const handleDelete = async (artisan) => {
        const confirmation = window.confirm(`Voulez-vous vraiment supprimer "${artisan.nom}" ?`);

        if (!confirmation) {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/artisans/${artisan.id_artisan}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            );

            if (response.status === 401 || response.status === 403) {
                navigate('/admin/connexion', { replace: true });
                return;
            }

            if (!response.ok) {
                throw new Error('Impossible de supprimer cet artisan.');
            }

            setArtisans((precedent) =>
                precedent.filter((element) => element.id_artisan !== artisan.id_artisan)
            );
        } catch (error) {
            console.error('Erreur de suppression :', error);
            window.alert(error.message);
        }
    };

    if (chargement) {
        return <p>Vérification de la connexion...</p>;
    }

    return (
        <section className="admin-dashboard">
            <h1>Gestion des artisans</h1>

            <div className="admin-dashboard__tools">
                <button
                    type="button"
                    className="admin-dashboard__add"
                    onClick={() => navigate('/admin/artisans/ajouter')}
                >
                    Ajouter un artisan
                </button>

                <input
                    type="search"
                    placeholder="Rechercher un artisan"
                    aria-label="Rechercher un artisan"
                    className="admin-dashboard__search"
                    value={recherche}
                    onChange={(event) => setRecherche(event.target.value)}
                />
            </div>

            <hr className="admin-dashboard__separator" />

            <h2>Liste des artisans</h2>
            {erreurArtisans && (
                <p role="alert" className="admin-dashboard__error">
                    {erreurArtisans}
                </p>
            )}

            <div className="admin-dashboard__table-wrapper">
                <table className="admin-dashboard__table">
                    <thead>
                        <tr>
                            <th>Artisan</th>
                            <th>Spécialité</th>
                            <th>Ville</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {artisansFiltres.length === 0 && (
                            <tr>
                                <td colSpan={5} className="admin-dashboard__empty">
                                    Aucun artisan ne correspond à votre recherche.
                                </td>
                            </tr>
                        )}

                        {artisansFiltres.map((artisan) => (
                            <tr key={artisan.id_artisan}>
                                <td>{artisan.nom}</td>
                                <td>{artisan.Specialite?.nom || '—'}</td>
                                <td>{artisan.ville}</td>
                                <td>{artisan.note}</td>
                                <td className="admin-dashboard__actions">
                                    <button
                                        type="button"
                                        aria-label={`Modifier ${artisan.nom}`}
                                        className="admin-dashboard__icon-button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/artisans/modifier/${artisan.id_artisan}`
                                            )
                                        }
                                    >
                                        <img src="/pencil.png" alt="" />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label={`Supprimer ${artisan.nom}`}
                                        className="admin-dashboard__icon-button"
                                        onClick={() => {
                                            handleDelete(artisan);
                                        }}
                                    >
                                        <img src="/recycle-bin.png" alt="" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button type="button" className="admin-dashboard__logout" onClick={handleLogout}>
                Se déconnecter
            </button>
        </section>
    );
}

export default AdminDashboard;
