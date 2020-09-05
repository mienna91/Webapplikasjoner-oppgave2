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
    let todoData = {};
    
    Array.from(event.target.children).forEach(childElem => {
        if(childElem.nodeName === "INPUT") {
            todoData[childElem.id] = childElem.value;
        }
    })

    modal.style.display = "none";
    renderCardContent(todoData);
}


//Inserts the new todo card at the beginning of the cardlist display
function renderCardContent (formData) {

    document.getElementById("todoSection").insertAdjacentHTML("afterbegin", template(formData));
}

//The cardlist template
function template(data) {
    return `
    <section class="todoContainer">
        <ul class="todoList">
            <li class="todoTitle">${data.todoTitle}</li>
            <li class="todoDescription">${data.todoDescription}</li>
            <li class="todoBtns">
                <button class="completeBtn">Complete</button>
                <button class="deleteBtn">Delete</button>
            </li>
        <ul>
    </section> `
}

//Function that empties the inputs in the modal window
function emptyModalInputs() {
    document.getElementById("todoTitle").value = null;
    document.getElementById("todoDescription").value = null;
    document.getElementById("todoAuthor").value = null;
}
