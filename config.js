const CONFIG = {
    firebase: {
        apiKey: "TON_API_KEY",
        authDomain: "trendly-fca7c.firebaseapp.com",
        databaseURL: "https://trendly-fca7c-default-rtdb.firebaseio.com",
        projectId: "trendly-fca7c",
        storageBucket: "trendly-fca7c.appspot.com",
        messagingSenderId: "TON_ID",
        appId: "TON_APP_ID"
    },
    emailjs: {
        publicKey: "TON_PUBLIC_KEY",
        serviceId: "service_id",
        templateId: "template_id"
    }
};

// Initialisation
if (!firebase.apps.length) {
    firebase.initializeApp(CONFIG.firebase);
}
const db = firebase.database();
const auth = firebase.auth();
emailjs.init(CONFIG.emailjs.publicKey);
