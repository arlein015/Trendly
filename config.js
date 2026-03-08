// Configuration Threndly
const CONFIG = {
    firebase: {
        databaseURL: "https://trendly-fca7c-default-rtdb.firebaseio.com",
        projectId: "trendly-fca7c"
    },
    emailjs: {
        publicKey: "TON_ID_PUBLIC", // À copier depuis EmailJS
        serviceId: "TON_SERVICE_ID",
        templateId: "TON_TEMPLATE_ID"
    }
};

// Initialisation automatique
firebase.initializeApp(CONFIG.firebase);
const db = firebase.database();
emailjs.init(CONFIG.emailjs.publicKey);
