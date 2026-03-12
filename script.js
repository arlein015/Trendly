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
