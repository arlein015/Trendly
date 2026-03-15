/**
 * MODULE UPLOAD - Gestion centralisée des médias (Images, Vidéos, Docs)
 * Ce module transforme les fichiers en Base64 et les catégorise.
 */

const UploadModule = {
    // Configuration : Limite de taille (ex: 5 Mo pour le localStorage)
    MAX_SIZE: 5 * 1024 * 1024,

    /**
     * Traite un fichier sélectionné
     * @param {File} file - Le fichier brut provenant de l'input
     * @returns {Promise} - Objet contenant le contenu et les métadonnées
     */
    processFile: function(file) {
        return new Promise((resolve, reject) => {
            // 1. Vérification de la taille
            if (file.size > this.MAX_SIZE) {
                return reject(`Le fichier est trop lourd (${(file.size / 1024 / 1024).toFixed(2)} Mo). Max : 5 Mo.`);
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const fileData = e.target.result;
                const fileType = file.type;
                
                // 2. Détermination de la catégorie
                let category = 'doc'; 
                if (fileType.startsWith('image/')) {
                    category = 'image';
                } else if (fileType.startsWith('video/')) {
                    category = 'video';
                }

                // 3. Renvoi de l'objet formaté
                resolve({
                    content: fileData,        // Les données en Base64
                    fileName: file.name,      // Nom d'origine (ex: photo.jpg)
                    type: category,           // 'image', 'video' ou 'doc'
                    mime: fileType            // Type MIME réel (ex: image/png)
                });
            };

            reader.onerror = () => {
                reject("Erreur technique lors de la lecture du fichier.");
            };

            // Lecture du fichier
            reader.readAsDataURL(file);
        });
    }
};
