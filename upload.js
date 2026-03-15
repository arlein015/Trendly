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
                // Calcule la taille en Mo pour l'affichage de l'erreur
                const fileSizeMo = (file.size / 1024 / 1024).toFixed(2);
                return reject(`Le fichier est trop lourd (${fileSizeMo} Mo). Max : 5 Mo.`);
            }

            const reader = new FileReader();

            // Événement : quand la lecture est terminée avec succès
            reader.onload = (e) => {
                const fileData = e.target.result; // Les données en Base64
                const fileType = file.type;       // Le type MIME (ex: image/png)
                
                // 2. Détermination de la catégorie
                let category = 'doc'; // Par défaut, on considère que c'est un document
                
                if (fileType.startsWith('image/')) {
                    category = 'image';
                } else if (fileType.startsWith('video/')) {
                    category = 'video';
                }

                // 3. Renvoi de l'objet formaté au chat
                resolve({
                    content: fileData,        // Les données encodées
                    fileName: file.name,      // Nom d'origine (ex: photo.jpg)
                    type: category,           // 'image', 'video' ou 'doc'
                    mime: fileType,           // Type MIME réel
                    size: file.size           // Taille en octets
                });
            };

            // Événement : en cas d'erreur technique lors de la lecture
            reader.onerror = () => {
                reject("Erreur technique lors de la lecture du fichier.");
            };

            // Lance la lecture du fichier et le convertit en Base64 (Data URL)
            reader.readAsDataURL(file);
        });
    }
};
