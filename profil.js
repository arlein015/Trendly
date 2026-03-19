import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

async function injectModule(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            console.warn(`⚠️ Module manquant : ${file}. Vérifie qu'il est bien sur GitHub.`);
            return false; 
        }
        const html = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
            return true;
        }
    } catch (e) { 
        console.error("Erreur injection:", e);
        return false;
    }
}

onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = 'connexion.html'; return; }

    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('id') || user.uid;

    // On attend que les injections soient finies
    const results = await Promise.all([
        injectModule('header-module', 'profile_header.html'),
        injectModule('stats-module', 'profile_stats.html'),
        injectModule('tabs-module', 'profile_tabs.html'),
        injectModule('grid-module', 'profile_grid.html'),
        injectModule('modal-module', 'profile_edit_modal.html')
    ]);

    // SECURITÉ : On ne lance les fonctions que si l'élément existe vraiment
    setTimeout(() => {
        if(document.getElementById('p-username') && window.loadHeader) {
            window.loadHeader(profileId, user.uid);
        }
        if(document.getElementById('s-posts') && window.loadStats) {
            window.loadStats(profileId);
        }
        if(window.loadGrid) {
            window.loadGrid('posts', profileId);
        }

        // FORCE le retrait du chargement même s'il y a une petite erreur
        const loader = document.getElementById('main-loader');
        if(loader) loader.style.display = 'none';
    }, 500); 
});
