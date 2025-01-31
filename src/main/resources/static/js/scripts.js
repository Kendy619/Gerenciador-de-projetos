const API_URL = 'http://localhost:8080';

async function loadProjetosComTarefas() {
    try {
        const projetosResponse = await fetch(`${API_URL}/projetos`);
        const projetos = await projetosResponse.json();

        const projetosComTarefas = await Promise.all(projetos.map(async (projeto) => {
            const tarefasResponse = await fetch(`${API_URL}/tarefas?projetoId=${projeto.id}`);
            const tarefas = await tarefasResponse.json();
            return { ...projeto, tarefas }; // Correção na estrutura do objeto
        }));

        renderizarProjetos(projetosComTarefas);
        loadTarefas();
    } catch (error) {
        alert(`Erro ao carregar dados: ${error.message}`);
    }
}

async function loadTarefas() {
    try {
        const response = await fetch(`${API_URL}/tarefas`);
        const tarefas = await response.json();
        const container = document.getElementById('tarefasList');
        
        container.innerHTML = tarefas.map(tarefa => `
            <div class="card" id="tarefa-global-${tarefa.id}">
                <h3>${tarefa.titulo}</h3>
                <p>${tarefa.descricao}</p>
                <p>Prazo: ${tarefa.prazo} dias</p>
                <p>Status: ${tarefa.status}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editTarefa(${tarefa.id})">✏️</button>
                    <button class="btn-delete" onclick="deleteTarefa(${tarefa.id})">🗑️</button>
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
        
		submitBtn.onclick = (event) => updateProjeto(event, id);
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
				const card = document.getElementById(`projeto-${id}`);
				    if (card) {
				        card.outerHTML = criarCardProjeto(updatedProjeto);
				    }
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

            if (!response.ok) throw new Error('Falha ao excluir projeto');
            

            const card = document.getElementById(`projeto-${id}`);
			
			if (card) {
			    card.classList.add('deleting');
			    setTimeout(() => card.remove(), 300);
			}
            
            alert('Projeto excluído com sucesso!');
        } catch (error) {
            alert(`Erro ao excluir projeto: ${error.message}`);
        }
    }
}

async function updatedProjeto(event, id) {
    event.preventDefault();

    const form = document.getElementById('projetoForm');

    const projetoAtualizado = {
        nome: form.nome.value,
        descricao: form.descricao.value,
        dataInicio: form.dataInicio.value,
        dataTermino: form.dataTermino.value,
        status: form.status.value,
        equipeResponsavel: form.equipeResponsavel.value,
    };

    try {
        const response = await fetch(`${API_URL}/projetos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projetoAtualizado),
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar o projeto');
        }

        const projetoCard = document.querySelector(`.card[data-id="${id}"]`);
        if (projetoCard) {
            projetoCard.querySelector('h3').textContent = projetoAtualizado.nome;
            projetoCard.querySelector('p:nth-of-type(1)').textContent = projetoAtualizado.descricao;
            projetoCard.querySelector('p:nth-of-type(2)').textContent = `Status: ${projetoAtualizado.status}`;
            projetoCard.querySelector('p:nth-of-type(3)').textContent = `Equipe: ${projetoAtualizado.equipeResponsavel}`;
        }

        form.reset();
        const submitBtn = document.getElementById('submitProjeto');
        submitBtn.textContent = 'Salvar Projeto';

        alert('Projeto atualizado com sucesso!');
    } catch (error) {
        alert(`Erro ao atualizar o projeto: ${error.message}`);
    }
}

async function createTarefa(projetoId, tarefaData) {
    try {
        const response = await fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...tarefaData,
                projetoId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar tarefa: ${response.status}`);
        }

        const novaTarefa = await response.json();
		loadProjetosComTarefas();
        alert('Tarefa criada com sucesso!');

        loadProjetosComTarefas();
    } catch (error) {
        alert(`Erro ao criar tarefa: ${error.message}`);
    }
}


async function editTarefa(id) {
    try {
        const response = await fetch(`${API_URL}/tarefas/${id}`);
        if (!response.ok) {
            throw new Error('Tarefa não encontrada');
        }

        const tarefa = await response.json();

        // Preencha o formulário de edição com os dados da tarefa
        const form = document.getElementById('tarefaForm');
        form.titulo.value = tarefa.titulo;
        form.descricao.value = tarefa.descricao;
        form.prazo.value = tarefa.prazo;
        form.status.value = tarefa.status;

        const submitBtn = document.getElementById('submitTarefa');
        submitBtn.textContent = 'Atualizar Tarefa';

        // Substitua o evento de clique para enviar a atualização
        submitBtn.replaceWith(submitBtn.cloneNode(true));
        const newSubmitBtn = document.getElementById('submitTarefa');

        newSubmitBtn.addEventListener('click', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const data = {
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao'),
                prazo: formData.get('prazo'),
                status: formData.get('status'),
            };

            const updateResponse = await fetch(`${API_URL}/tarefas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!updateResponse.ok) {
                throw new Error('Falha ao atualizar tarefa');
            }

            alert('Tarefa atualizada com sucesso!');
			loadProjetosComTarefas();
            loadTarefas(); 
        });
    } catch (error) {
        alert(`Erro ao editar tarefa: ${error.message}`);
    }
}


