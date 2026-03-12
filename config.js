const CONFIG = {
    APP_NAME: "Floy",
    APP_VERSION: "1.0.5",
    // Nouvelles couleurs basées sur ton logo
    THEME_COLOR_ORANGE: "#ff8c00", // L'orange vif de ton logo
    VERIFIED_COLOR_BLUE: "#0000cd", // Le bleu électrique de ton logo
    TEXT_COLOR_DARK_GRAY: "#2f4f4f", // Le gris foncé pour les éléments inactifs
    API_URL: "https://api.floy.app/v1",
    LOGGED_IN: true,
    USER_DATA: {
        username: "@createur_floy",
        isVerified: true,
        tokens: 1250
    }
};

// Fonction globale pour le badge bleu
function getBadge() {
    return CONFIG.USER_DATA.isVerified ? '<i class="fas fa-check-circle verified-badge"></i>' : '';
}
