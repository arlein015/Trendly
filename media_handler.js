// media_handler.js
import { storage, db, auth } from './firebase-config.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const MediaHandler = {
    // Fonction pour compresser l'image (Canvas)
    async compressImage(file, maxWidth = 400) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const scale = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scale;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 0.8); // Qualité 80%
                };
            };
        });
    },

    // Envoyer la photo de profil vers Firebase Storage
    async uploadProfilePicture(file) {
        const user = auth.currentUser;
        if (!user) throw new Error("Utilisateur non connecté");

        // 1. Compression
        const compressedBlob = await this.compressImage(file);

        // 2. Chemin dans Storage : avatars/UID.jpg
        const storageRef = ref(storage, `avatars/${user.uid}.jpg`);
        
        // 3. Upload
        const snapshot = await uploadBytes(storageRef, compressedBlob);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // 4. Mise à jour de Firestore
        await updateDoc(doc(db, "users", user.uid), {
            avatarUrl: downloadURL
        });

        return downloadURL;
    }
};