async function deleteTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        try {
            const response = await fetch(`${API_URL}/tarefas/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Falha ao excluir');

            // Remove da lista dentro do projeto
            const tarefaProjeto = document.getElementById(`tarefa-${id}`);
            if (tarefaProjeto) {
                tarefaProjeto.style.opacity = '0';
                setTimeout(() => tarefaProjeto.remove(), 300);
            }

            // Remove da lista geral de tarefas
            const tarefaGlobal = document.getElementById(`tarefa-global-${id}`);
            if (tarefaGlobal) {
                tarefaGlobal.style.opacity = '0';
                setTimeout(() => tarefaGlobal.remove(), 300);
            }

            alert('Tarefa excluída com sucesso!');
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    }
}

function criarCardProjeto(projeto) {
    return `
        <div class="card" id="projeto-${projeto.id}">
            <h3>${projeto.nome} <span class="projeto-id">ID: ${projeto.id}</span></h3>
            <p>${projeto.descricao}</p>
            <p>Status: ${projeto.status}</p>
            <div class="actions">
                <button class="btn-edit" onclick="editProjeto(${projeto.id})">✏️</button>
                <button class="btn-delete" onclick="deleteProjeto(${projeto.id})">🗑️</button>
            </div>
            <div class="tarefas">
                <h4>Tarefas</h4>
                <ul>
                    ${projeto.tarefas ? projeto.tarefas.map(tarefa => criarItemTarefa(tarefa)).join('') : ''}
                </ul>
            </div>
        </div>
    `;
}

function criarItemTarefa(tarefa) {
    return `
        <li id="tarefa-${tarefa.id}">
            <strong>${tarefa.titulo}</strong> - ${tarefa.descricao}
            <span class="status-badge ${tarefa.status}">${tarefa.status}</span>
            <div class="actions">
                <button class="btn-edit" onclick="editTarefa(${tarefa.id})">✏️</button>
                <button class="btn-delete" onclick="deleteTarefa(${tarefa.id})">🗑️</button>
            </div>
        </li>
    `;
}


function renderizarProjetos(projetosComTarefas) {
    const container = document.getElementById('projetosList');
    container.innerHTML = projetosComTarefas.map(projeto => `
        <div class="card" id="projeto-${projeto.id}">
            <div class="projeto-header">
                <div>
                    <h3>${projeto.nome} <span class="projeto-id">ID: ${projeto.id}</span></h3>
                    <p>${projeto.descricao}</p>
                    <p>Status: <span class="status-badge ${projeto.status}">${projeto.status}</span></p>
                </div>
                <div class="actions">
                    <button class="btn-edit" onclick="editProjeto(${projeto.id})">✏️</button>
                    <button class="btn-delete" onclick="deleteProjeto(${projeto.id})">🗑️</button>
                </div>
            </div>
            <div class="tarefas">
                <h4>Tarefas</h4>
                <ul>
                    ${projeto.tarefas.map(tarefa => `
                        <li id="tarefa-${tarefa.id}">
                            <strong>${tarefa.titulo}</strong> - ${tarefa.descricao}
                            <span class="status-badge ${tarefa.status}">${tarefa.status}</span>
                            <div class="actions">
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

        const response = await fetch(`${API_URL}/projetos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) throw new Error('Erro ao adicionar projeto');
        
        const novoProjeto = await response.json();
  
		document.getElementById('projetoId').value = novoProjeto.id;
		
        const container = document.getElementById('projetosList');
        container.insertAdjacentHTML('afterbegin', criarCardProjeto(novoProjeto));
        
        form.reset();
        alert('Projeto adicionado com sucesso!');
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
});

document.getElementById('submitTarefa').addEventListener('click', async () => {
    try {
        const form = document.getElementById('tarefaForm');
        const formData = new FormData(form);
        
        const response = await fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: formData.get('titulo'),
                descricao: formData.get('descricao'),
                prazo: Number(formData.get('prazo')),
                status: formData.get('status'),
                responsavel: formData.get('responsavel'),
                projetoId: Number(formData.get('projetoId'))
            })
        });

        if (!response.ok) throw new Error('Erro ao adicionar tarefa');
        
        const novaTarefa = await response.json();
        
        // Verificação de segurança
        if (!novaTarefa.projeto || !novaTarefa.projeto.id) {
            throw new Error('Projeto não encontrado na resposta da API');
        }

        // Adiciona a tarefa no DOM
        const projetoContainer = document.querySelector(`#projeto-${novaTarefa.projeto.id} .tarefas ul`);
        if (projetoContainer) {
            projetoContainer.insertAdjacentHTML('beforeend', criarItemTarefa(novaTarefa));
        }

        // Atualiza a lista geral de tarefas
        const containerTarefas = document.getElementById('tarefasList');
        containerTarefas.insertAdjacentHTML('afterbegin', `
            <div class="card" id="tarefa-global-${novaTarefa.id}">
                ${criarItemTarefa(novaTarefa).replace('<li', '<div').replace('</li>', '</div>')}
            </div>
        `);

        form.reset();
        alert('Tarefa adicionada com sucesso!');
    } catch (error) {
        alert(`Erro: ${error.message}`);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadProjetosComTarefas();
});