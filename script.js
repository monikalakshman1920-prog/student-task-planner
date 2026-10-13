const input = document.querySelector("#taskInput");
const date = document.querySelector("#dueDate");
const priority = document.querySelector("#taskPriority");
const button = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

function saveTasks() {
  localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function updateStats() {
  document.querySelector("#total").textContent = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  document.querySelector("#completed").textContent = done;
  document.querySelector("#pending").textContent = tasks.length - done;
}

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((t, i) => {
    const task = document.createElement("p");
    task.style.textDecoration = t.completed ? "line-through" : "none";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.completed;

    check.onchange = function() {
      tasks[i].completed = check.checked;
      saveTasks();
      showTasks();
    };

    const name = document.createElement("span");
    name.textContent = " " + t.name + " ";

    const due = document.createElement("small");
    due.textContent = t.dueDate
      ? "📅 Due: " + t.dueDate + " "
      : "📅 No due date ";

    const level = document.createElement("span");
    level.textContent = " | Priority: " + (t.priority || "Medium") + " ";

    const del = document.createElement("button");
    del.textContent = "🗑️ Delete";

    del.onclick = function() {
      tasks.splice(i, 1);
      saveTasks();
      showTasks();
    };

    task.append(check, name, due, level, del);
    taskList.appendChild(task);
  });

  updateStats();
}

button.onclick = function() {
  if (input.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    name: input.value.trim(),
    dueDate: date.value,
    priority: priority.value,
    completed: false
  });

  saveTasks();
  showTasks();

  input.value = "";
  date.value = "";
  priority.value = "Medium";
};

showTasks();
