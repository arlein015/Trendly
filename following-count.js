// Fonction pour récupérer le nombre actuel
function getFollowingCount() {
    return parseInt(localStorage.getItem('floy_following_count')) || 0;
}

// Fonction pour ajouter +1
function incrementFollowing() {
    let count = getFollowingCount();
    count++;
    localStorage.setItem('floy_following_count', count);
    return count;
}

// Fonction pour retirer -1
function decrementFollowing() {
    let count = getFollowingCount();
    if (count > 0) count--;
    localStorage.setItem('floy_following_count', count);
    return count;
}

// Fonction pour initialiser (si c'est la première fois)
if (localStorage.getItem('floy_following_count') === null) {
    localStorage.setItem('floy_following_count', '124'); // Chiffre de départ par défaut
}
