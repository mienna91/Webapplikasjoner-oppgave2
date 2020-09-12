import './css/style.css'
window.onload = startup;

function startup() {

    var form = document.getElementById("newTodo");
    form.addEventListener("submit", handleSubmission);

}


var modal = document.getElementById("modalWindow");
const btn = document.getElementById("todoBtn");
var descriptionCounter = document.getElementById("todoDescription");
var descriptionLabel = document.getElementById("count");
var closeBtn = document.getElementById("closeBtn");

//displays the modal window
btn.addEventListener("click", function(event) { 
    modal.style.display = "block";
    descriptionLabel.textContent = ` (${30} Characters left)`
    emptyModalInputs();
});

//closes the modal window, when "X" button is clicked (I know it's not semantically a button)
closeBtn.addEventListener("click", function(event) {
    modal.style.display = "none";
});

//Keeps track of how many characters the user has left in the description input field.
descriptionCounter.oninput = handleInput;

function handleInput(event) {
    var charCount = 30;
    
    descriptionLabel.textContent = ` (${charCount - event.target.value.length} Characters left)`
}

//Storing new todos in a collection and creating the todo card with the corresponding content
var titleInput = document.getElementById("todoTitle");
var authorInput = document.getElementById("todoAuthor");
var submission = document.getElementById("todoCreateBtn");


//Event handler that prevents the form from submiting, iterates through
//the child elements of the modal and sets the datas in the object,
//renders the content and closes the modal
function handleSubmission(event) {
    event.preventDefault();
    var todoData = {};
    
    Array.from(event.target.children).forEach(childElem => {
        if(childElem.nodeName === "INPUT") {
            todoData[childElem.id] = childElem.value;
        }
    })

    console.log(todoData);
    modal.style.display = "none";
    renderCardContent(todoData);
}


//Inserts the new todo card at the beginning of the cardlist display
function renderCardContent (formData) {

    document.getElementById("todoSection").insertAdjacentHTML("afterbegin", template(formData));
    addListenersToCardBtns();
}

//The cardlist template
function template(data) {
    return `
    <section class="todoContainer">
        <ul class="todoList">
            <li class="todoTitle">${data.todoTitle}</li>
            <li class="todoDescription">${data.todoDescription}</li>
            <li class="todoAuthor">${data.todoAuthor}</li>
            <li class="todoBtns">
                <button class="completeBtn">Complete</button>
                <button class="deleteBtn">Delete</button>
            </li>
        <ul>
    </section> `
}

//function to add seperate listeners to the complete and deletebtns 
//in the todo cards
function addListenersToCardBtns() {
    let completeBtns = document.getElementsByClassName("completeBtn");
    let deleteBtns = document.getElementsByClassName("deleteBtn");

    for(let x = 0; x < completeBtns.length; x++) {
        completeBtns[x].addEventListener("click", completeTodoTuple);
        deleteBtns[x].addEventListener("click", deleteTodo);
    }
}

//Function that deletes a todo card
function deleteTodo() {
    this.parentNode.parentNode.parentNode.remove();
}


//Function that empties the inputs in the modal window
function emptyModalInputs() {
    document.getElementById("todoTitle").value = null;
    document.getElementById("todoDescription").value = null;
    document.getElementById("todoAuthor").value = null;
}

//borrowed this function from stackoverflow, just for cleaner date format.
function dateFormatter() {
    const date = new Date();
    const format = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = format .formatToParts(date )
    return `${day}.${month}.${year}`
}

//template for the complete table rows
function completeTodoTupleTemplate(formData) {

    return `
    <tr>
        <td>${formData.title}</td>
        <td>${formData.author}</td>
        <td>${formData.description}</td>
        <td>${dateFormatter()}</td>
    </tr>
    `
}

//eventhandler that collects todo card data and creates the
//complete entry in the complete table and removes the
//corresponding todo card from the todoSection
function completeTodoTuple() {
    let completeTitle = this.parentNode.parentNode.querySelector(".todoTitle").innerHTML;
    let completeAuthor = this.parentNode.parentNode.querySelector(".todoAuthor").innerHTML;
    let completeDescription = this.parentNode.parentNode.querySelector(".todoDescription").innerHTML;
    let completedData = {};

    completedData["title"] = completeTitle;
    completedData["author"] = completeAuthor;
    completedData["description"] = completeDescription;

    
    createCompleteTodoTuple(completedData);
    console.log(completedData);
    this.parentNode.parentNode.parentNode.remove();
}

//function that inserts entry into the complete table
function createCompleteTodoTuple(data) {
    document.getElementById("completeTable").insertAdjacentHTML("beforeend", completeTodoTupleTemplate(data));
    addListenersToCardBtns();
}