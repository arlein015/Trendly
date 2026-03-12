document.querySelectorAll('.like').forEach(button => {
    button.addEventListener('click', function() {
        this.style.color = this.style.color === 'blueviolet' ? 'white' : 'blueviolet';
        // Ici on pourra ajouter plus tard l'enregistrement du like en base de données
    });
});
function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    if (input.value.trim() !== "") {
        // Créer la bulle de message
        const newMsg = document.createElement('div');
        newMsg.classList.add('msg', 'sent');
        newMsg.textContent = input.value;

        // Ajouter au chat
        chatBox.appendChild(newMsg);

        // Vider l'input et scroller en bas
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
function handleKey(e) {
    if (e.key === 'Enter') { sendMessage(); }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const chatBox = document.getElementById('chatBox');

    if (input.value.trim() !== "") {
        const now = new Date();
        const time = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');

        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg-group sent';
        msgDiv.innerHTML = `
            <div class="msg-content">${input.value}</div>
            <span class="msg-time">${time}</span>
        `;

        chatBox.appendChild(msgDiv);
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight; // Scrolle auto vers le bas
    }
}
// Gestion du lecteur vidéo automatique
const videos = document.querySelectorAll('video');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
            entry.target.currentTime = 0; // Recommencer au début quand on revient
        }
    });
}, { threshold: 0.7 }); // Se lance quand 70% de la vidéo est visible

videos.forEach(video => observer.observe(video));

// Système de Like Professionnel
function toggleLike(button) {
    button.classList.toggle('active');
    
    // Animation de pulsation
    if (button.classList.contains('active')) {
        button.style.transform = "scale(1.4)";
        setTimeout(() => button.style.transform = "scale(1)", 200);
    }
}
// Aperçu de la vidéo avant publication
const videoInput = document.getElementById('videoInput');
const videoPreview = document.getElementById('videoPreview');
const placeholder = document.querySelector('.upload-placeholder');

if(videoInput) {
    videoInput.onchange = function() {
        const file = this.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            videoPreview.src = url;
            videoPreview.hidden = false;
            placeholder.hidden = true;
        }
    };
}
// Exemple de mise à jour du solde (à lier avec ta base de données plus tard)
function updateWallet(amount) {
    const balanceElement = document.getElementById('userBalance');
    if (balanceElement) {
        let currentBalance = parseFloat(balanceElement.innerText);
        currentBalance += amount;
        balanceElement.innerText = currentBalance.toFixed(2) + " $";
    }
}
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Vérification rapide des mots de passe
    const pass = document.getElementById('reg_pass').value;
    const confirm = document.getElementById('reg_confirm').value;
    
    if (pass !== confirm) {
        alert("Les mots de passe ne correspondent pas !");
        return;
    }

    // Redirection vers la vérification à 6 chiffres
    window.location.href = 'verify.html';
});
const inputs = document.querySelectorAll('.otp-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 0 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

document.getElementById('verifyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Une fois vérifié, on envoie l'utilisateur sur le flux vidéo FLOY
    window.location.href = 'feed.html';
});
