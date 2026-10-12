import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const [chargement, setChargement] = useState(false);

    // Vérifier les identifiants et connecter l'administrateur
    const handleSubmit = async (event) => {
        event.preventDefault();

        setErreur('');
        setChargement(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    mot_de_passe: motDePasse
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErreur(data.message || 'La connexion a échoué.');
                return;
            }

            navigate('/admin/dashboard', { replace: true });
        } catch (error) {
            console.error('Erreur de connexion :', error);
            setErreur('Impossible de contacter le serveur.');
        } finally {
            setChargement(false);
        }
    };

    return (
        <section className="admin-login">
            <div className="admin-login__container">
                <h1>ESPACE ADMINISTRATEUR</h1>

                <form id="admin-login-form" className="admin-login__form" onSubmit={handleSubmit}>
                    <h2>CONNEXION</h2>

                    <div className="admin-login__field">
                        <label htmlFor="admin-email">Adresse e-mail</label>
                        <input
                            type="email"
                            id="admin-email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="admin-login__field">
                        <label htmlFor="admin-password">Mot de passe</label>
                        <input
                            type="password"
                            id="admin-password"
                            name="mot_de_passe"
                            value={motDePasse}
                            onChange={(event) => setMotDePasse(event.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </form>

                {erreur && (
                    <p className="admin-login__error" role="alert">
                        {erreur}
                    </p>
                )}

                <div className="admin-login__actions">
                    <button type="submit" form="admin-login-form" disabled={chargement}>
                        {chargement ? 'Connexion...' : 'Se connecter'}
                    </button>

                    <Link to="/">Retour au site</Link>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;
