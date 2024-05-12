//1) selectionner le conteneur principal
const container = document.querySelector('.container');

//2) définir une classe Tache vu que c'est un toDoList
class Tache {
    constructor(tache, date) {
        this.tache = tache;
        this.date = date
    }
    //2.1) définir une méthode pour le  message Alert
    showAlert(message, className) {
        // Je crée une div
        const alert = document.createElement('div');
        // J'ajoute la class alert + une autre class (succes ou error qui changera la couleur de fond)
        alert.className = `alert ${className}`;
        // J'ajoute le contenu de la div
        alert.innerHTML = message;
        // Je place la div juste au dessus du form
        container.insertBefore(alert, todoForm);

        // Je retire la div que j'ai crée au bout de 3 secondes
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }
    //2.2) définir une méthode pour ajouter une nouvelle tâche à ma liste existante
    addTaskToList() {
        const list = document.querySelector('.tache-list'); // Balise tbody
        const row = document.createElement('tr'); // balise TR

        // Je mets le contenu (balises TD et bouton croix) dans ma balise TR
        row.innerHTML = `
        <td>${this.tache}</td>
        <td>${this.date}</td>
        <td><button class="delete">X</button></td>
        `;
        // Je place la balise TR dans son élement parent (tbody)
        list.appendChild(row);
    }

    //2.3) Méthode pour effacer ce qu'on a écrit dans les champs du formulaire
    clearFields() {
        document.querySelector('#tache').value = '';
        document.querySelector('#date').value = '';
    }
}

//3) gérer les évènements pour le formulaire
// Selectionner le formulaire
const todoForm = document.querySelector('.todo-form');

//Fonction:  quand le formulaire est soumis => le code crée une nouvelle tâche, vérifie si les champs nécessaires sont remplis, efface les champs, ajoute la tâche à la liste et affiche une alerte.
todoForm.addEventListener('submit', (e) => {
    // Empecher le rafraichissement de la page lors de la soumission du formulaire (selon Yan)
    e.preventDefault();

    // attribuer les valeurs du formulaire à notre constructeur
    const tache = document.querySelector('#tache').value;
    const date = document.querySelector('#date').value;

    //creer une instance de notre class Tache
    const tache1 = new Tache(tache, date);

    //verifier si les champs sont remplis
    if (tache === '' || date === '') {
        tache1.showAlert('Remplissez les champs', 'error')
    } else {
        //si tout est bon, on efface les champs, on ajoute la tâche et on affiche le message success
        tache1.clearFields();
        tache1.addTaskToList();
        tache1.showAlert('Tâche ajoutée', 'success')
    }
});

// 4) gérer les évènement pour la liste de tâches
const TacheList = document.querySelector('.tache-list');

TacheList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        // Je prends le bon TR si j'ai plusieurs tâches
        let tacheRow = event.target.closest('tr');
        // Je prends les TD correspondant à la tâche et à la date
        let tacheCell = tacheRow.querySelector('td:first-child');
        let dateCell = tacheRow.querySelector('td:nth-child(2)');

        // Si mes TD ont deja la class completed, on la retire, sinon on l'ajoute
        tacheCell.classList.toggle('completed');
        dateCell.classList.toggle('completed');
    }
})
