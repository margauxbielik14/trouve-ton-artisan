import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function AdminArtisanEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [artisan, setArtisan] = useState(null);
    const [erreur, setErreur] = useState('');
    const [chargement, setChargement] = useState(true);

    const [formulaire, setFormulaire] = useState({
        nom: '',
        note: '',
        ville: '',
        a_propos: '',
        email: '',
        site_web: '',
        top: false,
        id_specialite: ''
    });

    const [categorieSelectionnee, setCategorieSelectionnee] = useState('');

    const [categories, setCategories] = useState([]);
    const [specialites, setSpecialites] = useState([]);
    const [enregistrement, setEnregistrement] = useState(false);

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

    useEffect(() => {
        if (chargement) return;

        const recupererArtisan = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/artisans`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Impossible de récupérer les artisans.');
                }

                const artisans = await response.json();

                const artisanTrouve = artisans.find((element) => element.id_artisan === Number(id));

                if (!artisanTrouve) {
                    throw new Error('Artisan introuvable.');
                }

                setArtisan(artisanTrouve);

                setFormulaire({
                    nom: artisanTrouve.nom ?? '',
                    note: artisanTrouve.note ?? '',
                    ville: artisanTrouve.ville ?? '',
                    a_propos: artisanTrouve.a_propos ?? '',
                    email: artisanTrouve.email ?? '',
                    site_web: artisanTrouve.site_web ?? '',
                    top: Boolean(artisanTrouve.top),
                    id_specialite: artisanTrouve.id_specialite ?? ''
                });

                setCategorieSelectionnee(String(artisanTrouve.Specialite?.id_categorie ?? ''));
            } catch (error) {
                console.error('Erreur lors du chargement de l’artisan :', error);
                setErreur(error.message);
            }
        };

        recupererArtisan();
    }, [id, chargement]);

    useEffect(() => {
        if (chargement) return;

        const recupererListes = async () => {
            try {
                const [responseCategories, responseSpecialites] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/categories`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/specialites`)
                ]);

                if (!responseCategories.ok || !responseSpecialites.ok) {
                    throw new Error('Impossible de récupérer les catégories et spécialités.');
                }

                const donneesCategories = await responseCategories.json();
                const donneesSpecialites = await responseSpecialites.json();

                setCategories(donneesCategories);
                setSpecialites(donneesSpecialites);
            } catch (error) {
                console.error('Erreur de chargement des listes :', error);
                setErreur(error.message);
            }
        };

        recupererListes();
    }, [chargement]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormulaire((precedent) => ({
            ...precedent,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCategorieChange = (event) => {
        setCategorieSelectionnee(event.target.value);

        setFormulaire((precedent) => ({
            ...precedent,
            id_specialite: ''
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setEnregistrement(true);
        setErreur('');

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/artisans/${id}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...formulaire,
                        note: Number(formulaire.note),
                        id_specialite: Number(formulaire.id_specialite)
                    })
                }
            );

            if (response.status === 401 || response.status === 403) {
                navigate('/admin/connexion', { replace: true });
                return;
            }

            if (!response.ok) {
                const donnees = await response.json().catch(() => ({}));

                throw new Error(
                    donnees.message || donnees.error || 'Impossible de modifier cet artisan.'
                );
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Erreur de modification :', error);
            setErreur(error.message);
        } finally {
            setEnregistrement(false);
        }
    };

    if (chargement) {
        return <p>Vérification de la connexion...</p>;
    }

    return (
        <section className="admin-artisan-form">
            <h1 className="admin-artisan-form__title">Modifier un artisan</h1>

            <p>Modifiez les informations de l'artisan ci-dessous.</p>

            {erreur && <p role="alert">{erreur}</p>}

            {artisan && (
                <form className="admin-artisan-form__fields" onSubmit={handleSubmit}>
                    <div className="admin-artisan-form__field">
                        <label htmlFor="nom">Nom de l'artisan</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formulaire.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="categorie">Catégorie</label>
                        <select
                            id="categorie"
                            value={categorieSelectionnee}
                            onChange={handleCategorieChange}
                            required
                        >
                            <option value="">Sélectionner une catégorie</option>

                            {categories.map((categorie) => (
                                <option key={categorie.id_categorie} value={categorie.id_categorie}>
                                    {categorie.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="id_specialite">Spécialité</label>
                        <select
                            id="id_specialite"
                            name="id_specialite"
                            value={formulaire.id_specialite}
                            onChange={handleChange}
                            disabled={!categorieSelectionnee}
                            required
                        >
                            <option value="">Sélectionner une spécialité</option>

                            {specialites
                                .filter(
                                    (specialite) =>
                                        specialite.id_categorie === Number(categorieSelectionnee)
                                )
                                .map((specialite) => (
                                    <option
                                        key={specialite.id_specialite}
                                        value={specialite.id_specialite}
                                    >
                                        {specialite.nom}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="ville">Ville</label>
                        <input
                            type="text"
                            id="ville"
                            name="ville"
                            value={formulaire.ville}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="note">Note</label>
                        <input
                            type="number"
                            id="note"
                            name="note"
                            min="0"
                            max="5"
                            step="0.1"
                            value={formulaire.note}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formulaire.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="site_web">Site internet</label>
                        <input
                            type="url"
                            id="site_web"
                            name="site_web"
                            value={formulaire.site_web}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="admin-artisan-form__field">
                        <label htmlFor="a_propos">À propos</label>
                        <textarea
                            id="a_propos"
                            name="a_propos"
                            rows="6"
                            value={formulaire.a_propos}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="admin-artisan-form__checkbox">
                        <label htmlFor="top">
                            <input
                                type="checkbox"
                                id="top"
                                name="top"
                                checked={formulaire.top}
                                onChange={handleChange}
                            />
                            Définir comme l'artisan du mois
                        </label>
                    </div>

                    <div className="admin-artisan-form__actions">
                        <Link to="/admin/dashboard" className="admin-artisan-form__cancel">
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            className="admin-artisan-form__submit"
                            disabled={enregistrement}
                        >
                            {enregistrement ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}

export default AdminArtisanEdit;
