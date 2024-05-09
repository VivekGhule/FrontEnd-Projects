// Get the form, input, and list elements
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// Load tasks from localStorage and display them
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
  addToDoListItem(task);
});

// Add event listener to the form for submitting new tasks
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTask();
});

// Function to add a new task to the list
function addNewTask() {
  const newTaskName = inputEl.value;
  if (!newTaskName.trim()) return; // Ignore empty tasks

  const task = { name: newTaskName, checked: false };
  addToDoListItem(task);
  tasks.push(task);
  updateLocalStorage();
  inputEl.value = ""; // Clear input field
}

// Function to create and display a new task item
function addToDoListItem(task) {
  const liEl = document.createElement("li");
  liEl.innerText = task.name;
  if (task.checked) {
    liEl.classList.add("checked");
  }

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  ulEl.appendChild(liEl);

  // Toggle task completion status
  checkBtnEl.addEventListener("click", () => {
    task.checked = !task.checked;
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  // Remove task from list
  trashBtnEl.addEventListener("click", () => {
    tasks = tasks.filter((t) => t !== task);
    liEl.remove();
    updateLocalStorage();
  });
}

// Function to update localStorage with current task list
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
