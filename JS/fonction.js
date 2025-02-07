document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    let valid = true;

    // Validation de l'email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.classList.remove("hidden");
        valid = false;
    } else {
        emailError.classList.add("hidden");
    }

    // Validation du mot de passe (minimum 6 caractères)
    if (password.length < 6) {
        passwordError.classList.remove("hidden");
        valid = false;
    } else {
        passwordError.classList.add("hidden");
    }

    if (!valid) return;

    try {
        let response = await fetch('./data.json'); // Charger le fichier JSON
        let data = await response.json();

        let user = null;

        // Vérifier si l'utilisateur est un étudiant
        user = data.Etudiants.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./Etudiant/etudiant.html"; // Redirection vers l'interface étudiant
            return;
        }

        // Vérifier si l'utilisateur est un professeur
        user = data.Professeurs.find(u => u.email === email && u.password === password);
        if (user) {
            window.location.href = "./Prof/professeur.html"; // Redirection vers l'interface professeur
            return;
        }

        // Vérifier si l'utilisateur est un administrateur
        user = data.Administrateurs.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "./Responsable/admin.html"; // Redirection vers l'interface administrateur
            return;
        }

        // Si aucun utilisateur trouvé, afficher un message d'erreur
        alert("Identifiants incorrects !");
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
});
