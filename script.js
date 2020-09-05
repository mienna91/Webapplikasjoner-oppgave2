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


var title;
var description;
var author;



function handleSubmission(event) {
    event.preventdefault();
    let todoData = {};
    
    Array.from(event.target.children).forEach(childElem => {
        if(childElem.nodeName === "INPUT") {
            todoData[childElem.id] = childElem.value;
        }
    })

    console.log(todoData[0]);
    renderCardContent(todoData);
}


function renderCardContent (formData) {
    document.getElementById("todoSection").insertAdjacentHTML("beforeend", template(formData));
}

function template(data) {
    return `
    <section class="todoContainer">
        <ul class="todoList">
            <li class="todoTitle">${data.title}</li>
            <li class="todoDescription">${data.description}</li>
            <li class="todoBtns">
                <button class="completeBtn">Complete</button>
                <button class="deleteBtn">Delete</button>
            </li>
        <ul>
    </section> `
}

//making the template for the card list
/*function createTemplate() {
    var cardList = createCardList();
    return createContainer(cardList);
}*/

//Creating the cardlist container, appending it to the "todo" section
//and finally creates the cardlist, appending it to the container.
/*function createContainer(cardList) {
    var container = document.createElement("section");
    styleContainer(container);
    todos.appendChild(container);
    container.appendChild(cardList);
}*/

//function that creates the cardlist and corresponding elements,
//styling the content and appending it to the cardlist
/*function createCardList() {
    var cardList = document.createElement("ul");    
    var titleItem = document.createElement("li");    
    var descriptionItem = document.createElement("li");   
    var btnItem = document.createElement("li");  
    var completeBtn = document.createElement("button");   
    var removeBtn = document.createElement("button");

    styleCardListContent(cardList, titleItem, descriptionItem, btnItem, completeBtn, removeBtn);
    appendCardListContent(cardList, titleItem, descriptionItem, btnItem, completeBtn, removeBtn);

    return cardList;
}*/

//container styling
/*function styleContainer(container) {
    container.style.height = "163px";
    container.style.width = "282px";
    container.style.boxShadow = "0px 2px 11px -4px rgba(93,211,216,1)";
    container.style.minWidth = "282px";
    container.style.marginRight = "12px";
    container.style.marginLeft = "12px";
}*/

//Gathering function for card list styling
/*function styleCardListContent(list, title, description, btns, completeBtn, deleteBtn) {
    styleCardList(list);
    styleTitle(title);
    styleDescription(description);
    styleBtnItem(btns);
    styleCompleteBtn(completeBtn);
    styleDeleteBtn(deleteBtn);
}*/

//cardlist styling
/*function styleCardList(cardList) {
    cardList.style.listStyleType = "none"
    cardList.style.fontFamily = "Arial, Helvetica, sans-serif"; 
    cardList.style.paddingLeft = "25px";
}*/

//cardlist title styling
/*function styleTitle(title) {
    title.innerHTML = "Title";
    title.style.fontSize = "16px";
    title.style.fontWeight = "800";
    title.style.color = "#333333";
    title.style.marginBottomtitle
}*/

//cardlist description styling
/*function styleDescription(description) {
    description.style.fontSize = "14px";
    description.style.color = "#333333";
    description.style.textOverflow = "ellipsis";
    description.style.whiteSpace = "normal";
    description.style.overflow = "hidden";
    description.style.height = "62px";
    description.style.marginBottom = "10px";
}*

//completebutton styling
function styleCompleteBtn(btn) {
    btn.style.width = "77px";
    btn.style.height = "23px";
    btn.style.float = "right";
    btn.style.marginRight = "20px";
    btn.style.marginLeft = "5px";
    btn.style.backgroundColor = "#56D4C2";
    btn.style.borderRadius = "5px";
    btn.style.border = "0";
    btn.style.color = "white";
    btn.innerHTML = "Complete";
    btn.style.fontWeight = "600";
    btn.style.fontSize = "11px";
}

//deletebutton styling
function styleDeleteBtn(btn) {
    btn.style.width = "77px";
    btn.style.height = "23px";
    btn.style.float = "right";
    btn.style.backgroundColor = "#EF3340";
    btn.style.borderRadius = "5px";
    btn.style.border = "0";
    btn.style.color = "white";
    btn.innerHTML = "Delete";
    btn.style.fontWeight = "600";
    btn.style.fontSize = "11px";
}

//append content to card list
function appendCardListContent(cardList, title, description, btns, completeBtn, deleteBtn) {
    cardList.appendChild(title);
    cardList.appendChild(description);
    cardList.appendChild(btns);
    btns.appendChild(completeBtn);
    btns.appendChild(deleteBtn);
}

//Button list point styling
function styleBtnItem(btnItem) {
    btnItem.style.height = "15px";
}*






*/
