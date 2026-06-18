import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function Responsaveis() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', email: '', cargo: '' });
  const [editId, setEditId] = useState(null);

  const fetchResponsaveis = async () => {
    try {
      const data = await api.getResponsaveis();
      setResponsaveis(data);
    } catch (error) {
      alert("Erro ao buscar responsáveis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponsaveis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.updateResponsavel(editId, form);
      } else {
        await api.createResponsavel(form);
      }
      setForm({ nome: '', email: '', cargo: '' });
      setEditId(null);
      fetchResponsaveis();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (item) => {
    setForm({ nome: item.nome, email: item.email, cargo: item.cargo });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await api.deleteResponsavel(id);
        fetchResponsaveis();
      } catch (error) {
        alert("Erro ao excluir");
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Equipe (Responsáveis)</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>{editId ? 'Editar Membro' : 'Adicionar Novo Membro'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
            <label className="form-label">Nome Completo</label>
            <input required className="form-control" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} />
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
            <label className="form-label">Email Corporativo</label>
            <input required type="email" className="form-control" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
            <label className="form-label">Cargo / Função</label>
            <input required className="form-control" value={form.cargo} onChange={(e) => setForm({...form, cargo: e.target.value})} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', height: '100%' }}>
            {editId ? 'Salvar Edição' : <><Plus size={18}/> Adicionar</>}
          </button>
          {editId && (
            <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm({ nome: '', email: '', cargo: ''}); }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="grid-cards">
        {loading ? <p>Carregando...</p> : responsaveis.map((resp) => (
          <div key={resp.id} className="card" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => handleEdit(resp)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit size={16} /></button>
              <button onClick={() => handleDelete(resp.id)} style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
              {resp.nome.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{resp.nome}</h3>
            <p className="text-secondary text-sm" style={{ marginBottom: '0.5rem' }}>{resp.cargo}</p>
            <p className="text-muted text-sm">{resp.email}</p>
          </div>
        ))}
        {!loading && responsaveis.length === 0 && <p className="text-muted">Nenhum membro cadastrado.</p>}
      </div>
    </div>
  );
}
