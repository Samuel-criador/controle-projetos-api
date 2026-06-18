import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, Edit, Calendar } from 'lucide-react';

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({ 
    nome: '', descricao: '', dataInicio: '', dataPrevisao: '', status: 'PLANEJADO', responsavelId: '' 
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [projData, respData] = await Promise.all([api.getProjetos(), api.getResponsaveis()]);
      setProjetos(projData);
      setResponsaveis(respData);
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
      if (editId) await api.updateProjeto(editId, form);
      else await api.createProjeto(form);
      
      setForm({ nome: '', descricao: '', dataInicio: '', dataPrevisao: '', status: 'PLANEJADO', responsavelId: '' });
      setEditId(null);
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (item) => {
    setForm({ 
      nome: item.nome, descricao: item.descricao || '', 
      dataInicio: item.dataInicio, dataPrevisao: item.dataPrevisao || '', 
      status: item.status, responsavelId: item.responsavel.id 
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await api.deleteProjeto(id);
        fetchData();
      } catch (error) { alert("Erro ao excluir"); }
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      'PLANEJADO': 'badge-info',
      'EM_ANDAMENTO': 'badge-warning',
      'CONCLUIDO': 'badge-success',
      'CANCELADO': 'badge-danger'
    };
    return `badge ${map[status]}`;
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Gestão de Projetos</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>{editId ? 'Editar Projeto' : 'Novo Projeto'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Nome do Projeto</label>
            <input required className="form-control" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Descrição (Opcional)</label>
            <textarea className="form-control" rows="2" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})}></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Data Início</label>
            <input required type="date" className="form-control" value={form.dataInicio} onChange={(e) => setForm({...form, dataInicio: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Previsão (Opcional)</label>
            <input type="date" className="form-control" value={form.dataPrevisao} onChange={(e) => setForm({...form, dataPrevisao: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-control" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
              <option value="PLANEJADO">Planejado</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Responsável</label>
            <select required className="form-control" value={form.responsavelId} onChange={(e) => setForm({...form, responsavelId: e.target.value})}>
              <option value="">Selecione...</option>
              {responsaveis.map(r => <option key={r.id} value={r.id}>{r.nome} ({r.cargo})</option>)}
            </select>
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
             {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm({ nome: '', descricao: '', dataInicio: '', dataPrevisao: '', status: 'PLANEJADO', responsavelId: '' }); }}>Cancelar</button>}
             <button type="submit" className="btn btn-primary">{editId ? 'Salvar Alterações' : 'Criar Projeto'}</button>
          </div>
        </form>
      </div>

      <div className="grid-cards">
        {loading ? <p>Carregando...</p> : projetos.map((proj) => (
          <div key={proj.id} className="card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(proj)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit size={16} /></button>
              <button onClick={() => handleDelete(proj.id)} style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
            
            <span className={getStatusBadge(proj.status)} style={{ marginBottom: '1rem' }}>
              {proj.status.replace('_', ' ')}
            </span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', paddingRight: '3rem' }}>{proj.nome}</h3>
            <p className="text-secondary text-sm" style={{ marginBottom: '1rem', minHeight: '40px' }}>{proj.descricao || 'Sem descrição.'}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }} className="text-muted text-sm">
              <Calendar size={14} />
              <span>Início: {proj.dataInicio.split('-').reverse().join('/')}</span>
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                 {proj.responsavel?.nome.charAt(0)}
               </div>
               <span className="text-sm font-medium">{proj.responsavel?.nome}</span>
            </div>
          </div>
        ))}
        {!loading && projetos.length === 0 && <p className="text-muted">Nenhum projeto cadastrado.</p>}
      </div>
    </div>
  );
}
