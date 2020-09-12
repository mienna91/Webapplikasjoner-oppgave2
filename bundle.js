"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

require('./css/style.css');

window.onload = startup;

function startup() {
  var form = document.getElementById("newTodo");
  form.addEventListener("submit", handleSubmission);
}

var modal = document.getElementById("modalWindow");
var btn = document.getElementById("todoBtn");
var descriptionCounter = document.getElementById("todoDescription");
var descriptionLabel = document.getElementById("count");
var closeBtn = document.getElementById("closeBtn"); //displays the modal window

btn.addEventListener("click", function (event) {
  modal.style.display = "block";
  descriptionLabel.textContent = " (".concat(30, " Characters left)");
  emptyModalInputs();
}); //closes the modal window, when "X" button is clicked (I know it's not semantically a button)

closeBtn.addEventListener("click", function (event) {
  modal.style.display = "none";
}); //Keeps track of how many characters the user has left in the description input field.

descriptionCounter.oninput = handleInput;

function handleInput(event) {
  var charCount = 30;
  descriptionLabel.textContent = " (".concat(charCount - event.target.value.length, " Characters left)");
} //Storing new todos in a collection and creating the todo card with the corresponding content


var titleInput = document.getElementById("todoTitle");
var authorInput = document.getElementById("todoAuthor");
var submission = document.getElementById("todoCreateBtn"); //Event handler that prevents the form from submiting, iterates through
//the child elements of the modal and sets the datas in the object,
//renders the content and closes the modal

function handleSubmission(event) {
  event.preventDefault();
  var todoData = {};
  Array.from(event.target.children).forEach(function (childElem) {
    if (childElem.nodeName === "INPUT") {
      todoData[childElem.id] = childElem.value;
    }
  });
  console.log(todoData);
  modal.style.display = "none";
  renderCardContent(todoData);
} //Inserts the new todo card at the beginning of the cardlist display


function renderCardContent(formData) {
  document.getElementById("todoSection").insertAdjacentHTML("afterbegin", template(formData));
  addListenersToCardBtns();
} //The cardlist template


function template(data) {
  return "\n    <section class=\"todoContainer\">\n        <ul class=\"todoList\">\n            <li class=\"todoTitle\">".concat(data.todoTitle, "</li>\n            <li class=\"todoDescription\">").concat(data.todoDescription, "</li>\n            <li class=\"todoAuthor\">").concat(data.todoAuthor, "</li>\n            <li class=\"todoBtns\">\n                <button class=\"completeBtn\">Complete</button>\n                <button class=\"deleteBtn\">Delete</button>\n            </li>\n        <ul>\n    </section> ");
} //function to add seperate listeners to the complete and deletebtns 
//in the todo cards


function addListenersToCardBtns() {
  var completeBtns = document.getElementsByClassName("completeBtn");
  var deleteBtns = document.getElementsByClassName("deleteBtn");

  for (var x = 0; x < completeBtns.length; x++) {
    completeBtns[x].addEventListener("click", completeTodoTuple);
    deleteBtns[x].addEventListener("click", deleteTodo);
  }
} //Function that deletes a todo card


function deleteTodo() {
  this.parentNode.parentNode.parentNode.remove();
} //Function that empties the inputs in the modal window


function emptyModalInputs() {
  document.getElementById("todoTitle").value = null;
  document.getElementById("todoDescription").value = null;
  document.getElementById("todoAuthor").value = null;
} //borrowed this function from stackoverflow, just for cleaner date format.


function dateFormatter() {
  var date = new Date();
  var format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  var _format$formatToParts = format.formatToParts(date),
      _format$formatToParts2 = _slicedToArray(_format$formatToParts, 5),
      month = _format$formatToParts2[0].value,
      day = _format$formatToParts2[2].value,
      year = _format$formatToParts2[4].value;

  return "".concat(day, ".").concat(month, ".").concat(year);
} //template for the complete table rows


function completeTodoTupleTemplate(formData) {
  return "\n    <tr>\n        <td>".concat(formData.title, "</td>\n        <td>").concat(formData.author, "</td>\n        <td>").concat(formData.description, "</td>\n        <td>").concat(dateFormatter(), "</td>\n    </tr>\n    ");
} //eventhandler that collects todo card data and creates the
//complete entry in the complete table and removes the
//corresponding todo card from the todoSection


function completeTodoTuple() {
  var completeTitle = this.parentNode.parentNode.querySelector(".todoTitle").innerHTML;
  var completeAuthor = this.parentNode.parentNode.querySelector(".todoAuthor").innerHTML;
  var completeDescription = this.parentNode.parentNode.querySelector(".todoDescription").innerHTML;
  var completedData = {};
  completedData["title"] = completeTitle;
  completedData["author"] = completeAuthor;
  completedData["description"] = completeDescription;
  createCompleteTodoTuple(completedData);
  console.log(completedData);
  this.parentNode.parentNode.parentNode.remove();
} //function that inserts entry into the complete table


function createCompleteTodoTuple(data) {
  document.getElementById("completeTable").insertAdjacentHTML("beforeend", completeTodoTupleTemplate(data));
  addListenersToCardBtns();
}
