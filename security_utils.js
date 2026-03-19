// security_utils.js
export const SecurityUtils = {
    // Nettoyer le texte pour éviter les failles XSS (scripts malveillants)
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    // Valider la force d'un mot de passe
    isPasswordStrong(password) {
        return password.length >= 8; // Tu peux ajouter des règles plus strictes ici
    }
};
