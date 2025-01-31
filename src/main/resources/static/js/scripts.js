const API_URL = 'http://localhost:8080';

async function loadProjetosComTarefas() {
    try {
        const projetosResponse = await fetch(`${API_URL}/projetos`);
        const projetos = await projetosResponse.json();

        const projetosComTarefas = await Promise.all(projetos.map(async (projeto) => {
            const tarefasResponse = await fetch(`${API_URL}/tarefas?projetoId=${projeto.id}`);
            const tarefas = await tarefasResponse.json();
            return { ...projeto, tarefas };
        }));

        renderizarProjetos(projetosComTarefas);
    } catch (error) {
        alert(`Erro ao carregar dados: ${error.message}`);
    }
}


async function loadProjetos() {
    try {
        const response = await fetch(`${API_URL}/projetos`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const projetos = await response.json();
        const container = document.getElementById('projetosList');
        container.innerHTML = projetos.map(projeto => `
            <div class="card">
                <h3>${projeto.nome}</h3>
                <p>${projeto.descricao}</p>
                <p>Status: ${projeto.status}</p>
                <p>Equipe: ${projeto.equipeResponsavel}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editProjeto(${projeto.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteProjeto(${projeto.id})">Excluir</button>
                </div>
                <div class="tarefas">
                    <h4>Tarefas</h4>
                    <ul>
                        ${projeto.tarefas.map(tarefa => `
                            <li>
                                <strong>${tarefa.titulo}</strong> - ${tarefa.descricao}
                                <span class="status">${tarefa.status}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    } catch (error) {
        alert(`Falha ao carregar projetos: ${error.message}`);
    }
}


async function loadTarefas() {
    try {
        const response = await fetch(`${API_URL}/tarefas`);
        const tarefas = await response.json();
        const container = document.getElementById('tarefasList');
        container.innerHTML = tarefas.map(tarefa => `
            <div class="card">
                <h3>${tarefa.titulo}</h3>
                <p>${tarefa.descricao}</p>
                <p>Prazo: ${tarefa.prazo} dias</p>
                <p>Status: ${tarefa.status}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editTarefa(${tarefa.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteTarefa(${tarefa.id})">Excluir</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

async function editProjeto(id) {
    try {
		
        const response = await fetch(`${API_URL}/projetos/${id}`);
        if (!response.ok) {
            throw new Error('Projeto não encontrado');
        }
        const projeto = await response.json();


        const form = document.getElementById('projetoForm');
        form.nome.value = projeto.nome;
        form.descricao.value = projeto.descricao;
        form.dataInicio.value = projeto.dataInicio;
        form.dataTermino.value = projeto.dataTermino;
        form.status.value = projeto.status;
        form.equipeResponsavel.value = projeto.equipeResponsavel;


        const submitBtn = document.getElementById('submitProjeto');
        submitBtn.textContent = 'Atualizar Projeto';
        

        submitBtn.replaceWith(submitBtn.cloneNode(true));
        const newSubmitBtn = document.getElementById('submitProjeto');
        

        newSubmitBtn.addEventListener('click', async () => {
            try {
                const formData = new FormData(form);
                const data = {
                    nome: formData.get('nome'),
                    descricao: formData.get('descricao'),
                    dataInicio: formData.get('dataInicio'),
                    dataTermino: formData.get('dataTermino'),
                    status: formData.get('status'),
                    equipeResponsavel: formData.get('equipeResponsavel')
                };

                const updateResponse = await fetch(`${API_URL}/projetos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!updateResponse.ok) {
                    throw new Error('Falha ao atualizar projeto');
                }

                alert('Projeto atualizado com sucesso!');
                form.reset();
                newSubmitBtn.textContent = 'Adicionar Projeto';
                loadProjetos();
            } catch (error) {
                alert(`Erro ao atualizar projeto: ${error.message}`);
            }
        });
    } catch (error) {
        alert(`Erro ao carregar projeto: ${error.message}`);
    }
}


