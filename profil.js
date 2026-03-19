import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Fonction pour charger les morceaux de HTML (modules)
async function loadComponent(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = 'connexion.html';
        return;
    }

    // On charge les composants
    await Promise.all([
        loadComponent('header-module', 'profile_header.html'),
        loadComponent('stats-module', 'profile_stats.html'),
        loadComponent('tabs-module', 'profile_tabs.html'),
        loadComponent('grid-module', 'profile_grid.html')
    ]);

    // Une fois chargés, on lance la data
    console.log("Profil de " + user.displayName + " chargé !");
    // Appelle ici tes fonctions loadHeader(user.uid), etc.
});
