window.addEventListener('load', () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_elements = document.querySelector("#tasks");

  // Load tasks from localStorage when the page loads
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToDOM(task) {
    const task_elements = createTaskElement(task);
    list_elements.appendChild(task_elements);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value;

    if (!task) {
      alert("Please fill out the task");
      return;
    }

    // Create task element and add it to the DOM
    const taskElement = createTaskElement(task);
    list_elements.appendChild(taskElement);

    // Save the updated tasks to localStorage
    savedTasks.push(task);
    saveTasks(savedTasks);

    input.value = "";
  });

  function createTaskElement(task) {
    const task_elements = document.createElement("div");
    task_elements.classList.add("task");

    const task_content_elements = document.createElement("div");
    task_content_elements.classList.add("content");

    const task_input_elements = document.createElement("input");
    task_input_elements.classList.add("text");
    task_input_elements.type = "text";
    task_input_elements.value = task;
    task_input_elements.setAttribute("readonly", "readonly");

    task_content_elements.appendChild(task_input_elements)
    task_elements.appendChild(task_content_elements);

    const task_action_elements = document.createElement("div");
    task_action_elements.classList.add("actions");

    const task_edit_elements = document.createElement("button");
    task_edit_elements.classList.add("edit");
    task_edit_elements.innerHTML = "Edit";

    const task_delete_elements = document.createElement("button");
    task_delete_elements.classList.add("delete");
    task_delete_elements.innerHTML = "Delete";

    task_action_elements.appendChild(task_edit_elements);
    task_action_elements.appendChild(task_delete_elements);
    task_elements.appendChild(task_action_elements);

    task_edit_elements.addEventListener('click', () => {
      if (task_edit_elements.innerText.toLowerCase() == "edit") {
        task_input_elements.removeAttribute("readonly");
        task_input_elements.focus();
        task_edit_elements.innerHTML = "Save";
      } else {
        task_input_elements.setAttribute("readonly", "readonly");
        task_edit_elements.innerText = "Edit";

        // Update task in the savedTasks array and localStorage
        const index = savedTasks.indexOf(task);
        if (index !== -1) {
          savedTasks[index] = task_input_elements.value;
          saveTasks(savedTasks);
        }
      }
    });

    task_delete_elements.addEventListener('click', () => {
      list_elements.removeChild(task_elements);

      // Remove task from the savedTasks array and localStorage
      const index = savedTasks.indexOf(task);
      if (index !== -1) {
        savedTasks.splice(index, 1);
        saveTasks(savedTasks);
      }
    });

    return task_elements;
  }

  // Populate the list with saved tasks when the page loads
  savedTasks.forEach(task => {
    addTaskToDOM(task);
  });
});
