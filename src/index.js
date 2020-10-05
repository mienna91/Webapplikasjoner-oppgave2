import './css/style.css'
window.onload = startup;

function startup() {

    let form = document.querySelector("#newTodo");
    form.addEventListener("submit", handleSubmission);

}


let modal = document.querySelector("#modalWindow");
const btn = document.querySelector("#todoBtn");
let descriptionCounter = document.querySelector("#todoDescription");
let descriptionLabel = document.querySelector("#count");
let closeBtn = document.querySelector("#closeBtn");

//displays the modal window
btn.addEventListener("click", (event) => { 
    modal.style.display = "block";
    descriptionLabel.textContent = ` (${30} Characters left)`
    emptyModalInputs();
});

//closes the modal window, when "X" button is clicked (I know it's not semantically a button)
closeBtn.addEventListener("click", (event) => {
    modal.style.display = "none";
});

//Keeps track of how many characters the user has left in the description input field.
descriptionCounter.oninput = (event) => {
    let charCount = 30;
    
    descriptionLabel.textContent = ` (${charCount - event.target.value.length} Characters left)`
}


//Event handler that prevents the form from submiting, iterates through
//the child elements of the modal and sets the datas in the object,
//renders the content and closes the modal
let handleSubmission = (event) => {
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
let renderCardContent = (formData) => {

    document.querySelector("#todoSection").insertAdjacentHTML("afterbegin", template(formData));
    addListenersToCardBtns();
}

//The cardlist template
let template = (data) => {
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
let addListenersToCardBtns = () => {
    let completeBtns = document.querySelectorAll(".completeBtn");
    let deleteBtns = document.querySelectorAll(".deleteBtn");

    for(let x = 0; x < completeBtns.length; x++) {
        completeBtns[x].addEventListener("click", completeTodoTuple);
        deleteBtns[x].addEventListener("click", deleteTodo);
    }
}

//Function that deletes a todo card
let deleteTodo = (e) => {
    // this.parentNode.parentNode.parentNode.remove();
    e.target.parentNode.parentNode.parentNode.remove();
}


//Function that empties the inputs in the modal window
let emptyModalInputs = () => {
    document.querySelector("#todoTitle").value = null;
    document.querySelector("#todoDescription").value = null;
    document.querySelector("#todoAuthor").value = null;
}

//borrowed this function from stackoverflow, just for cleaner date format.
let dateFormatter = () => {
    const date = new Date();
    const format = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
    const [{ value: month },,{ value: day },,{ value: year }] = format .formatToParts(date )
    return `${day}.${month}.${year}`
}

//template for the complete table rows
let completeTodoTupleTemplate = (formData) => {

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
let completeTodoTuple = (e) => {
    let completedData = {
        title: e.target.parentNode.parentNode.querySelector(".todoTitle").innerHTML,
        author: e.target.parentNode.parentNode.querySelector(".todoAuthor").innerHTML,
        description: e.target.parentNode.parentNode.querySelector(".todoDescription").innerHTML
    };

    createCompleteTodoTuple(completedData);
    e.target.parentNode.parentNode.parentNode.remove();
}

//function that inserts entry into the complete table
let createCompleteTodoTuple = (data) =>{
    document.querySelector("#completeTable").insertAdjacentHTML("beforeend", completeTodoTupleTemplate(data));
    addListenersToCardBtns();
}