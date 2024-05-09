
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
  addToDoListItem(task);
});


formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewTask();
});

function addNewTask() {
  const newTaskName = inputEl.value;
  if (!newTaskName.trim()) return; 

  const task = { name: newTaskName, checked: false };
  addToDoListItem(task);
  tasks.push(task);
  updateLocalStorage();
  inputEl.value = ""; 
}


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

  checkBtnEl.addEventListener("click", () => {
    task.checked = !task.checked;
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

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
