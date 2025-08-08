let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let editIndex = null;

    const form = document.getElementById('formTarefa');
    const listaTarefas = document.getElementById('listaTarefas');
    const btnCancelar = document.getElementById('btnCancelar');

    function salvarLocalStorage() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function renderizarTarefas() {
        listaTarefas.innerHTML = '';
        tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarefa.concluida;
            checkbox.addEventListener('change', () => {
                tarefa.concluida = !tarefa.concluida;
                salvarLocalStorage();
                renderizarTarefas();
            });

            const span = document.createElement('span');
            span.classList.add('tarefa-texto');
            if (tarefa.concluida) span.classList.add('concluida');
            span.textContent = `${tarefa.titulo} - ${tarefa.descricao}`;

            const acoes = document.createElement('div');
            acoes.classList.add('acoes');

            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = '✏️';
            btnEditar.addEventListener('click', () => {
                document.getElementById('titulo').value = tarefa.titulo;
                document.getElementById('descricao').value = tarefa.descricao;
                editIndex = index;
                btnCancelar.style.display = 'inline-block';
            });

            const btnExcluir = document.createElement('button');
            btnExcluir.innerHTML = '🗑️';
            btnExcluir.addEventListener('click', () => {
                tarefas.splice(index, 1);
                salvarLocalStorage();
                renderizarTarefas();
            });

            acoes.appendChild(btnEditar);
            acoes.appendChild(btnExcluir);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(acoes);

            listaTarefas.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();

        if (editIndex !== null) {
            tarefas[editIndex] = { titulo, descricao, concluida: tarefas[editIndex].concluida };
            editIndex = null;
            btnCancelar.style.display = 'none';
        } else {
            tarefas.push({ titulo, descricao, concluida: false });
        }

        salvarLocalStorage();
        renderizarTarefas();
        form.reset();
    });

    btnCancelar.addEventListener('click', () => {
        form.reset();
        editIndex = null;
        btnCancelar.style.display = 'none';
    });

    renderizarTarefas();