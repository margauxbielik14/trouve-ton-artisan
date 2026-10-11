const validateArtisan = (data) => {
    const errors = [];

    // Vérifier les champs texte obligatoires
const champsObligatoires = {
    nom: 150,
    ville: 100,
    a_propos: 5000,
    email: 255
};

for (const [champ, longueurMax] of Object.entries(champsObligatoires)) {
    const valeur = data[champ];

    if (typeof valeur !== 'string' || !valeur.trim()) {
        errors.push(`Le champ ${champ} est obligatoire.`);
    } else if (valeur.length > longueurMax) {
        errors.push(
            `Le champ ${champ} ne doit pas dépasser ${longueurMax} caractères.`
        );
    }
}

// Vérifier le format de l'adresse e-mail
if (
    typeof data.email === 'string' &&
    data.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
) {
    errors.push('Veuillez saisir une adresse e-mail valide.');
}

    const note = data.note;

    if (
        typeof note !== 'number' ||
        !Number.isFinite(note) ||
        note < 0 ||
        note > 5
    ) {
        errors.push('La note doit être un nombre compris entre 0 et 5.');
    }

    // Vérifier l'identifiant de la spécialité
if (
    !Number.isInteger(data.id_specialite) ||
    data.id_specialite <= 0
) {
    errors.push('Veuillez sélectionner une spécialité valide.');
}

// Vérifier le statut top
if (typeof data.top !== 'boolean') {
    errors.push('Le champ top doit être un booléen (true ou false).');
}

// Vérifier le site web facultatif
if (data.site_web !== null && data.site_web !== undefined && data.site_web !== '') {
    if (typeof data.site_web !== 'string' || data.site_web.length > 255) {
        errors.push('Le site web doit être une adresse de 255 caractères maximum.');
    } else {
        try {
            const url = new URL(data.site_web);

            if (!['http:', 'https:'].includes(url.protocol)) {
                errors.push('Le site web doit utiliser HTTP ou HTTPS.');
            }
        } catch {
            errors.push('Veuillez saisir une URL valide pour le site web.');
        }
    }
}

    return errors;
};

module.exports = validateArtisan;