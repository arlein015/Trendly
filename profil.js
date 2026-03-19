import { db, auth } from './firebase-config.js';
import { doc, setDoc, deleteDoc, getDoc, onSnapshot, collection, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Fonction pour gérer le bouton Suivre
window.toggleFollow = async (targetUid) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert("Connecte-toi pour suivre ce profil !");
        return;
    }

    if (currentUser.uid === targetUid) return; // On ne peut pas se suivre soi-même

    const followRef = doc(db, "followers", `${currentUser.uid}_${targetUid}`);
    const followSnap = await getDoc(followRef);

    if (followSnap.exists()) {
        // Si on suit déjà -> On se désabonne
        await deleteDoc(followRef);
        console.log("Désabonné !");
    } else {
        // Si on ne suit pas -> On s'abonne
        await setDoc(followRef, {
            followerId: currentUser.uid,   // Moi
            followingId: targetUid,        // Lui
            createdAt: new Date()
        });
        console.log("Abonné !");
    }
};

// Fonction pour écouter l'état du bouton en temps réel
window.listenToFollowStatus = (targetUid, currentUid) => {
    const followRef = doc(db, "followers", `${currentUid}_${targetUid}`);
    
    onSnapshot(followRef, (doc) => {
        const btn = document.getElementById('follow-btn');
        if (!btn) return;

        if (doc.exists()) {
            btn.innerText = "Abonné";
            btn.style.background = "#262626"; // Gris foncé quand on est déjà abonné
            btn.style.color = "white";
        } else {
            btn.innerText = "Suivre";
            btn.style.background = "#FF7A1A"; // Orange quand on ne suit pas
            btn.style.color = "white";
        }
    });
};
