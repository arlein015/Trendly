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
