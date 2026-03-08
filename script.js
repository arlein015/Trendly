// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            
            // Simulation de connexion
            console.log("Connexion en cours vers Threndly...");
            
            // Redirection vers la page de chat
            window.location.href = 'chat.html';
        });
    }
});
