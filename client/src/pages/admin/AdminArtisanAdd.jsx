import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminArtisanAdd() {
    const navigate = useNavigate();
    const [chargement, setChargement] = useState(true);

    const [specialites, setSpecialites] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState('');

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

    const [enregistrement, setEnregistrement] = useState(false);
    const [erreur, setErreur] = useState('');

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
        const recupererSpecialites = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/specialites`);

                if (!response.ok) {
                    throw new Error('Impossible de récupérer les spécialités.');
                }

                const data = await response.json();

                setSpecialites(data);
            } catch (error) {
                console.error('Erreur lors du chargement des spécialités :', error);
            }
        };

        recupererSpecialites();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormulaire((ancienFormulaire) => ({
            ...ancienFormulaire,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErreur('');
        setEnregistrement(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/artisans`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formulaire,
                    note: Number(formulaire.note),
                    id_specialite: Number(formulaire.id_specialite)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    navigate('/admin/connexion', { replace: true });
                    return;
                }

                throw new Error(
                    data.errors?.join(' ') || data.message || "Impossible d'ajouter l'artisan."
                );
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'artisan :", error);
            setErreur(error.message);
        } finally {
            setEnregistrement(false);
        }
    };

    useEffect(() => {
        const recupererCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`);

                if (!response.ok) {
                    throw new Error('Impossible de récupérer les catégories.');
                }

                const data = await response.json();

                setCategories(data);
            } catch (error) {
                console.error('Erreur lors du chargement des catégories :', error);
            }
        };

        recupererCategories();
    }, []);

    if (chargement) {
        return <p>Vérification de la connexion...</p>;
    }

    return (
        <section className="admin-artisan-form">
            <h1 className="admin-artisan-form__title">Ajouter un artisan</h1>

            <p>Remplissez les informations ci-dessous pour ajouter un nouvel artisan.</p>

            <form className="admin-artisan-form__fields" onSubmit={handleSubmit}>
                <div className="admin-artisan-form__field">
                    <label htmlFor="nom">Nom de l'artisan *</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formulaire.nom}
                        onChange={handleChange}
                        maxLength={150}
                        required
                    />
                </div>

                <div className="admin-artisan-form__field">
                    <label htmlFor="categorie">Catégorie *</label>

                    <select
                        id="categorie"
                        name="categorie"
                        value={categorieSelectionnee}
                        onChange={(event) => {
                            setCategorieSelectionnee(event.target.value);

                            setFormulaire((ancienFormulaire) => ({
                                ...ancienFormulaire,
                                id_specialite: ''
                            }));
                        }}
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
                    <label htmlFor="specialite">Spécialité *</label>

                    <select
                        id="specialite"
                        name="id_specialite"
                        value={formulaire.id_specialite}
                        onChange={handleChange}
                        required
                        disabled={!categorieSelectionnee}
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
                    <label htmlFor="ville">Ville *</label>
                    <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={formulaire.ville}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
                </div>

                <div className="admin-artisan-form__field">
                    <label htmlFor="note">Note *</label>
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
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formulaire.email}
                        onChange={handleChange}
                        maxLength={255}
                        required
                    />
                </div>

                <div className="admin-artisan-form__field">
                    <label htmlFor="site_web">Site internet</label>
                    <input
                        type="url"
                        id="site_web"
                        name="site_web"
                        placeholder="https://exemple.fr"
                        value={formulaire.site_web}
                        onChange={handleChange}
                        maxLength={255}
                    />
                </div>

                <div className="admin-artisan-form__field">
                    <label htmlFor="a_propos">À propos *</label>
                    <textarea
                        id="a_propos"
                        name="a_propos"
                        value={formulaire.a_propos}
                        onChange={handleChange}
                        maxLength={5000}
                        rows={5}
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

                {erreur && (
                    <p role="alert" className="admin-artisan-form__error">
                        {erreur}
                    </p>
                )}

                <div className="admin-artisan-form__actions">
                    <Link to="/admin/dashboard" className="admin-artisan-form__cancel">
                        Annuler
                    </Link>

                    <button
                        type="submit"
                        className="admin-artisan-form__submit"
                        disabled={enregistrement}
                    >
                        {enregistrement ? 'Enregistrement...' : "Ajouter l'artisan"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AdminArtisanAdd;
