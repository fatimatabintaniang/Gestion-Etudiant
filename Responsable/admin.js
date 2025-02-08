document.addEventListener("DOMContentLoaded", async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../connexion.html";
        return;
    }

    document.getElementById("AdminName").textContent = `${user.prenom} ${user.nom}`;

    // Vérification et récupération des classes depuis le localStorage
    let classes = JSON.parse(localStorage.getItem("Classes"));

    let classeContainer = document.getElementById("Container");
    let editForm = document.getElementById("editForm");
    let formEdit = document.getElementById("formEdit");


    // Fonction pour afficher les classes
    function renderClasses() {
        classeContainer.innerHTML = "";
        classes.forEach((classe, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td class='py-2 px-4 border text-center'>${classe.niveau}</td>
                <td class='py-2 px-4 border text-center'>${classe.cours}</td>
                <td class='py-2 px-4 border text-center'>
                    <a href="#" class="delete-btn" data-index="${index}">
                        <i class="ri-delete-bin-line text-red-500"></i>
                    </a>
                    <a href="#" class="edit-btn" data-index="${index}">
                        <i class="ri-edit-box-fill text-blue-500"></i>
                    </a>
                </td>
            `;
            classeContainer.appendChild(row);
        });
    }

    // Afficher la liste des classes
    renderClasses();

    // Gestion des événements de suppression et modification
    classeContainer.addEventListener("click", (event) => {
        let target = event.target.closest("a");
        if (!target) return;

        event.preventDefault(); // Empêcher l'action par défaut
        let index = target.getAttribute("data-index");

        if (target.classList.contains("delete-btn")) {
            // Suppression d'une classe
            classes.splice(index, 1);
            localStorage.setItem("Classes", JSON.stringify(classes));
            renderClasses();
        } else if (target.classList.contains("edit-btn")) {
            // Modifier une classe
            document.getElementById("editNiveau").value = classes[index].niveau;
            document.getElementById("editCours").value = classes[index].cours;
            editForm.classList.remove("hidden");

            // Gestion de la soumission du formulaire de modification
            formEdit.onsubmit = (e) => {
                e.preventDefault();
                classes[index].niveau = document.getElementById("editNiveau").value;
                classes[index].cours = document.getElementById("editCours").value;
                localStorage.setItem("Classes", JSON.stringify(classes));
                editForm.classList.add("hidden");
                renderClasses();
            };
        }
    });
});

// Déconnexion
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../connexion.html";
});
