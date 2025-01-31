const API_URL = 'http://localhost:8080';

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
    loadProjetos();
    loadTarefas();
};