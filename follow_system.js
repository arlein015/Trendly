// follow_system.js
import { db, auth } from './firebase-config.js';
import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const FollowSystem = {
    // Suivre un utilisateur
    async follow(targetUid) {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const followId = `${currentUser.uid}_${targetUid}`;
        await setDoc(doc(db, "followers", followId), {
            followerId: currentUser.uid,
            followingId: targetUid,
            timestamp: serverTimestamp()
        });
    },

    // Ne plus suivre
    async unfollow(targetUid) {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const followId = `${currentUser.uid}_${targetUid}`;
        await deleteDoc(doc(db, "followers", followId));
    },

    // Vérifier si on suit déjà
    async isFollowing(targetUid) {
        const currentUser = auth.currentUser;
        if (!currentUser) return false;

        const followId = `${currentUser.uid}_${targetUid}`;
        const docSnap = await getDoc(doc(db, "followers", followId));
        return docSnap.exists();
    }
};
