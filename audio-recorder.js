// Initialisation des variables globales pour le module
let mediaRecorder; // L'objet principal de l'API MediaRecorder
let audioChunks = []; // Tableau pour stocker les morceaux de données audio

// 1. Démarrer l'enregistrement
async function startRecording() {
    try {
        // Demande l'accès au micro de l'utilisateur
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Création du recorder
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        // Événement : stockage des données dès qu'elles sont disponibles
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        // Événement : quand l'enregistrement s'arrête
        mediaRecorder.onstop = () => {
            // Conversion des morceaux en un seul fichier audio (Blob)
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            
            // Conversion en Base64 pour la sauvegarde (localStorage)
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64Audio = reader.result;
                // Ici, tu appelles ta fonction pour sauvegarder le message
                saveVocalMessage(base64Audio);
            };
        };

        mediaRecorder.start();
        console.log("Enregistrement démarré...");
    } catch (err) {
        console.error("Erreur d'accès au micro : ", err);
        alert("Impossible d'accéder au micro.");
    }
}

// 2. Arrêter l'enregistrement
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("Enregistrement arrêté.");
    }
}
