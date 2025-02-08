// Sélectionner le formulaire et ajouter un événement de soumission
const formAjout = document.getElementById('formAjout');

formAjout.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher la soumission par défaut

    // Récupérer les valeurs du formulaire
    const niveau = document.getElementById('niveau').value;
    const cours = document.getElementById('cours').value;

    // Créer un objet étudiant
    const nouvelClasse = {
        niveau: niveau,
        cours: cours,
    };

     // Récupérer les classes depuis le localStorage ou initialiser un tableau vide
     let classes = JSON.parse(localStorage.getItem('Classes')) || [];

    // Ajouter le nouvel étudiant
    classes.push(nouvelClasse);

  // Sauvegarder les données mises à jour dans localStorage
  localStorage.setItem('Classes', JSON.stringify(classes));

    // Rediriger vers la page admin (tableau de bord)
    window.location.href = './admin.html';
});
