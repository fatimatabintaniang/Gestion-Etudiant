// Sélectionner le formulaire et ajouter un événement de soumission
const formAjout = document.getElementById('formAjout');

formAjout.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher la soumission par défaut

    // Récupérer les valeurs du formulaire
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;

    // Créer un objet étudiant
    const nouvelEtudiant = {
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone
    };

    // Vérifier s'il y a déjà des étudiants dans localStorage
    let etudiants = JSON.parse(localStorage.getItem('etudiants')) || [];

    // Ajouter le nouvel étudiant
    etudiants.push(nouvelEtudiant);

    // Sauvegarder les données mises à jour dans localStorage
    localStorage.setItem('etudiants', JSON.stringify(etudiants));

    // Rediriger vers la page admin (tableau de bord)
    window.location.href = './admin.html';
});
