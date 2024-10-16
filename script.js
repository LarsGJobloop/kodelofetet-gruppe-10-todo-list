/**
 * @type {HTMLFormElement}
 */
let userInput = document.querySelector("#user-input");
let todoListElement = document.querySelector("#todo-list");

userInput.addEventListener("submit", handleSubmit);

let storedTodos = localStorage.getItem("todos");
let convertedTodos = JSON.parse(storedTodos);

let todos;
if (storedTodos === null) {
  // Viss det er første besøk på siden, lag en ny liste
  todos = [];
} else {
  // Viss det var noe lagret i LocalStorage, bruk det
  todos = convertedTodos;
}

renderTodos();

/**
 * Dette er det som skal skje når brukeren trykker på
 * Legg til knappen
 *
 * @param {*} event
 */
function handleSubmit(event) {
  event.preventDefault(); // Forhindrer nettsiden og lastes inn på nytt (refresh)

  console.log("Creating Todo Object...");
  let newTodo = createTodoObject(userInput);

  console.log("Append new todo to todo list...");
  todos.push(newTodo);

  console.log("Updating the stored list...");
  let jsonTodos = JSON.stringify(todos);
  localStorage.setItem("todos", jsonTodos);

  console.log("Resetting form element...");
  userInput.reset();

  renderTodos();
}

// Denne leser av dataen i et form element
// og lager et JavaScript objekt for Gjøremålene
/**
 * @param {HTMLFormElement} form
 * @returns
 */
function createTodoObject(form) {
  let todo = form.querySelector("#todo");
  let todoValue = todo.value;

  let todoObject = {
    title: todoValue,
    createdAt: new Date().toISOString(),
  };

  return todoObject;
}

function createTodoCard(todoObject) {
  // Lage alle elementene vi trenger
  let todoCard = document.createElement("li");
  let titleElement = document.createElement("h2");
  let deleteButton = document.createElement("button");
  let checkMark = document.createElement("img");
  let completeButton = document.createElement("button");

  // Sett de sammen til ett element
  todoCard.append(titleElement);
  todoCard.append(deleteButton);
  todoCard.append(completeButton);
  deleteButton.append(checkMark);

  // Set CSS Klassene de skal ha (styling)
  todoCard.className =
    "bg-emerald-300 flex flex-col p-4 rounded shadow-xl flex gap-1";
  titleElement.className = "underline";
  deleteButton.className = "bg-red-400 px-4 py-2 rounded hover:bg-red-300";
  completeButton.className = "bg-teal-500 px-4 py-2 rounded hover:bg-teal-400";
  checkMark.className = "h-4 w-4";

  // Konfigurer andre verdier de
  titleElement.textContent = todoObject.title;
  checkMark.src = "assets/icon-checkmark.svg";
  deleteButton.addEventListener("click", () => {
    console.log("Deleting todo...");

    // Fjern "todoObject" fra "todos" listen
    let filteredTodos = todos.filter((todo) => {
      if (todo.id === todoObject.id) {
        return false;
      } else {
        return true;
      }
    });

    todos = filteredTodos;

    let jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);

    renderTodos();
  });
  completeButton.textContent = "Done";

  return todoCard;
}

// Denne er ansvarlig for å oppdatere HTML
function renderTodos() {
  console.log("Clearing out the old todos from the document...");
  todoListElement.innerHTML = "";

  console.log("Appending all todos to the Document...");
  todos.forEach((todo, index) => {
    // Først lage det HTML for det gjøremålet
    let newTodoCard = createTodoCard(todo);

    // Legg det nye html element til i Dokumentet
    todoListElement.append(newTodoCard);
  });
}
