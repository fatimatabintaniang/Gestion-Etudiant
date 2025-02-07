document.addEventListener("DOMContentLoaded", async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../connexion.html";
        return;
    }

    document.getElementById("AdminName").textContent = user.prenom + " " + user.nom;

    // Récupérer les étudiants depuis le localStorage
    let students = JSON.parse(localStorage.getItem("etudiants")) || [];//recupere les etudiants et le tableau en chaîne JSON avant de l'enregistrer.
    let studentsContainer = document.getElementById("Container");
    let editForm = document.getElementById("editForm");
    let formEdit = document.getElementById("formEdit");

    // Fonction pour afficher les étudiants
    function renderStudents() {
        studentsContainer.innerHTML = ""; // Vider le tableau avant de le remplir
        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = ` 
                <td class='py-2 px-4 border text-center'>${student.nom}</td>
                <td class='py-2 px-4 border text-center'>${student.prenom}</td>
                <td class='py-2 px-4 border text-center'>${student.email}</td>
                <td class='py-2 px-4 border text-center'>${student.telephone}</td>
                <td class='py-2 px-4 border text-center'>
                    <a href="#" class="delete-btn" data-index="${index}">
                        <i class="ri-delete-bin-line text-red-500"></i>
                    </a>
                    <a href="#" class="edit-btn" data-index="${index}">
                        <i class="ri-edit-box-fill text-blue-500"></i>
                    </a>
                </td>
            `;
            studentsContainer.appendChild(row);
        });
    }

    // Afficher la liste des étudiants
    renderStudents();

    // Suppression d'un étudiant
    studentsContainer.addEventListener("click", (event) => {
        let deleteBtn = event.target.closest(".delete-btn"); 
        if (deleteBtn) {
            event.preventDefault(); // Empêcher l'action par défaut
            let index = deleteBtn.getAttribute("data-index");
            students.splice(index, 1); // Supprimer 1 étudiant a la position index
            localStorage.setItem("etudiants", JSON.stringify(students)); // Mettre à jour le localStorage
            renderStudents(); // Mettre à jour l'affichage
        }

        // Modifier un étudiant
        let editBtn = event.target.closest(".edit-btn");
        if (editBtn) {
            event.preventDefault(); // Empêcher l'action par défaut
            let index = editBtn.getAttribute("data-index");

            // Remplir le formulaire avec les données actuelles de l'étudiant
            document.getElementById("editNom").value = students[index].nom;
            document.getElementById("editPrenom").value = students[index].prenom;
            document.getElementById("editEmail").value = students[index].email;
            document.getElementById("editTelephone").value = students[index].telephone;

            // Afficher le formulaire de modification
            editForm.classList.remove("hidden");

            // Lors de la soumission du formulaire de modification
            formEdit.onsubmit = (e) => {
                e.preventDefault(); // Empêcher la soumission par défaut

                // Mettre à jour les informations de l'étudiant
                students[index].nom = document.getElementById("editNom").value;
                students[index].prenom = document.getElementById("editPrenom").value;
                students[index].email = document.getElementById("editEmail").value;
                students[index].telephone = document.getElementById("editTelephone").value;

                // Mettre à jour le localStorage
                localStorage.setItem("etudiants", JSON.stringify(students));

                // Masquer le formulaire de modification
                editForm.classList.add("hidden");

                // Réafficher la liste des étudiants
                renderStudents();
            };
        }
    });
});

// Déconnexion
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../connexion.html";
});