document.querySelectorAll('.like').forEach(button => {
    button.addEventListener('click', function() {
        this.style.color = this.style.color === 'blueviolet' ? 'white' : 'blueviolet';
        // Ici on pourra ajouter plus tard l'enregistrement du like en base de données
    });
});
