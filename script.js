let tasks = [];
    let editingIndex = null;

    const form = document.getElementById("task-form");
    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("description");
    const taskList = document.getElementById("task-list");

    // Carregar tarefas do localStorage ao iniciar
    window.addEventListener("load", () => {
      const savedTasks = localStorage.getItem("tarefas");
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
      }
    });

    // Salvar no localStorage
    function saveToLocalStorage() {
      localStorage.setItem("tarefas", JSON.stringify(tasks));
    }

    // Enviar formulário
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const description = descInput.value.trim();

      if (!title || !description) return;

      if (editingIndex !== null) {
        tasks[editingIndex] = { title, description };
        editingIndex = null;
      } else {
        tasks.push({ title, description });
      }

      saveToLocalStorage();
      renderTasks();
      resetForm();
    });

    // Renderizar tarefas
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task-item";

        const content = document.createElement("div");
        content.className = "task-content";
        content.innerHTML = `<div class="task-title">${task.title}</div><div class="task-desc">${task.description}</div>`;

        const actions = document.createElement("div");
        actions.className = "actions";
        actions.innerHTML = `
          <button class="edit" onclick="editTask(${index})">Editar</button>
          <button class="delete" onclick="deleteTask(${index})">Excluir</button>
        `;

        div.appendChild(content);
        div.appendChild(actions);
        taskList.appendChild(div);
      });
    }

    function editTask(index) {
      const task = tasks[index];
      titleInput.value = task.title;
      descInput.value = task.description;
      editingIndex = index;
    }

    function deleteTask(index) {
      if (confirm("Deseja excluir esta tarefa?")) {
        tasks.splice(index, 1);
        saveToLocalStorage();
        renderTasks();
      }
    }

    function resetForm() {
      form.reset();
      editingIndex = null;
    }