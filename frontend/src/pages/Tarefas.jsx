import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({ 
    titulo: '', descricao: '', prioridade: 'MEDIA', status: 'PENDENTE', projetoId: '' 
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [tarData, projData] = await Promise.all([api.getTarefas(), api.getProjetos()]);
      setTarefas(tarData);
      setProjetos(projData);
    } catch (error) {
      alert("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.updateTarefa(editId, form);
      else await api.createTarefa(form);
      
      setForm({ titulo: '', descricao: '', prioridade: 'MEDIA', status: 'PENDENTE', projetoId: '' });
      setEditId(null);
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (item) => {
    setForm({ 
      titulo: item.titulo, descricao: item.descricao || '', 
      prioridade: item.prioridade, status: item.status, 
      projetoId: item.projeto.id 
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await api.deleteTarefa(id);
        fetchData();
      } catch (error) { alert("Erro ao excluir"); }
    }
  };

  const getPriorityColor = (prioridade) => {
    const map = { 'BAIXA': 'info', 'MEDIA': 'success', 'ALTA': 'warning', 'CRITICA': 'danger' };
    return `badge-${map[prioridade]}`;
  };
  
  const getStatusColor = (status) => {
    const map = { 'PENDENTE': 'warning', 'EM_ANDAMENTO': 'info', 'CONCLUIDA': 'success', 'CANCELADA': 'danger' };
    return `badge-${map[status]}`;
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestão de Tarefas</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>{editId ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Título da Tarefa</label>
            <input required className="form-control" value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})} />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Descrição (Opcional)</label>
            <textarea className="form-control" rows="2" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})}></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Prioridade</label>
            <select className="form-control" value={form.prioridade} onChange={(e) => setForm({...form, prioridade: e.target.value})}>
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
              <option value="CRITICA">Crítica</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Vincular ao Projeto</label>
            <select required className="form-control" value={form.projetoId} onChange={(e) => setForm({...form, projetoId: e.target.value})}>
              <option value="">Selecione...</option>
              {projetos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
             {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm({ titulo: '', descricao: '', prioridade: 'MEDIA', status: 'PENDENTE', projetoId: '' }); }}>Cancelar</button>}
             <button type="submit" className="btn btn-primary">{editId ? 'Salvar Alterações' : 'Criar Tarefa'}</button>
          </div>
        </form>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? <p>Carregando...</p> : tarefas.map((tar) => (
          <div key={tar.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
            <div style={{ flex: 1 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                 <h3 style={{ fontSize: '1rem', margin: 0 }}>{tar.titulo}</h3>
                 <span className={`badge ${getStatusColor(tar.status)}`}>{tar.status.replace('_', ' ')}</span>
                 <span className={`badge ${getPriorityColor(tar.prioridade)}`}>{tar.prioridade}</span>
               </div>
               <p className="text-secondary text-sm" style={{ margin: 0 }}>Projeto: <strong>{tar.projeto?.nome}</strong></p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(tar)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}><Edit size={18} /></button>
              <button onClick={() => handleDelete(tar.id)} style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {!loading && tarefas.length === 0 && <p className="text-muted">Nenhuma tarefa cadastrada.</p>}
      </div>
    </div>
  );
}
