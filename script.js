let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let editIndex = -1;

    function salvarTarefa() {
        let titulo = document.getElementById("titulo").value.trim();
        let descricao = document.getElementById("descricao").value.trim();

        if (!titulo) return alert("Informe o título!");

        if (editIndex === -1) {
            tarefas.push({ titulo, descricao, concluida: false });
        } else {
            tarefas[editIndex] = { ...tarefas[editIndex], titulo, descricao };
            editIndex = -1;
        }

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        document.getElementById("titulo").value = "";
        document.getElementById("descricao").value = "";
        listarTarefas();
    }

    function listarTarefas() {
        let lista = document.getElementById("lista");
        lista.innerHTML = "";
        tarefas.forEach((t, index) => {
            let div = document.createElement("div");
            div.className = "tarefa" + (t.concluida ? " tarefa-concluida" : "");

            div.innerHTML = `
                <div>
                    <input type="checkbox" ${t.concluida ? "checked" : ""} onchange="toggleConcluida(${index})">
                    <span><strong>${t.titulo}</strong> - ${t.descricao}</span>
                </div>
                <div class="acoes">
                    <button onclick="editarTarefa(${index})">✏️</button>
                    <button onclick="excluirTarefa(${index})">🗑️</button>
                </div>
            `;
            lista.appendChild(div);
        });
    }

    function editarTarefa(index) {
        document.getElementById("titulo").value = tarefas[index].titulo;
        document.getElementById("descricao").value = tarefas[index].descricao;
        editIndex = index;
    }

    function excluirTarefa(index) {
        tarefas.splice(index, 1);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        listarTarefas();
    }

    function toggleConcluida(index) {
        tarefas[index].concluida = !tarefas[index].concluida;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        listarTarefas();
    }

    listarTarefas();