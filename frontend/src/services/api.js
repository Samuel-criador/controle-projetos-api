const API_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.mensagem || 'Erro na comunicação com a API');
    }
    // Handle 204 No Content
    if (response.status === 204) return null;
    return response.json();
};

export const api = {
    // Responsáveis
    getResponsaveis: () => fetch(`${API_URL}/responsaveis`).then(handleResponse),
    getResponsavel: (id) => fetch(`${API_URL}/responsaveis/${id}`).then(handleResponse),
    createResponsavel: (data) => fetch(`${API_URL}/responsaveis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    updateResponsavel: (id, data) => fetch(`${API_URL}/responsaveis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    deleteResponsavel: (id) => fetch(`${API_URL}/responsaveis/${id}`, { method: 'DELETE' }).then(handleResponse),

    // Projetos
    getProjetos: () => fetch(`${API_URL}/projetos`).then(handleResponse),
    getProjeto: (id) => fetch(`${API_URL}/projetos/${id}`).then(handleResponse),
    createProjeto: (data) => fetch(`${API_URL}/projetos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    updateProjeto: (id, data) => fetch(`${API_URL}/projetos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    deleteProjeto: (id) => fetch(`${API_URL}/projetos/${id}`, { method: 'DELETE' }).then(handleResponse),

    // Tarefas
    getTarefas: () => fetch(`${API_URL}/tarefas`).then(handleResponse),
    getTarefa: (id) => fetch(`${API_URL}/tarefas/${id}`).then(handleResponse),
    createTarefa: (data) => fetch(`${API_URL}/tarefas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    updateTarefa: (id, data) => fetch(`${API_URL}/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse),
    deleteTarefa: (id) => fetch(`${API_URL}/tarefas/${id}`, { method: 'DELETE' }).then(handleResponse),
};
