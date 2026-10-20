const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");

let tasks = [];

function updateTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            updateTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTasks();
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    taskCount.textContent = `Total Tasks: ${tasks.length}`;
    emptyMessage.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = taskInput.value.trim();

    if (name.length === 0) {
        return;
    }

    tasks.push({
        name: name,
        completed: false
    });

    taskInput.value = "";

    updateTasks();
});

updateTasks();