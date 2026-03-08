// --- AUTHENTIFICATION ---
function logout() {
    localStorage.removeItem('threndly_user');
    window.location.href = "index.html";
}

function envoyerCode() {
    const email = document.getElementById('reg-mail').value;
    const user = document.getElementById('reg-user').value || "User" + Math.floor(Math.random()*100);

    if(!email.includes('@')) return alert("Email invalide");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('temp_code', code);
    localStorage.setItem('temp_user', user); // On garde le pseudo temporairement

    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, {
        email: email,
        user_name: user,
        verification_code: code
    }).then(() => {
        window.location.href = "verify.html";
    });
}

function verifierCode() {
    const tape = document.getElementById('v-code').value;
    const attendu = localStorage.getItem('temp_code');

    if(tape === attendu) {
        // Succès : on définit l'utilisateur final
        localStorage.setItem('threndly_user', localStorage.getItem('temp_user'));
        window.location.href = "chat.html";
    } else {
        if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
        alert("Code incorrect !");
    }
}

// --- LOGIQUE DU CHAT (REALTIME) ---
function sendMessage() {
    const input = document.getElementById('msg-in');
    const message = input.value.trim();
    const user = localStorage.getItem('threndly_user');

    if (message !== "") {
        // Envoi à Firebase
        db.ref("messages").push({
            sender: user,
            text: message,
            timestamp: Date.now()
        });
        input.value = ""; // Vide le champ
    }
}

function loadMessages() {
    const list = document.getElementById('msg-list');
    const currentUser = localStorage.getItem('threndly_user');

    // Écoute les nouveaux messages en direct
    db.ref("messages").limitToLast(50).on("child_added", (snapshot) => {
        const data = snapshot.val();
        const div = document.createElement('div');
        
        // Style intelligent : droite si c'est moi, gauche si c'est un autre
        const isMe = data.sender === currentUser;
        div.className = `msg-container ${isMe ? 'me' : 'other'}`;
        
        div.innerHTML = `
            <span class="sender-name">${data.sender}</span>
            <div class="bubble">${data.text}</div>
        `;
        
        list.appendChild(div);
        list.scrollTop = list.scrollHeight; // Scroll auto vers le bas
    });
}

// Gestion de la touche Entrée
function handleEnter(e) {
    if (e.key === "Enter") sendMessage();
}