async function deleteProjeto(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
        try {
            const response = await fetch(`${API_URL}/projetos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir projeto');
            }

            alert('Projeto excluído com sucesso!');
            loadProjetos();
        } catch (error) {
            alert(`Erro ao excluir projeto: ${error.message}`);
        }
    }
}

async function editTarefa(id) {
    try {

        const response = await fetch(`${API_URL}/tarefas/${id}`);
        if (!response.ok) {
            throw new Error('Tarefa não encontrada');
        }
        const tarefa = await response.json();

        const form = document.getElementById('tarefaForm');
        form.titulo.value = tarefa.titulo;
        form.descricao.value = tarefa.descricao;
        form.prazo.value = tarefa.prazo;
        form.status.value = tarefa.status;
        form.responsavel.value = tarefa.responsavel;
        form.projetoId.value = tarefa.projeto.id;

        const submitBtn = document.getElementById('submitTarefa');
        submitBtn.textContent = 'Atualizar Tarefa';

        submitBtn.replaceWith(submitBtn.cloneNode(true));
        const newSubmitBtn = document.getElementById('submitTarefa');

        newSubmitBtn.addEventListener('click', async () => {
            try {
                const formData = new FormData(form);
                const data = {
                    titulo: formData.get('titulo'),
                    descricao: formData.get('descricao'),
                    prazo: Number(formData.get('prazo')),
                    status: formData.get('status'),
                    responsavel: formData.get('responsavel'),
                    projetoId: Number(formData.get('projetoId'))
                };

                const updateResponse = await fetch(`${API_URL}/tarefas/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!updateResponse.ok) {
                    throw new Error('Falha ao atualizar tarefa');
                }

                alert('Tarefa atualizada com sucesso!');
                form.reset();
                newSubmitBtn.textContent = 'Adicionar Tarefa';
                loadTarefas();
            } catch (error) {
                alert(`Erro ao atualizar tarefa: ${error.message}`);
            }
        });
    } catch (error) {
        alert(`Erro ao carregar tarefa: ${error.message}`);
    }
}

async function deleteTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
            const response = await fetch(`${API_URL}/tarefas/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Falha ao excluir tarefa');
            }

            alert('Tarefa excluída com sucesso!');
            loadTarefas();
        } catch (error) {
            alert(`Erro ao excluir tarefa: ${error.message}`);
        }
    }
}


function renderizarProjetos(projetosComTarefas) {
    const container = document.getElementById('projetosList');
    container.innerHTML = projetosComTarefas.map(projeto => `
        <div class="card">
            <h3>${projeto.nome}</h3>
            <p>${projeto.descricao}</p>
            <p>Status: ${projeto.status}</p>
            <div class="actions">
                <!-- Botões para editar e excluir o projeto -->
                <button class="btn-edit" onclick="editProjeto(${projeto.id})">✏️</button>
                <button class="btn-delete" onclick="deleteProjeto(${projeto.id})">🗑️</button>
            </div>
            <div class="tarefas">
                <h4>Tarefas</h4>
                <ul>
                    ${projeto.tarefas.map(tarefa => `
                        <li>
                            <strong>${tarefa.titulo}</strong> - ${tarefa.descricao}
                            <span class="status">${tarefa.status}</span>
                            <div class="actions">
                                <!-- Botões para editar e excluir a tarefa -->
                                <button class="btn-edit" onclick="editTarefa(${tarefa.id})">✏️</button>
                                <button class="btn-delete" onclick="deleteTarefa(${tarefa.id})">🗑️</button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function toggleTarefas(projetoId) {
    const tarefasContainer = document.getElementById(`tarefas-${projetoId}`);
    const headerIcon = tarefasContainer.previousElementSibling.querySelector('span');
    tarefasContainer.classList.toggle('show');
    headerIcon.textContent = tarefasContainer.classList.contains('show') ? '▼' : '▶';
}

document.getElementById('submitProjeto').addEventListener('click', async () => {
    try {
        const form = document.getElementById('projetoForm');
        const formData = new FormData(form);

        const data = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            dataInicio: formData.get('dataInicio'),
            dataTermino: formData.get('dataTermino'),
            status: formData.get('status'),
            equipeResponsavel: formData.get('equipeResponsavel')
        };

        const response = await fetch(`${API_URL}/projetos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao adicionar projeto');
        }

        alert('Projeto adicionado com sucesso!');
        form.reset();
        loadProjetos(); // Recarrega a lista
    } catch (error) {
        alert(`Erro ao adicionar projeto: ${error.message}`);
    }
});

document.getElementById('submitTarefa').addEventListener('click', async () => {
    try {
        const form = document.getElementById('tarefaForm');
        const formData = new FormData(form);

        const data = {
            titulo: formData.get('titulo'),
            descricao: formData.get('descricao'),
            prazo: Number(formData.get('prazo')),
            status: formData.get('status'),
            responsavel: formData.get('responsavel'),
            projetoId: Number(formData.get('projetoId'))
        };

        const response = await fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao adicionar tarefa');
        }

        alert('Tarefa adicionada com sucesso!');
        form.reset();
        loadTarefas(); // Recarrega a lista
    } catch (error) {
        alert(`Erro ao adicionar tarefa: ${error.message}`);
    }
});

window.onload = () => {
    loadProjetosComTarefas();
    loadTarefas();
};