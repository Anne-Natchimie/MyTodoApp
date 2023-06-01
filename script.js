const inputBox = document.getElementById("input-box"); 
const listContainer = document.getElementById("list-container"); 

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
        console.log('écrire une tâche')
        

    } else {
        addItemToLi(inputBox.value); 
        addTaskToApi(inputBox.value); 
    } 

    inputBox.value = ""; 
    saveData(); 
    console.log('une tâche est inscrite'); 
} 

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");  
        saveData();
        console.log('une tâche à été réalisée');

    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); 
        saveData();
        console.log('une tâche à été supprimée');

    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML); 
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data"); 
} 

showTask(); 

readAllElement(); 

/* Fonction qui permet de lister */
function addItemToLi(item) {
    let li = document.createElement("li");
        li.innerHTML = item; 
        listContainer.appendChild(li); 
        let span = document.createElement("span"); 
        span.innerHTML = "\u00d7"; 
        li.appendChild(span); 
}

/* Fonction qui permet de lire les éléments */
/*
function readAllElement() {
    console.log('interrogation API'); 
    fetch('http://127.0.0.1:8000/api/tasks') .then(response =>{
    console.log(response.json()); 
    return response.json ; 
    }) 
}
*/

async function readAllElement() { /* async permet de rendre la fonction asynchrone */
    console.log('interrogation API'); /* interrogation de l'api */
    const response = await fetch('http://127.0.0.1:8000/api/tasks'); /* await permet d'attendre l'éxecution d'une commande et fetch permet d'envoyer et de lire des données */
    console.log(response); 
    const tasks = await response.json(); /* conversion de la réponse en tableau */
    console.log(task);
    tasks.forEach(item => {
        console.log(item.task)
        addItemToLi(item.task)
    });
}

async function addTaskToApi(task) {
    /* envoi des données à l'API */

    let myForm = new FormData(); 
    myForm.append("task", task)
    console.log(myForm);

    const response = await fetch('http://127.0.0.1:8000/api/tasks', {
        method:"POST"
    });

    console.log(response); 

}

addTaskToApi(); 